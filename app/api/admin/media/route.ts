import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase";
import { getSection } from "@/lib/media-sections";

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("media_items")
    .select("*")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function POST(req: Request) {
  let body: { section?: string; storagePath?: string; alt?: string; title?: string; type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { section, storagePath, alt, title, type } = body;
  const def = section ? getSection(section) : undefined;
  if (!section || !def) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }
  // Must match the `<section>/<uuid>.<ext>` shape minted by /api/admin/upload-url.
  if (typeof storagePath !== "string" || !/^[a-z0-9_-]+\/[0-9a-f-]{36}\.[a-z0-9]{1,10}$/i.test(storagePath)) {
    return NextResponse.json({ error: "Invalid storagePath" }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const itemType = type === "video" ? "video" : "image";

  // Slots hold exactly one image — remove the previous file + row first.
  if (def.kind === "slot") {
    const { data: existing } = await sb
      .from("media_items")
      .select("id, storage_path")
      .eq("section", section);
    const paths = (existing ?? [])
      .map((row) => row.storage_path)
      .filter((path): path is string => Boolean(path));
    if (paths.length) await sb.storage.from(MEDIA_BUCKET).remove(paths);
    if (existing?.length) await sb.from("media_items").delete().eq("section", section);
  }

  const { data: last } = await sb
    .from("media_items")
    .select("sort_order")
    .eq("section", section)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sortOrder = def.kind === "slot" ? 0 : (last?.sort_order ?? -1) + 1;

  const url = sb.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath).data.publicUrl;
  const { data, error } = await sb
    .from("media_items")
    .insert({
      section,
      storage_path: storagePath,
      url,
      alt: typeof alt === "string" ? alt : "",
      title: typeof title === "string" ? title : "",
      type: itemType,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/", "layout");
  return NextResponse.json({ item: data });
}
