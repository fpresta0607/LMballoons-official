import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase";
import { getSection } from "@/lib/media-sections";

export async function POST(req: Request) {
  let body: { section?: string; filename?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { section, filename } = body;
  if (!section || !getSection(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const ext = String(filename ?? "").split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const safeSection = section.replace(/[^a-z0-9-]/gi, "_");
  const path = `${safeSection}/${randomUUID()}.${ext}`;

  const { data, error } = await supabaseAdmin()
    .storage
    .from(MEDIA_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to create upload URL" }, { status: 500 });
  }

  return NextResponse.json({ path, token: data.token, signedUrl: data.signedUrl });
}
