/**
 * One-time migration: upload the site's original /public images & videos into
 * Supabase Storage and record their metadata in the media_items table.
 *
 * Run AFTER applying supabase/migrations/0001_media_items.sql:
 *   npx tsx scripts/seed-media.ts
 *   npx tsx scripts/seed-media.ts --force   # wipe & re-seed (destroys admin edits)
 *
 * Safe by default: aborts if media_items already has rows (so it never clobbers
 * images the owner added through the admin panel).
 */
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import { config as loadEnv } from "dotenv";
import { DEFAULT_MEDIA } from "@/lib/media-defaults";

loadEnv({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
if (!url || !secretKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
}

const BUCKET = "media";
const supabase = createClient(url, secretKey, { auth: { persistSession: false } });
const force = process.argv.includes("--force");

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function storagePathFor(section: string, src: string): string {
  const safeSection = section.replace(/[^a-z0-9-]/gi, "_");
  return `${safeSection}/${basename(src)}`;
}

async function main() {
  const { count, error: countError } = await supabase
    .from("media_items")
    .select("*", { count: "exact", head: true });
  if (countError) throw countError;

  if (count && count > 0) {
    if (!force) {
      console.error(`media_items already has ${count} rows. Re-run with --force to wipe and re-seed.`);
      process.exit(1);
    }
    console.log(`--force: deleting ${count} existing rows…`);
    const { error } = await supabase.from("media_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) throw error;
  }

  let uploaded = 0;
  for (const [section, items] of Object.entries(DEFAULT_MEDIA)) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const localPath = resolve(process.cwd(), "public", item.src.replace(/^\//, ""));
      const ext = extname(item.src).toLowerCase();
      const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
      const path = storagePathFor(section, item.src);

      try {
        const bytes = await readFile(localPath);
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, bytes, { contentType, upsert: true });
        if (uploadError) throw uploadError;

        const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        const { error: insertError } = await supabase.from("media_items").insert({
          section,
          storage_path: path,
          url: publicUrl,
          alt: item.alt,
          title: item.title,
          type: item.type,
          sort_order: index,
        });
        if (insertError) throw insertError;

        uploaded++;
        console.log(`  ✓ ${section} [${index}] ${basename(item.src)}`);
      } catch (err) {
        console.error(`  ✗ ${section} [${index}] ${item.src}:`, err instanceof Error ? err.message : err);
      }
    }
  }

  console.log(`\nDone. Seeded ${uploaded} media items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
