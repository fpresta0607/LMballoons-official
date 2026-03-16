"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox } from "@/components/ui/lightbox";

type MediaItem = {
  src: string;
  alt: string;
  title: string;
  type?: "image" | "video";
};

const mediaItems: MediaItem[] = [
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
  {
    src: "/images/generated/BirthdayBalloon.jpg",
    alt: "Birthday balloon design",
    title: "Birthday Celebration",
  },
  {
    src: "/images/generated/CenterpieceCheetah.jpeg",
    alt: "Cheetah print centerpiece",
    title: "Cheetah Centerpiece",
  },
  {
    src: "/images/generated/CenterpieceCheetah2.jpeg",
    alt: "Cheetah print centerpiece arrangement",
    title: "Cheetah Arrangement",
  },
  {
    src: "/videos/BackdropVideo.mov",
    alt: "Balloon backdrop installation",
    title: "Backdrop Installation",
    type: "video",
  },
  {
    src: "/videos/LEDVideo.mov",
    alt: "LED balloon centerpiece display",
    title: "LED Display",
    type: "video",
  },
  {
    src: "/videos/StPatricksVideo.mov",
    alt: "St. Patrick's Day balloon installation",
    title: "St. Patrick\u2019s Installation",
    type: "video",
  },
];

const photoItems = mediaItems.filter((item) => item.type !== "video");
const videoItems = mediaItems.filter((item) => item.type === "video");

const bentoPattern = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);

  const goPrevVideo = useCallback(() => {
    setVideoIndex((i) => (i !== null ? (i - 1 + videoItems.length) % videoItems.length : null));
  }, []);
  const goNextVideo = useCallback(() => {
    setVideoIndex((i) => (i !== null ? (i + 1) % videoItems.length : null));
  }, []);

  useEffect(() => {
    if (videoIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVideoIndex(null);
      if (e.key === "ArrowLeft") goPrevVideo();
      if (e.key === "ArrowRight") goNextVideo();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [videoIndex, goPrevVideo, goNextVideo]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Our Recent Work
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight">
            Media
          </h1>
          <p className="text-charcoal-light mt-4 max-w-lg">
            A look at our recent installations, custom designs, and event transformations.
          </p>

          {/* Tabs */}
          <div className="flex gap-8 mt-8 border-b border-rose">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs tracking-[0.25em] uppercase transition-colors ${
                  activeTab === tab
                    ? "text-charcoal border-b-2 border-charcoal -mb-px"
                    : "text-charcoal-light hover:text-charcoal"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* Photos */}
          {activeTab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] gap-2 sm:gap-3">
              {photoItems.map((item, i) => (
                <div
                  key={item.src}
                  className={`relative overflow-hidden cursor-pointer group ${bentoPattern[i % bentoPattern.length]} transition-all duration-500 hover:glow-warm-hover hover:z-10`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    <h2 className="font-serif text-sm sm:text-base md:text-lg text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1">
                      {item.title}
                    </h2>
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
          )}

          {/* Videos */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videoItems.map((item) => (
                <div
                  key={item.src}
                  className="relative overflow-hidden cursor-pointer group aspect-video bg-charcoal transition-all duration-500 hover:glow-warm-hover hover:z-10"
                  onClick={() => setVideoIndex(videoItems.indexOf(item))}
                >
                  <video
                    src={item.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="font-serif text-base text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      {item.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={photoItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {videoIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setVideoIndex(null)} />

            {/* Close */}
            <button
              onClick={() => setVideoIndex(null)}
              className="absolute top-4 right-4 z-[92] text-white/70 hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X size={28} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-[92] text-white/70 text-sm tracking-widest">
              {videoIndex + 1} / {videoItems.length}
            </div>

            {/* Prev / Next — desktop */}
            <button
              onClick={goPrevVideo}
              className="absolute left-4 z-[92] text-white/50 hover:text-white transition-colors hidden md:block"
              aria-label="Previous video"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={goNextVideo}
              className="absolute right-4 z-[92] text-white/50 hover:text-white transition-colors hidden md:block"
              aria-label="Next video"
            >
              <ChevronRight size={40} />
            </button>

            {/* Mobile tap zones */}
            <div className="absolute left-0 top-0 w-1/4 h-full z-[91] md:hidden" onClick={goPrevVideo} />
            <div className="absolute right-0 top-0 w-1/4 h-full z-[91] md:hidden" onClick={goNextVideo} />

            <motion.video
              key={videoItems[videoIndex].src}
              src={videoItems[videoIndex].src}
              autoPlay
              muted
              playsInline
              className="relative z-[91] w-[90vw] max-w-5xl max-h-[80vh] outline-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
