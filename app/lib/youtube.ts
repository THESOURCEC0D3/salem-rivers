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