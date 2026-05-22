/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Trash2, UploadCloud, LogOut, ImageOff } from "lucide-react";
import { MEDIA_SECTIONS, type SectionDef } from "@/lib/media-sections";

const MEDIA_BUCKET = "media";
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // matches the Supabase bucket file-size limit

interface AdminItem {
  id: string;
  section: string;
  url: string;
  alt: string;
  title: string;
  type: "image" | "video";
  storage_path: string | null;
  sort_order: number;
}

function acceptAttr(accepts: SectionDef["accepts"]): string {
  if (accepts === "image") return "image/*";
  if (accepts === "video") return "video/*";
  return "image/*,video/*";
}

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key, { auth: { persistSession: false } });
  }, []);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/admin/media");
    if (!res.ok) {
      setError("Could not load media. Is Supabase configured?");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setItems(data.items ?? []);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upload = useCallback(
    async (section: string, file: File, alt: string, title: string) => {
      if (!supabase) throw new Error("Supabase is not configured in this environment.");

      const urlRes = await fetch("/api/admin/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, filename: file.name }),
      });
      if (!urlRes.ok) throw new Error("Failed to start upload.");
      const { path, token } = await urlRes.json();

      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .uploadToSignedUrl(path, token, file, { contentType: file.type });
      if (uploadError) throw new Error(uploadError.message);

      const type = file.type.startsWith("video") ? "video" : "image";
      const metaRes = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, storagePath: path, alt, title, type }),
      });
      if (!metaRes.ok) throw new Error("Upload saved but recording it failed.");

      await refresh();
    },
    [supabase, refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) await refresh();
    },
    [refresh]
  );

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const groups = useMemo(() => {
    const order: string[] = [];
    const byGroup: Record<string, SectionDef[]> = {};
    for (const section of MEDIA_SECTIONS) {
      if (!byGroup[section.group]) {
        byGroup[section.group] = [];
        order.push(section.group);
      }
      byGroup[section.group].push(section);
    }
    return order.map((name) => ({ name, sections: byGroup[name] }));
  }, []);

  return (
    <div className="min-h-screen -mt-16 bg-cream">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-rose">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal-light">Admin</p>
            <h1 className="font-serif text-xl text-charcoal leading-none">Manage Photos</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {loading ? (
          <p className="text-charcoal-light">Loading…</p>
        ) : (
          <div className="space-y-12">
            {groups.map((group) => (
              <section key={group.name}>
                <h2 className="font-serif text-2xl text-charcoal mb-1">{group.name}</h2>
                <div className="h-px bg-rose mb-6" />
                <div className="space-y-8">
                  {group.sections.map((section) => (
                    <SectionBlock
                      key={section.key}
                      section={section}
                      items={items.filter((item) => item.section === section.key)}
                      onUpload={upload}
                      onRemove={remove}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function SectionBlock({
  section,
  items,
  onUpload,
  onRemove,
}: {
  section: SectionDef;
  items: AdminItem[];
  onUpload: (section: string, file: File, alt: string, title: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  const isSlot = section.kind === "slot";
  const current = items[0];

  return (
    <div className="bg-white border border-rose rounded-2xl p-6">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div>
          <h3 className="font-serif text-lg text-charcoal">{section.label}</h3>
          {section.description && (
            <p className="text-sm text-charcoal-light mt-0.5">{section.description}</p>
          )}
        </div>
        <span className="text-[10px] tracking-widest uppercase text-charcoal-light shrink-0">
          {isSlot ? "Single image" : `${items.length} item${items.length === 1 ? "" : "s"}`}
        </span>
      </div>

      {isSlot ? (
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-40 shrink-0">
            <MediaThumb item={current} />
          </div>
          <div className="flex-1">
            <Uploader
              section={section}
              showTitle={false}
              buttonLabel={current ? "Replace Image" : "Upload Image"}
              onUpload={onUpload}
            />
          </div>
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden border border-rose">
                  <div className="aspect-square">
                    <MediaThumb item={item} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="absolute top-1.5 right-1.5 bg-white/90 text-charcoal rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                  {item.title && (
                    <p className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] px-2 py-1 truncate">
                      {item.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <Uploader
            section={section}
            showTitle
            buttonLabel="Add Image"
            onUpload={onUpload}
          />
        </>
      )}
    </div>
  );
}

function MediaThumb({ item }: { item: AdminItem | undefined }) {
  if (!item) {
    return (
      <div className="w-full h-full min-h-24 flex items-center justify-center rounded-lg bg-cream text-charcoal-light">
        <ImageOff size={20} />
      </div>
    );
  }
  if (item.type === "video") {
    return <video src={item.url} muted className="w-full h-full object-cover rounded-lg" />;
  }
  return <img src={item.url} alt={item.alt} className="w-full h-full object-cover rounded-lg" />;
}

function Uploader({
  section,
  showTitle,
  buttonLabel,
  onUpload,
}: {
  section: SectionDef;
  showTitle: boolean;
  buttonLabel: string;
  onUpload: (section: string, file: File, alt: string, title: string) => Promise<void>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setErr("File is too large (max 100 MB).");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await onUpload(section.key, file, alt, title);
      setFile(null);
      setAlt("");
      setTitle("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          aria-label="Choose file"
          accept={acceptAttr(section.accepts)}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-charcoal-light file:mr-3 file:rounded-md file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-white file:text-xs file:tracking-wide file:uppercase file:cursor-pointer"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Description (alt text)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="border border-rose rounded-md px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-charcoal"
        />
        {showTitle && (
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-rose rounded-md px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-charcoal"
          />
        )}
      </div>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={!file || busy}
        className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors disabled:opacity-50"
      >
        <UploadCloud size={14} />
        {busy ? "Uploading…" : buttonLabel}
      </button>
    </div>
  );
}
