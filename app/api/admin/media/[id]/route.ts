import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = supabaseAdmin();

  const { data: row } = await sb
    .from("media_items")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  if (row?.storage_path) {
    await sb.storage.from(MEDIA_BUCKET).remove([row.storage_path]);
  }

  const { error } = await sb.from("media_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
