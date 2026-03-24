import type { MetadataRoute } from "next";
import {
  PORTFOLIO_ITEMS,
  SERVICE_SLUGS,
} from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticPaths = ["", "/about", "/contact", "/services", "/portfolio"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of SERVICE_SLUGS) {
    entries.push({
      url: `${base}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const item of PORTFOLIO_ITEMS) {
    entries.push({
      url: `${base}/portfolio/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
