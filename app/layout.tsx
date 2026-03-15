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
  metadataBase: new URL("https://lmdesignsandco.com"),
  title: "LM Designs & Balloons Co. | Custom Balloon Artistry",
  description:
    "Custom balloon design for birthdays, parties, and every celebration. Based in Chicagoland, IL. Follow us @lmdesignsandco.",
  openGraph: {
    title: "LM Designs & Balloons Co.",
    description: "Bringing your celebrations to life with bespoke balloon artistry.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "LM Designs & Balloons Co.",
  description: "Custom balloon design for birthdays, parties, and every celebration.",
  url: "https://lmdesignsandco.com",
  telephone: "",
  email: "LM.Designs.Balloons.Co@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chicagoland",
    addressRegion: "IL",
    addressCountry: "US",
  },
  sameAs: ["https://instagram.com/lmdesignsandco"],
  image: "https://lmdesignsandco.com/images/logo.png",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
