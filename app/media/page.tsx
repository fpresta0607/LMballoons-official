"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";
import { useInView } from "@/hooks/use-in-view";

const media = [
  {
    src: "/images/generated/LedCenterpiece2.png",
    alt: "LED centerpiece design",
    title: "LED Centerpiece",
    description: "A warm LED centerpiece designed to set the mood at any tablescape. Soft lighting meets sculpted balloon artistry.",
  },
  {
    src: "/images/generated/LEDcenterpiece3.png",
    alt: "LED centerpiece",
    title: "Glowing Arrangement",
    description: "Custom LED-lit balloon arrangement perfect for intimate dinners, cocktail hours, and reception tables.",
  },
  {
    src: "/images/generated/LEDCenterpiece_Home.png",
    alt: "LED centerpiece event display",
    title: "Event Display",
    description: "Full event centerpiece setup featuring coordinated LED balloon designs across multiple tables.",
  },
  {
    src: "/images/generated/ValentinesCenterpiece.png",
    alt: "Valentine's centerpiece",
    title: "Valentine\u2019s Centerpiece",
    description: "Romantic balloon centerpiece in reds and pinks, designed for Valentine\u2019s Day celebrations and date nights.",
  },
  {
    src: "/images/generated/ValentinesPillar.png",
    alt: "Valentine's pillar display",
    title: "Valentine\u2019s Pillar",
    description: "Elegant pillar arrangement with cascading balloon garlands in a Valentine\u2019s color palette.",
  },
  {
    src: "/images/generated/BirthdayPartyArch.png",
    alt: "Birthday party arch",
    title: "Birthday Party Arch",
    description: "Statement balloon arch framing the party space. Custom colors matched to the birthday theme.",
  },
  {
    src: "/images/generated/BalloonGarlandBackdrop.png",
    alt: "Balloon garland backdrop",
    title: "Garland Backdrop",
    description: "Full-wall balloon garland backdrop for photo ops, dessert tables, and stage areas.",
  },
  {
    src: "/images/generated/StPatricksGarland.png",
    alt: "St. Patrick's Day garland",
    title: "St. Patrick\u2019s Day Garland",
    description: "Festive green and gold balloon garland bringing seasonal spirit to any venue or storefront.",
  },
  {
    src: "/images/generated/StPatricksLobby.png",
    alt: "St. Patrick's Day lobby display",
    title: "Lobby Installation",
    description: "Grand lobby balloon installation designed for commercial spaces, welcoming guests with themed décor.",
  },
];

export default function MediaPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const feedView = useInView();
  const ctaView = useInView();

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

      {/* Feed */}
      <section className="py-12 md:py-20 bg-white">
        <div
          ref={feedView.ref}
          data-in-view={feedView.isInView}
          className="max-w-2xl mx-auto px-6 flex flex-col gap-10 md:gap-14"
        >
          {media.map((item, i) => (
            <article
              key={item.src}
              className={`border border-rose transition-all duration-500 hover:glow-warm hover:-translate-y-1 group scroll-fade stagger-${Math.min(i + 1, 9)}`}
            >
              {/* Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-end p-4 sm:p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/contact?style=${encodeURIComponent(item.alt)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-white text-xs tracking-widest uppercase border-b border-white pb-0.5 hover:text-cream transition-colors"
                    >
                      Book This Style
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6">
                <h2 className="font-serif text-xl text-charcoal mb-2">{item.title}</h2>
                <p className="text-sm text-charcoal-light leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
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
