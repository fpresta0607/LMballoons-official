"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ScrollExpandHeroProps {
  images: { src: string; alt: string }[];
  bgImageSrc: string;
  title: string;
  scrollHint?: string;
  autoAdvanceMs?: number;
  children?: ReactNode;
}

export function ScrollExpandHero({
  images,
  bgImageSrc,
  title,
  scrollHint = "Scroll to Explore",
  autoAdvanceMs = 4000,
  children,
}: ScrollExpandHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, autoAdvanceMs);
    return () => clearInterval(interval);
  }, [images.length, autoAdvanceMs]);

  // Scroll progress across the 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Media window expansion (0 → 55% of scroll)
  const windowWidth = useTransform(scrollYProgress, [0, 0.55], ["65%", "100%"]);
  const windowHeight = useTransform(scrollYProgress, [0, 0.55], ["55vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.55], [24, 0]);

  // Title split animation (0 → 35% of scroll)
  const titleTopY = useTransform(scrollYProgress, [0, 0.35], [0, -150]);
  const titleBottomY = useTransform(scrollYProgress, [0, 0.35], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.3], [1, 0]);

  // Scroll hint fades out quickly
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Children revealed as sticky section unsticks
  const childrenOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const childrenY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);

  // Background parallax
  const bgScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.15]);

  // Split title at "+"
  const plusIndex = title.indexOf("+");
  const titleTop = plusIndex >= 0 ? title.slice(0, plusIndex).trim() + " +" : title;
  const titleBottom = plusIndex >= 0 ? title.slice(plusIndex + 1).trim() : "";

  return (
    <div className="-mt-16">
      {/* Scroll-driven container — tall enough to drive the animation */}
      <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          {/* Background image with subtle parallax */}
          <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
            <Image
              src={bgImageSrc}
              alt=""
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          </motion.div>

          {/* Title overlay — splits apart on scroll */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center gap-1 md:gap-2">
            <motion.div style={{ y: titleTopY, opacity: titleOpacity }}>
              <span className="block font-serif text-5xl md:text-7xl lg:text-9xl text-white text-center leading-none mix-blend-difference">
                {titleTop}
              </span>
            </motion.div>
            {titleBottom && (
              <motion.div style={{ y: titleBottomY, opacity: titleOpacity }}>
                <span className="block font-serif text-5xl md:text-7xl lg:text-9xl text-white text-center leading-none mix-blend-difference">
                  {titleBottom}
                </span>
              </motion.div>
            )}
          </div>

          {/* Expanding media window */}
          <motion.div
            className="relative z-10 overflow-hidden shadow-2xl"
            style={{
              width: windowWidth,
              height: windowHeight,
              borderRadius,
            }}
          >
            {images.map((img, i) => (
              <div
                key={img.src}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: i === currentImage ? 1 : 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Vignette + warm grade overlays */}
            <div className="absolute inset-0 hero-vignette pointer-events-none" />
            <div className="absolute inset-0 hero-warm-grade pointer-events-none" />

            {/* Carousel dots */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? "bg-white w-6"
                        : "bg-white/50 w-2 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-cream/80">
              {scrollHint}
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-cream/60 to-transparent scroll-hint-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Children content — fades in as hero finishes expanding */}
      <motion.div style={{ opacity: childrenOpacity, y: childrenY }}>
        {children}
      </motion.div>
    </div>
  );
}
