export interface Album {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  is_published: boolean;
  created_at: string;
}

export interface Photo {
  id: string;
  album_id: string;
  original_path: string;
  preview_path: string;
  original_filename: string;
  alt_text: string;
  caption: string;
  width: number;
  height: number;
  file_size: number;
  mime_type: string;
  sort_order: number;
  is_cover: boolean;
  is_published: boolean;
  created_at: string;
}
