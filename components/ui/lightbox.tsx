"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[92] text-white/70 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X size={28} />
        </button>

        {/* Image counter */}
        <div className="absolute top-4 left-4 z-[92] text-white/70 text-sm tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation arrows — desktop */}
        <button
          onClick={goPrev}
          className="absolute left-4 z-[92] text-white/50 hover:text-white transition-colors hidden md:block"
          aria-label="Previous image"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 z-[92] text-white/50 hover:text-white transition-colors hidden md:block"
          aria-label="Next image"
        >
          <ChevronRight size={40} />
        </button>

        {/* Mobile tap zones */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full z-[91] md:hidden"
          onClick={goPrev}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-full z-[91] md:hidden"
          onClick={goNext}
        />

        {/* Image */}
        <motion.div
          className="relative z-[91] w-[90vw] h-[80vh] max-w-5xl pointer-events-none"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          key={currentIndex}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
