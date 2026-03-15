import Link from "next/link";
import { SERVICES, SERVICE_SLUGS } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            تعرف على خدماتنا
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            رواد الامانة تقدم مجموعة واسعة من الخدمات لضمان أعلى مستوى من الرضا
            لشركائنا وعملائنا
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICE_SLUGS.map((slug) => {
            const service = SERVICES[slug];
            return (
              <article
                key={slug}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300"
              >
                <Link href={`/services/${slug}`} className="block">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <SiteImage
                      src={service.image || ""}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-cairo font-bold text-xl text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-4 text-amber-600 font-medium text-sm group-hover:gap-3 transition-all">
                      المزيد
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
