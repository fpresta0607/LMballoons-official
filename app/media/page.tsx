"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";

const media = [
  {
    src: "/images/generated/BalloonGarlandBackdrop.png",
    alt: "Balloon garland backdrop",
    title: "Garland Backdrop",
  },
  {
    src: "/images/generated/LedCenterpiece2.png",
    alt: "LED centerpiece design",
    title: "LED Centerpiece",
  },
  {
    src: "/images/generated/BirthdayPartyArch.png",
    alt: "Birthday party arch",
    title: "Birthday Arch",
  },
  {
    src: "/images/generated/LEDcenterpiece3.png",
    alt: "LED centerpiece",
    title: "Glowing Arrangement",
  },
  {
    src: "/images/generated/StPatricksGarland.png",
    alt: "St. Patrick's Day garland",
    title: "St. Patrick\u2019s Garland",
  },
  {
    src: "/images/generated/ValentinesCenterpiece.png",
    alt: "Valentine's centerpiece",
    title: "Valentine\u2019s Centerpiece",
  },
  {
    src: "/images/generated/LEDCenterpiece_Home.png",
    alt: "LED centerpiece event display",
    title: "Event Display",
  },
  {
    src: "/images/generated/ValentinesPillar.png",
    alt: "Valentine's pillar display",
    title: "Valentine\u2019s Pillar",
  },
  {
    src: "/images/generated/StPatricksLobby.png",
    alt: "St. Patrick's Day lobby display",
    title: "Lobby Installation",
  },
];

// Bento grid layout pattern — maps index to grid span classes
// Creates an asymmetric, magazine-style layout
const bentoPattern = [
  "col-span-2 row-span-2",  // 0: large hero tile
  "col-span-1 row-span-1",  // 1: standard
  "col-span-1 row-span-2",  // 2: tall
  "col-span-1 row-span-1",  // 3: standard
  "col-span-1 row-span-1",  // 4: standard
  "col-span-2 row-span-1",  // 5: wide
  "col-span-1 row-span-1",  // 6: standard
  "col-span-1 row-span-1",  // 7: standard
  "col-span-1 row-span-1",  // 8: standard
];

export default function MediaPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Page Header */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Our Work
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight">
            Media
          </h1>
          <p className="text-charcoal-light mt-4 max-w-lg">
            A look at our recent installations, custom designs, and event transformations.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] gap-2 sm:gap-3">
            {media.map((item, i) => (
              <div
                key={item.src}
                className={`relative overflow-hidden cursor-pointer group ${bentoPattern[i]} transition-all duration-500 hover:glow-warm-hover hover:z-10`}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Permanent subtle gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />

                {/* Title — always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                  <h2 className="font-serif text-sm sm:text-base md:text-lg text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1">
                    {item.title}
                  </h2>

                  {/* Book This Style — slides up on hover */}
                  <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 mt-2">
                    <Link
                      href={`/contact?style=${encodeURIComponent(item.alt)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-white text-[10px] sm:text-xs tracking-widest uppercase border-b border-white/70 pb-0.5 hover:text-cream transition-colors"
                    >
                      Book This Style
                      <ArrowRight size={11} />
                    </Link>
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
          images={media}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* CTA */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Love What You See?
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Let&apos;s bring your vision to life. Contact us to discuss your event.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
          >
            Book Your Event
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
