"use client";

import { useState, useCallback } from "react";
import SiteImage from "./SiteImage";

interface ImageSliderProps {
  images: string[];
  altPrefix: string;
}

export default function ImageSlider({ images, altPrefix }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const safeImages = images && images.length > 0 ? images : [];
  const len = safeImages.length;
  const next = useCallback(() => setCurrent((i) => (len ? (i + 1) % len : 0)), [len]);
  const prev = useCallback(() => setCurrent((i) => (len ? (i - 1 + len) % len : 0)), [len]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  if (safeImages.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="aspect-video rounded-2xl overflow-hidden bg-slate-100 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SiteImage
          src={safeImages[current]}
          alt={`${altPrefix} - صورة ${current + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="السابق"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="التالي"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-amber-500" : "bg-slate-300"}`}
                aria-label={`صورة ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
