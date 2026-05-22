import { blogPosts } from "@/lib/blog";

export type SectionKind = "collection" | "slot";
export type AcceptKind = "image" | "video" | "image|video";

export interface SectionDef {
  /** Stable key stored in the media_items.section column. */
  key: string;
  /** "collection" = variable list (add/delete). "slot" = a single image that gets replaced. */
  kind: SectionKind;
  label: string;
  /** Which file kinds the uploader accepts. */
  accepts: AcceptKind;
  /** UI grouping in the admin dashboard. */
  group: string;
  description?: string;
}

const baseSections: SectionDef[] = [
  {
    key: "gallery",
    kind: "collection",
    label: "Media Gallery",
    accepts: "image|video",
    group: "Gallery",
    description: "Photos and videos shown on the Media page.",
  },
  {
    key: "home-featured",
    kind: "collection",
    label: "Homepage Featured",
    accepts: "image",
    group: "Homepage",
    description: "The featured-designs grid on the homepage.",
  },
  {
    key: "home-hero",
    kind: "slot",
    label: "Homepage Hero",
    accepts: "image",
    group: "Homepage",
    description: "Full-screen background image at the top of the homepage.",
  },
  {
    key: "about-founders",
    kind: "slot",
    label: "About — Founders Photo",
    accepts: "image",
    group: "About",
  },
  {
    key: "about-process",
    kind: "slot",
    label: "About — Process Photo",
    accepts: "image",
    group: "About",
  },
  {
    key: "brand-logo",
    kind: "slot",
    label: "Logo",
    accepts: "image",
    group: "Branding",
    description: "Shown in the navigation bar and homepage about section.",
  },
];

const blogSections: SectionDef[] = blogPosts.map((post) => ({
  key: `blog:${post.slug}`,
  kind: "slot" as const,
  label: post.title,
  accepts: "image" as const,
  group: "Blog Post Images",
}));

export const MEDIA_SECTIONS: SectionDef[] = [...baseSections, ...blogSections];

export function getSection(key: string): SectionDef | undefined {
  return MEDIA_SECTIONS.find((section) => section.key === key);
}
