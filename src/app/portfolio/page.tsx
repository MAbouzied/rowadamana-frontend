import type { Metadata } from "next";
import Link from "next/link";
import { PORTFOLIO_ITEMS, SITE_NAME } from "@/lib/constants";
import { getAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "أعمالنا",
  description:
    "معرض مشاريع رواد الامانة: تركيب شتر، تند ومظلات، أغطية مسابح، عربات فودتراك وجودة تنفيذ عالية.",
  alternates: { canonical: getAbsoluteUrl("/portfolio") },
  openGraph: {
    title: `أعمالنا | ${SITE_NAME}`,
    url: getAbsoluteUrl("/portfolio"),
  },
};
import SiteImage from "@/components/shared/SiteImage";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="font-cairo text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            أعمالنا
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            مجموعة من مشاريعنا المنجزة في الشتر والزجاج والتصميم
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SiteImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold">
                      عرض المشروع
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h2 className="font-cairo font-bold text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                    {"summary" in item ? item.summary : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
