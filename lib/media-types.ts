export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  type: MediaType;
  /** Path within the Supabase Storage bucket. null for built-in defaults shipped in /public. */
  storagePath: string | null;
}
