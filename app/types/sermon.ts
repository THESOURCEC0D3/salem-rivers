export type SermonStatus = "live" | "latest" | "previous";
export type VideoPlatform = "youtube" | "facebook";

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  description: string;

 youtubeId: string;
thumbnail?: string;

  date: string;
  duration: string;

  status: SermonStatus;
  platform: VideoPlatform;
}

/** A row in the Supabase `sermons` table (snake_case, as the database stores it). */
export interface SermonRow {
  id: string;
  title: string;
  speaker: string;
  description: string;
  youtube_id: string;
  sermon_date: string;
  duration: string;
  thumbnail_url: string | null;
  status: SermonStatus;
  is_published: boolean;
  created_at: string;
}
