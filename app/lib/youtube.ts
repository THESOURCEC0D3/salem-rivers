export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    const watchId = parsed.searchParams.get("v");

    if (watchId) {
      return watchId;
    }

    // https://www.youtube.com/live/VIDEO_ID
    if (parsed.pathname.startsWith("/live/")) {
      return parsed.pathname.split("/live/")[1];
    }

    // https://www.youtube.com/embed/VIDEO_ID
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/embed/")[1];
    }

    return null;
  } catch {
    return null;
  }
}

/** Every YouTube video ID is exactly 11 of these characters. */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * What the dashboard accepts: a bare ID, or any common YouTube link pasted
 * straight from the app or browser (watch, youtu.be, live, embed, shorts),
 * with or without "https://". Returns null for anything else, so a typo is
 * caught before it is saved rather than showing a broken video on the site.
 */
export function parseYouTubeInput(input: string): string | null {
  const value = input.trim();
  if (YOUTUBE_ID.test(value)) return value;

  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let parsed: URL;
  try { parsed = new URL(withScheme); } catch { return null; }

  const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
  let id: string | null = null;
  if (host === "youtu.be") id = parsed.pathname.split("/")[1] ?? null;
  else if (host === "youtube.com") {
    id = parsed.searchParams.get("v")
      ?? parsed.pathname.match(/^\/(?:live|embed|shorts)\/([^/]+)/)?.[1]
      ?? null;
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = getYouTubeVideoId(url);

  if (!id) return "";

  return `https://www.youtube.com/embed/${id}`;
}

export function getYouTubeThumbnailFromId(
  youtubeId: string,
  customThumbnail?: string
): string {
  if (customThumbnail) {
    return customThumbnail;
  }

  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}