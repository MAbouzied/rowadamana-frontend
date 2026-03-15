"use client";

import { useState } from "react";

const FALLBACK_IMAGE =
  "https://rowadamana.com/wp-content/uploads/2023/08/Untitled-design-42.jpg";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SiteImage({
  src,
  alt,
  className = "",
}: SiteImageProps) {
  const [error, setError] = useState(false);
  const effectiveSrc = error || !src ? FALLBACK_IMAGE : src;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
