import Link from "next/link";
import { ABOUT_CONTENT } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              {ABOUT_CONTENT.headline}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {ABOUT_CONTENT.intro}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              {ABOUT_CONTENT.mission}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {ABOUT_CONTENT.values.map((v) => (
                <span
                  key={v.title}
                  className="px-5 py-2.5 bg-amber-500/10 text-amber-700 rounded-xl font-medium"
                >
                  {v.title}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
            >
              المزيد عنا
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <SiteImage
                src="https://rowadamana.com/wp-content/uploads/2023/08/Untitled-design-45.jpg"
                alt="رواد الامانة - أعمال الشتر والزجاج"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
