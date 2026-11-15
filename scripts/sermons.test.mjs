import test from "node:test";
import assert from "node:assert/strict";
import { mergeSermons, pickFeatured } from "../app/lib/sermon-merge.ts";
import { parseYouTubeInput } from "../app/lib/youtube.ts";

const sermon = (id, youtubeId, date, status = "previous") =>
  ({ id, title: id, speaker: "", description: "", youtubeId, date, duration: "", status, platform: "youtube" });

test("file statuses apply unchanged when nothing in the dashboard is featured", () => {
  const merged = mergeSermons([sermon("db", "AAAAAAAAAAA", "2026-11-10")], [sermon("28", "kCmIjO_QZis", "2026-11-15", "live")]);
  assert.equal(pickFeatured(merged).id, "28");
});

test("a live dashboard sermon outranks a stale live sermon in the file", () => {
  const merged = mergeSermons([sermon("db", "AAAAAAAAAAA", "2026-11-22", "live")], [sermon("28", "kCmIjO_QZis", "2026-11-15", "live")]);
  assert.equal(pickFeatured(merged).id, "db");
  assert.equal(merged.find((s) => s.id === "28").status, "previous");
});

test("a dashboard 'latest' also takes over from a file 'live'", () => {
  const merged = mergeSermons([sermon("db", "AAAAAAAAAAA", "2026-11-22", "latest")], [sermon("28", "kCmIjO_QZis", "2026-11-15", "live")]);
  assert.equal(pickFeatured(merged).id, "db");
});

test("the same video in both sources appears once, as the dashboard copy", () => {
  const merged = mergeSermons([sermon("db", "kCmIjO_QZis", "2026-11-15")], [sermon("28", "kCmIjO_QZis", "2026-11-15", "live")]);
  assert.deepEqual(merged.map((s) => s.id), ["db"]);
});

test("merged list is newest first, dashboard before file on the same day", () => {
  const merged = mergeSermons(
    [sermon("db-new", "AAAAAAAAAAA", "2026-11-20"), sermon("db-same", "BBBBBBBBBBB", "2026-11-14")],
    [sermon("28", "CCCCCCCCCCC", "2026-11-15"), sermon("27", "DDDDDDDDDDD", "2026-11-14")],
  );
  assert.deepEqual(merged.map((s) => s.id), ["db-new", "28", "db-same", "27"]);
});

test("an unreachable database (empty dashboard list) leaves the file as-is", () => {
  const file = [sermon("28", "kCmIjO_QZis", "2026-11-15", "live")];
  assert.deepEqual(mergeSermons([], file), file);
});

test("YouTube input: bare IDs and every common link shape", () => {
  const id = "kCmIjO_QZis";
  for (const input of [
    id, ` ${id} `,
    `https://www.youtube.com/watch?v=${id}`, `https://m.youtube.com/watch?v=${id}&t=30s`,
    `https://youtu.be/${id}?si=abc`, `youtu.be/${id}`, `youtube.com/live/${id}?si=x`,
    `https://www.youtube.com/embed/${id}`, `https://youtube.com/shorts/${id}`,
  ]) assert.equal(parseYouTubeInput(input), id, input);
});

test("YouTube input: rejects typos and other sites", () => {
  for (const input of ["", "kCmIjO_QZi", "https://vimeo.com/123456789", "https://evil.com/watch?v=kCmIjO_QZis", "https://youtube.com/@salem"])
    assert.equal(parseYouTubeInput(input), null, input);
});
