"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import SiteImage from "./SiteImage";

const THUMBNAILS_VISIBLE_DESKTOP = 6;
const THUMBNAIL_GAP = 8;

interface ImageSliderProps {
  images: string[];
  altPrefix: string;
}

export default function ImageSlider({ images, altPrefix }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const safeImages = images && images.length > 0 ? images : [];
  const len = safeImages.length;

  const next = useCallback(() => setActiveIndex((i) => (len ? (i + 1) % len : 0)), [len]);
  const prev = useCallback(() => setActiveIndex((i) => (len ? (i - 1 + len) % len : 0)), [len]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const container = thumbContainerRef.current;
    const thumb = thumbRefs.current[activeIndex];
    if (!container || !thumb) return;

    const containerRect = container.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumbRect.width + THUMBNAIL_GAP;
    const containerWidth = containerRect.width;

    // Center the active thumbnail or keep it visible
    const targetScroll = thumbLeft - containerWidth / 2 + thumbWidth / 2;
    const clampedScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - containerWidth));

    container.scrollTo({ left: clampedScroll, behavior: "smooth" });
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (len <= 1) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        next();
      } else if (e.key >= "1" && e.key <= "9" && parseInt(e.key, 10) <= len) {
        e.preventDefault();
        setActiveIndex(parseInt(e.key, 10) - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [len, next, prev]);

  // Touch handling for main image swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleMainTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleMainTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStartX(null);
  };

  if (safeImages.length === 0) return null;

  return (
    <div
      className="relative w-full max-w-full min-w-0 overflow-hidden"
      role="region"
      aria-label="معرض الصور"
      tabIndex={0}
    >
      {/* Main image */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-lg touch-pan-y"
        onTouchStart={handleMainTouchStart}
        onTouchEnd={handleMainTouchEnd}
      >
        {safeImages.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              i === activeIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-[0.98] pointer-events-none z-0"
            }`}
            aria-hidden={i !== activeIndex}
          >
            <SiteImage
              src={src}
              alt={`${altPrefix} - صورة ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Main image nav arrows (desktop) */}
        {len > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 z-20"
              aria-label="الصورة السابقة"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 left-3 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 z-20"
              aria-label="الصورة التالية"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {len > 1 && (
        <div className="mt-4 min-w-0">
          <div
            ref={thumbContainerRef}
            className="flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-1 min-w-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            role="tablist"
            aria-label="اختر صورة"
          >
            {safeImages.map((src, i) => (
              <button
                key={i}
                ref={(el) => { thumbRefs.current[i] = el; }}
                type="button"
                onClick={() => setActiveIndex(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`صورة ${i + 1}`}
                className={`flex-shrink-0 w-14 h-14 min-w-[56px] sm:w-16 sm:min-w-[64px] sm:h-16 md:min-w-[72px] md:max-w-[90px] aspect-square rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                  i === activeIndex
                    ? "ring-2 ring-amber-500 ring-offset-2 shadow-lg shadow-amber-500/20 scale-[1.02]"
                    : "opacity-70 hover:opacity-100 border-2 border-transparent hover:border-slate-200"
                }`}
              >
                <SiteImage
                  src={src}
                  alt={`${altPrefix} - مصغرة ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Thumbnail carousel arrows when many images */}
          {len > THUMBNAILS_VISIBLE_DESKTOP && (
            <div className="hidden sm:flex justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  const container = thumbContainerRef.current;
                  if (container) {
                    container.scrollBy({ left: -120, behavior: "smooth" });
                  }
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="تمرير المصغرات للخلف"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const container = thumbContainerRef.current;
                  if (container) {
                    container.scrollBy({ left: 120, behavior: "smooth" });
                  }
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="تمرير المصغرات للأمام"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
