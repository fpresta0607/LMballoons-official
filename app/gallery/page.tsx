"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";
import { useInView } from "@/hooks/use-in-view";

const categories = ["All", "Arches & Backdrops", "Centerpieces"] as const;
type Category = (typeof categories)[number];

const images: { src: string; alt: string; category: Exclude<Category, "All"> }[] = [
  {
    src: "/images/generated/LedCenterpiece2.png",
    alt: "LED centerpiece design",
    category: "Centerpieces",
  },
  {
    src: "/images/generated/LEDcenterpiece3.png",
    alt: "LED centerpiece",
    category: "Centerpieces",
  },
  {
    src: "/images/generated/LEDCenterpiece_Home.png",
    alt: "LED centerpiece event display",
    category: "Centerpieces",
  },
  {
    src: "/images/generated/ValentinesCenterpiece.png",
    alt: "Valentine's centerpiece",
    category: "Centerpieces",
  },
  {
    src: "/images/generated/ValentinesPillar.png",
    alt: "Valentine's pillar display",
    category: "Centerpieces",
  },
  {
    src: "/images/generated/BirthdayPartyArch.png",
    alt: "Birthday party arch",
    category: "Arches & Backdrops",
  },
  {
    src: "/images/generated/BalloonGarlandBackdrop.png",
    alt: "Balloon garland backdrop",
    category: "Arches & Backdrops",
  },
  {
    src: "/images/generated/StPatricksGarland.png",
    alt: "St. Patrick's Day garland",
    category: "Arches & Backdrops",
  },
  {
    src: "/images/generated/StPatricksLobby.png",
    alt: "St. Patrick's Day lobby display",
    category: "Arches & Backdrops",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridView = useInView();
  const ctaView = useInView();

  const filtered =
    active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <>
      {/* Page Header */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Our Portfolio
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight">
            Gallery
          </h1>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
                  active === cat
                    ? "bg-charcoal text-white"
                    : "border border-rose text-charcoal-light hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            key={active}
            ref={gridView.ref}
            data-in-view={gridView.isInView}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
          >
            {filtered.map((img, i) => (
              <div
                key={img.src}
                className={`transition-all duration-500 hover:-translate-y-1.5 hover:glow-warm-hover group cursor-pointer scroll-fade stagger-${i + 1}`}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-end p-4">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
                      <Link
                        href={`/contact?style=${encodeURIComponent(img.alt)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-white text-xs tracking-widest uppercase border-b border-white pb-0.5 hover:text-cream transition-colors"
                      >
                        Book This Style
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* CTA */}
      <section className="bg-cream py-12 md:py-16">
        <div ref={ctaView.ref} data-in-view={ctaView.isInView} className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4 scroll-fade">
            Love What You See?
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto scroll-fade stagger-2">
            Let&apos;s bring your vision to life. Contact us to discuss your event.
          </p>
          <div className="scroll-fade stagger-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
            >
              Book Your Event
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
