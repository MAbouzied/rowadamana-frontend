const DEFAULT_SITE_URL = "https://rowadamana.com";

/** Canonical site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** Absolute URL for a path starting with `/`. */
export function getAbsoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

/** Default Open Graph image (absolute URL, raster). */
export const DEFAULT_OG_IMAGE =
  "https://rowadamana.com/wp-content/uploads/2023/11/Untitled-design-45.jpg";
