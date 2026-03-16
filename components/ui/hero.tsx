"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  tagline?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  imageSrc,
  imageAlt,
  title,
  tagline,
  ctaText = "Book Your Event",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden -mt-16">
      {/* Background image with Ken Burns zoom */}
      <div className="absolute inset-0 hero-ken-burns">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Full overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Warm glow accent behind text */}
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-[5]"
        style={{
          background: "radial-gradient(ellipse, rgba(232, 190, 160, 0.15) 0%, transparent 70%)"
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-9xl text-white leading-[0.9] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] hero-fade-in hover:text-cream hover:tracking-normal transition-all duration-700 ease-out cursor-default">
          {title}
        </h1>

        {tagline && (
          <p className="mt-6 text-xs md:text-sm tracking-[0.3em] uppercase text-white/80 max-w-md hero-fade-in-delayed-1">
            {tagline}
          </p>
        )}

        <Link
          href={ctaHref}
          className="mt-10 inline-flex items-center gap-2 border border-white/50 text-white px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hero-fade-in-delayed-2"
        >
          {ctaText}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
