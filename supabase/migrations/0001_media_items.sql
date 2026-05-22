-- Admin media panel: metadata for every site image/video managed via /admin.
-- Run this in the Supabase SQL editor (or `supabase db push`) before seeding.

create table if not exists public.media_items (
  id           uuid primary key default gen_random_uuid(),
  section      text not null,
  storage_path text,
  url          text not null,
  alt          text not null default '',
  title        text not null default '',
  type         text not null default 'image' check (type in ('image', 'video')),
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists media_items_section_order_idx
  on public.media_items (section, sort_order);

-- RLS as defense in depth. The app reads/writes with the service-role key
-- (which bypasses RLS); this public read policy is for any future anon access.
alter table public.media_items enable row level security;

drop policy if exists "media_items public read" on public.media_items;
create policy "media_items public read"
  on public.media_items for select
  using (true);

-- Public storage bucket for the files. Uploads are authorized via short-lived
-- signed upload URLs minted server-side; reads are public (CDN) URLs.
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 104857600)  -- 100 MB cap per file
on conflict (id) do update set file_size_limit = excluded.file_size_limit;
