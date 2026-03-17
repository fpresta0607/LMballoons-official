import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balloon Decor Gallery",
  description:
    "Browse our portfolio of custom balloon garlands, arches, LED centerpieces, and event decor. Serving Schaumburg, Elmhurst, Naperville, and Chicagoland.",
  openGraph: {
    title: "Balloon Decor Gallery | LM Designs & Balloons Co.",
    description:
      "Browse our portfolio of custom balloon garlands, arches, LED centerpieces, and event decor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balloon Decor Gallery | LM Designs & Balloons Co.",
    description:
      "Browse our portfolio of custom balloon garlands, arches, LED centerpieces, and event decor.",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
