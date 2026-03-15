import Link from "next/link";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";

export default function PortfolioSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            أعمالنا
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            مجموعة من مشاريعنا المنجزة في الشتر والزجاج والتصميم
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group block rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-500/30 hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <SiteImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-cairo font-bold text-xl text-slate-900 group-hover:text-amber-600">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
