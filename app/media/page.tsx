"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, X, Volume2, VolumeX, Play } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
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

const staggerOffsets = ["mt-8", "mt-0", "mt-12"];

function VideoCard({
  item,
  index,
  onClick,
}: {
  item: MediaItem;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative aspect-[9/16] w-[180px] md:w-[220px] rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 snap-center transition-all duration-500 hover:glow-warm-hover ${staggerOffsets[index % 3]}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D3230]/60 via-transparent to-transparent" />

      {/* Play indicator */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
          <Play size={22} className="text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Title + label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-medium leading-tight">
          {item.title}
        </p>
        <p className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
          Watch Reel
        </p>
      </div>
    </div>
  );
}

function MobileVideoCard({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative aspect-[9/16] w-[75vw] max-w-[280px] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 snap-center"
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D3230]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play size={22} className="text-white ml-1" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-medium leading-tight">
          {item.title}
        </p>
        <p className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
          Watch Reel
        </p>
      </div>
    </div>
  );
}

function ReelsViewer({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function goTo(index: number) {
    if (index >= 0 && index < videoItems.length) {
      setCurrentIndex(index);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowUp") setCurrentIndex((i) => Math.max(i - 1, 0));
      if (e.key === "ArrowDown") setCurrentIndex((i) => Math.min(i + 1, videoItems.length - 1));
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -80) setCurrentIndex((i) => Math.min(i + 1, videoItems.length - 1));
    else if (info.offset.y > 80) setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const currentVideo = videoItems[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[95] text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Phone frame (desktop) / full viewport (mobile) */}
      <div className="relative z-[92] w-screen h-[100dvh] md:w-auto md:max-w-[400px] md:h-[85vh] md:rounded-3xl overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
          >
            <video
              ref={videoRef}
              key={currentVideo.src}
              src={currentVideo.src}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-[93]">
          <p className="text-white font-serif text-xl mb-2">
            {currentVideo.title}
          </p>
          <Link
            href={`/contact?style=${encodeURIComponent(currentVideo.alt)}`}
            className="inline-flex items-center gap-1.5 text-white/90 text-xs tracking-widest uppercase border-b border-white/50 pb-0.5 hover:text-white transition-colors pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            Book This Style
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Mute toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-6 right-6 z-[94] text-white/70 hover:text-white transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Dot indicators (right side) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[94]">
          {videoItems.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile tap zones */}
        <div
          className="absolute left-0 top-0 w-full h-1/4 z-[93] md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => Math.max(i - 1, 0));
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-full h-1/4 z-[92] md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => Math.min(i + 1, videoItems.length - 1));
          }}
        />
      </div>
    </motion.div>
  );
}

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [reelsIndex, setReelsIndex] = useState<number | null>(null);

  return (
    <>
      {/* Page Header with Hero Image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="/images/blog/media-hero.png"
          alt="Balloon garland arch framing a dessert table"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
            Our Recent Work
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Media
          </h1>
          <p className="text-white/80 mt-4 max-w-lg">
            A look at our recent installations, custom designs, and event
            transformations.
          </p>

          {/* Tabs */}
          <div className="flex gap-8 mt-8 border-b border-white/20">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs tracking-[0.25em] uppercase transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-white -mb-px"
                    : "text-white/60 hover:text-white"
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
                    <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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

          {/* Videos — Desktop: staggered vertical cards */}
          {activeTab === "videos" && (
            <>
              <div className="hidden md:flex items-end justify-center gap-6 py-8">
                {videoItems.map((item, i) => (
                  <VideoCard
                    key={item.src}
                    item={item}
                    index={i}
                    onClick={() => setReelsIndex(i)}
                  />
                ))}
              </div>

              {/* Videos — Mobile: horizontal snap-scroll carousel */}
              <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2">
                {videoItems.map((item, i) => (
                  <MobileVideoCard
                    key={item.src}
                    item={item}
                    onClick={() => setReelsIndex(i)}
                  />
                ))}
              </div>
            </>
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

      {/* Reels Viewer */}
      <AnimatePresence>
        {reelsIndex !== null && (
          <ReelsViewer
            initialIndex={reelsIndex}
            onClose={() => setReelsIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Love What You See?
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Let&apos;s bring your vision to life. Contact us to discuss your
            event.
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
