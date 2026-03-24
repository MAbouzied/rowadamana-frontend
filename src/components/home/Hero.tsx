import Link from "next/link";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { HERO_CONTENT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${HERO_CONTENT.image || "https://rowadamana.com/wp-content/uploads/2023/11/Untitled-design-45.jpg"}")`,
        }}
      />
      <div className="absolute inset-0 bg-slate-900/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-800/40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-amber-400 font-medium mb-3 text-sm uppercase tracking-wider">
          {HERO_CONTENT.headline}
        </p>
        <h1 className="font-cairo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {HERO_CONTENT.tagline}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
          {HERO_CONTENT.subheadline}
        </p>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          {HERO_CONTENT.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <TrackedContactLink
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-xl font-bold text-base transition-all shadow-xl hover:shadow-amber-500/30 hover:scale-105"
            leadChannel="nav_contact"
            leadLocation="hero"
          >
            تواصل معنا
          </TrackedContactLink>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/90 text-white hover:bg-white/15 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105"
          >
            أعمالنا
          </Link>
        </div>
      </div>
    </section>
  );
}
