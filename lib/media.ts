import "server-only";
import { cache } from "react";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { DEFAULT_MEDIA } from "@/lib/media-defaults";
import type { MediaItem, MediaType } from "@/lib/media-types";

export type { MediaItem, MediaType } from "@/lib/media-types";

interface MediaRow {
  id: string;
  section: string;
  storage_path: string | null;
  url: string;
  alt: string;
  title: string;
  type: MediaType;
  sort_order: number;
}

function rowToItem(row: MediaRow): MediaItem {
  return {
    id: row.id,
    src: row.url,
    alt: row.alt,
    title: row.title,
    type: row.type,
    storagePath: row.storage_path,
  };
}

/** All items for a collection section, ordered. Falls back to defaults when Supabase is unconfigured or errors. */
export const getCollection = cache(async (section: string): Promise<MediaItem[]> => {
  if (!isSupabaseConfigured()) return DEFAULT_MEDIA[section] ?? [];
  try {
    const { data, error } = await supabaseAdmin()
      .from("media_items")
      .select("*")
      .eq("section", section)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data as MediaRow[]).map(rowToItem);
  } catch (err) {
    console.error(`getCollection("${section}") failed; using defaults:`, err);
    return DEFAULT_MEDIA[section] ?? [];
  }
});

/** The single image for a slot section. Falls back to the built-in default when none is set. */
export const getSlot = cache(async (section: string): Promise<MediaItem | null> => {
  const items = await getCollection(section);
  if (items.length > 0) return items[0];
  return DEFAULT_MEDIA[section]?.[0] ?? null;
});

/** Batch-fetch slots for many sections in one query (used by the blog list). */
export async function getSlots(sections: string[]): Promise<Record<string, MediaItem>> {
  const fromDefaults = (): Record<string, MediaItem> => {
    const out: Record<string, MediaItem> = {};
    for (const section of sections) {
      const fallback = DEFAULT_MEDIA[section]?.[0];
      if (fallback) out[section] = fallback;
    }
    return out;
  };

  if (!isSupabaseConfigured()) return fromDefaults();

  try {
    const { data, error } = await supabaseAdmin()
      .from("media_items")
      .select("*")
      .in("section", sections)
      .order("sort_order", { ascending: true });
    if (error) throw error;

    const out: Record<string, MediaItem> = {};
    for (const row of data as MediaRow[]) {
      if (!out[row.section]) out[row.section] = rowToItem(row);
    }
    for (const section of sections) {
      if (!out[section]) {
        const fallback = DEFAULT_MEDIA[section]?.[0];
        if (fallback) out[section] = fallback;
      }
    }
    return out;
  } catch (err) {
    console.error("getSlots failed; using defaults:", err);
    return fromDefaults();
  }
}
