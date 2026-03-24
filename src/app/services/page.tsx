import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SERVICE_SLUGS, SITE_NAME } from "@/lib/constants";
import { getAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "رواد الامانة تقدم نوافذ شتر، تند ومظلات، غطاء حمام السباحة، عربات فودتراك والمزيد بأعلى جودة في الرياض وجدة.",
  alternates: { canonical: getAbsoluteUrl("/services") },
  openGraph: {
    title: `خدماتنا | ${SITE_NAME}`,
    url: getAbsoluteUrl("/services"),
  },
};
import SiteImage from "@/components/shared/SiteImage";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="font-cairo text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            تعرف على خدماتنا
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            رواد الامانة تقدم مجموعة واسعة من الخدمات لضمان أعلى مستوى من الرضا
            لشركائنا وعملائنا
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICE_SLUGS.map((slug) => {
              const service = SERVICES[slug];
              return (
                <article
                  key={slug}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <Link href={`/services/${slug}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <SiteImage
                        src={service.image || ""}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold group-hover:bg-amber-600 transition-colors">
                        اعرف المزيد
                        <svg
                          className="w-5 h-5"
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
    </div>
  );
}
