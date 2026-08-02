export type SermonStatus = "live" | "latest";
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