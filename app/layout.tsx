import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lmballoons.com"),
  title: {
    default: "Custom Balloon Decorations Chicagoland | LM Designs & Balloons Co.",
    template: "%s | LM Designs & Balloons Co.",
  },
  description:
    "Custom balloon garlands, arches, LED centerpieces, and event decor in Schaumburg, Elmhurst, Naperville, and Chicago's western suburbs. Book LM Designs & Balloons Co. for your next celebration.",
  openGraph: {
    title: "LM Designs & Balloons Co.",
    description:
      "Boutique custom balloon decorating service in Chicagoland. Garlands, arches, LED centerpieces, and full event styling.",
    type: "website",
    siteName: "LM Designs & Balloons Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LM Designs & Balloons Co.",
    description:
      "Boutique custom balloon decorating service in Chicagoland. Garlands, arches, LED centerpieces, and full event styling.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.lmballoons.com",
  name: "LM Designs & Balloons Co.",
  description:
    "Custom balloon decorating and event styling service serving Chicago's western suburbs. Specializing in balloon garlands, arches, LED centerpieces, and full event decor.",
  url: "https://www.lmballoons.com",
  telephone: "",
  email: "LM.Designs.Balloons.Co@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chicagoland",
    addressRegion: "IL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.8819,
    longitude: -88.0094,
  },
  areaServed: [
    { "@type": "City", name: "Schaumburg, IL" },
    { "@type": "City", name: "Elmhurst, IL" },
    { "@type": "City", name: "Itasca, IL" },
    { "@type": "City", name: "Naperville, IL" },
    { "@type": "City", name: "Oak Brook, IL" },
    { "@type": "City", name: "Addison, IL" },
    { "@type": "City", name: "Lombard, IL" },
    { "@type": "City", name: "Villa Park, IL" },
    { "@type": "City", name: "Glen Ellyn, IL" },
    { "@type": "City", name: "Wheaton, IL" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Balloon Decoration Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Balloon Garlands" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balloon Arches" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LED Balloon Centerpieces" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balloon Columns" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balloon Backdrops" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Event Styling" } },
    ],
  },
  knowsAbout: [
    "balloon decorating",
    "custom balloon garlands",
    "balloon arches",
    "LED balloon centerpieces",
    "event decor",
    "party decorations",
    "wedding balloon decor",
    "corporate event styling",
  ],
  sameAs: [
    "https://instagram.com/lmdesignsandco",
    "https://www.facebook.com/people/LM-Designs-Balloons-Co/61586605825525/",
  ],
  image: "https://www.lmballoons.com/images/logo.png",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3D3230" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-charcoal focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
