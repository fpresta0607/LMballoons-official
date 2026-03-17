import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balloon Decor Tips & Planning Guides",
  description:
    "Helpful tips, planning guides, and inspiration for your next event. Learn how to choose colors, when to book, and how to make the most of balloon decor.",
  openGraph: {
    title: "Balloon Decor Tips & Planning Guides | LM Designs & Balloons Co.",
    description:
      "Helpful tips, planning guides, and inspiration for your next event.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balloon Decor Tips & Planning Guides | LM Designs & Balloons Co.",
    description:
      "Helpful tips, planning guides, and inspiration for your next event.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
