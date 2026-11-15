"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { parseYouTubeInput } from "@/app/lib/youtube";
import type { SermonRow, SermonStatus } from "@/app/types/sermon";
import { refreshSermonPages } from "./actions";

const input = "mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4";
const smallButton = "min-h-10 rounded-full border border-border px-4 text-sm font-semibold hover:bg-muted disabled:opacity-50";

/** Today's date in Port Harcourt, as YYYY-MM-DD (en-CA formats dates that way). */
const todayInLagos = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date());

const STATUS_LABEL: Record<SermonStatus, string> = { live: "Live", latest: "Latest", previous: "Previous" };
const STATUS_STYLE: Record<SermonStatus, string> = {
  live: "bg-red-50 text-red-800", latest: "bg-purple-soft text-primary", previous: "bg-muted text-muted-foreground",
};

function friendlyError(cause: unknown) {
  const code = (cause as { code?: string } | null)?.code;
  if (code === "23505") return "This YouTube video is already in the dashboard. Edit the existing entry instead.";
  return "The change couldn’t be saved. Check your connection and try again.";
}

export function VideoManager({ initialVideos }: { initialVideos: SermonRow[] }) {
  const [videos, setVideos] = useState(initialVideos);
  const [editing, setEditing] = useState<SermonRow | null>(null);
  // `formKey` remounts the form, resetting its uncontrolled fields after a save or a switch to editing.
  const [formKey, setFormKey] = useState(0);
  const [youtube, setYoutube] = useState("");
  const [status, setStatus] = useState<SermonStatus>("previous");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const previewId = parseYouTubeInput(youtube);
  // Live/latest are on the public site by definition, so they are always published.
  const forcedPublish = status !== "previous";

  function startEdit(video: SermonRow | null) {
    setEditing(video);
    setYoutube(video?.youtube_id ?? "");
    setStatus(video?.status ?? "previous");
    setFormKey((k) => k + 1);
    setError(""); setMessage("");
    if (video) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function reload() {
    const { data, error } = await createClient().from("sermons").select("*")
      .order("sermon_date", { ascending: false }).order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    setVideos(data as SermonRow[]);
  }

  /** Every write goes through here: save, refresh the public pages, reload the list. */
  async function run(task: () => Promise<void>, success: string) {
    setBusy(true); setError(""); setMessage("");
    try {
      await task();
      try {
        await refreshSermonPages();
        setMessage(success);
      } catch {
        setMessage(`${success} The website may take up to 5 minutes to show it.`);
      }
      await reload();
    } catch (cause) {
      setError(friendlyError(cause));
      try { await reload(); } catch { /* keep the original error */ }
    } finally { setBusy(false); }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!previewId) { setError("That doesn’t look like a YouTube link or video ID. Copy the link from YouTube and paste it again."); return; }
    const form = new FormData(event.currentTarget);
    const record = {
      youtube_id: previewId,
      title: String(form.get("title") ?? "").trim(),
      speaker: String(form.get("speaker") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      sermon_date: String(form.get("date")),
      duration: String(form.get("duration") ?? "").trim(),
      status,
      is_published: forcedPublish || form.get("published") === "on",
    };
    const wasEditing = Boolean(editing);
    await run(async () => {
      const supabase = createClient();
      const { error } = editing
        ? await supabase.from("sermons").update(record).eq("id", editing.id)
        : await supabase.from("sermons").insert(record);
      if (error) throw error;
      startEdit(null);
    }, wasEditing ? "Video updated." : "Video added.");
  }

  const setVideoStatus = (video: SermonRow, next: SermonStatus, success: string) =>
    run(async () => {
      // The database moves the previous live/latest video to "previous" in the same step.
      const { error } = await createClient().from("sermons")
        .update({ status: next, ...(next !== "previous" && { is_published: true }) }).eq("id", video.id);
      if (error) throw error;
    }, success);

  const remove = (video: SermonRow) => {
    if (!window.confirm(`Delete “${video.title}” from the website? The video stays on YouTube.`)) return;
    void run(async () => {
      const { error } = await createClient().from("sermons").delete().eq("id", video.id);
      if (error) throw error;
      if (editing?.id === video.id) startEdit(null);
    }, "Video deleted.");
  };

  return (
    <>
      <h1 className="text-3xl sm:text-4xl">Sermon videos</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Add a video and it appears on the homepage and Watch page within seconds. Videos stay on YouTube; this only controls what the website shows.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
      {message && <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-green-800">{message}</p>}

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[380px_1fr]">
        <form key={formKey} onSubmit={save} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl">{editing ? "Edit video" : "Add a video"}</h2>

          <label className="block text-sm font-semibold">YouTube link or video ID
            <input value={youtube} onChange={(e) => setYoutube(e.target.value)} required disabled={busy} placeholder="https://youtube.com/live/…" className={input} />
          </label>
          {youtube && (previewId
            ? <Image src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} alt="Video preview" width={480} height={360} className="aspect-video w-full rounded-xl object-cover" />
            : <p className="text-sm text-red-800">Not a recognised YouTube link yet.</p>)}

          <label className="block text-sm font-semibold">Title
            <input name="title" defaultValue={editing?.title} maxLength={200} required disabled={busy} className={input} />
          </label>
          <label className="block text-sm font-semibold">Speaker <span className="font-normal text-muted-foreground">(optional)</span>
            <input name="speaker" defaultValue={editing?.speaker} maxLength={120} disabled={busy} className={input} />
          </label>
          <label className="block text-sm font-semibold">Description <span className="font-normal text-muted-foreground">(optional)</span>
            <textarea name="description" defaultValue={editing?.description} maxLength={2000} rows={3} disabled={busy} className={`${input} py-3`} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-semibold">Date
              <input name="date" type="date" defaultValue={editing?.sermon_date ?? todayInLagos()} required disabled={busy} className={input} />
            </label>
            <label className="block text-sm font-semibold">Duration <span className="font-normal text-muted-foreground">(optional)</span>
              <input name="duration" defaultValue={editing?.duration} maxLength={20} placeholder="1:45:00" disabled={busy} className={input} />
            </label>
          </div>
          <label className="block text-sm font-semibold">Status
            <select value={status} onChange={(e) => setStatus(e.target.value as SermonStatus)} disabled={busy} className={input}>
              <option value="live">Live: streaming now, featured first</option>
              <option value="latest">Latest: featured when nothing is live</option>
              <option value="previous">Previous: in the sermon library</option>
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input name="published" type="checkbox" defaultChecked={editing?.is_published ?? true} disabled={busy || forcedPublish} className="size-5" />
            Show on the website
          </label>
          {forcedPublish && <p className="-mt-3 text-xs text-muted-foreground">Live and latest videos are always shown. Saving replaces the current {status} video, which moves to Previous.</p>}

          <button disabled={busy} className="min-h-12 w-full rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-hover disabled:opacity-60">
            {busy ? "Saving…" : editing ? "Save changes" : "Add video"}
          </button>
          {editing && <button type="button" onClick={() => startEdit(null)} disabled={busy} className="w-full text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel editing</button>}
        </form>

        <div>
          {videos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-gold-wash-1 p-10 text-center">
              <h2 className="text-2xl">No dashboard videos yet</h2>
              <p className="mt-3 text-muted-foreground">Add your first one. Older videos in the website’s code still show on the site but aren’t listed here.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {videos.map((video) => (
                <li key={video.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row">
                  <Image src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`} alt="" width={480} height={360} className="aspect-video w-full shrink-0 rounded-xl object-cover sm:w-44" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[video.status]}`}>{STATUS_LABEL[video.status]}</span>
                      {!video.is_published && <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-accent">Hidden</span>}
                    </div>
                    <h3 className="mt-2 break-words text-lg font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(`${video.sermon_date}T12:00:00Z`).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
                      {video.speaker && ` · ${video.speaker}`}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {video.status !== "live" && <button onClick={() => setVideoStatus(video, "live", "This video is now live on the website.")} disabled={busy} className={`${smallButton} border-red-200 text-red-800`}>Go live</button>}
                      {video.status === "live" && <button onClick={() => setVideoStatus(video, "latest", "Live ended. This is now the latest sermon.")} disabled={busy} className={smallButton}>End live → make latest</button>}
                      <button onClick={() => startEdit(video)} disabled={busy} className={smallButton}>Edit</button>
                      <button onClick={() => remove(video)} disabled={busy} className={`${smallButton} text-red-800`}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
