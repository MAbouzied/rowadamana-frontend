import { notFound } from "next/navigation";
import Link from "next/link";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";
import ImageSlider from "@/components/shared/ImageSlider";

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) notFound();

  const gallery = "gallery" in item && item.gallery ? item.gallery : [item.image, item.image, item.image];
  const relatedItems = PORTFOLIO_ITEMS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div>
      <section className="relative h-[55vh] min-h-[400px] bg-slate-900 overflow-hidden">
        <SiteImage
          src={"heroImage" in item && item.heroImage ? item.heroImage : item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <h1 className="font-cairo text-4xl sm:text-5xl font-bold text-white mb-4">
            {item.title}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            {"summary" in item ? item.summary : ""}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {"description" in item && item.description && (
              <section>
                <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                  وصف المشروع
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </section>
            )}

            {gallery.length > 0 && (
              <section>
                <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                  معرض الصور
                </h2>
                <ImageSlider images={gallery} altPrefix={item.title} />
              </section>
            )}
          </div>

          <aside className="space-y-8">
            {"servicesUsed" in item && item.servicesUsed && item.servicesUsed.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-cairo font-bold text-xl text-slate-900 mb-4">
                  الخدمات المستخدمة
                </h3>
                <ul className="space-y-2">
                  {item.servicesUsed.map((s, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {"location" in item && item.location && (
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-cairo font-bold text-xl text-slate-900 mb-2">
                  الموقع
                </h3>
                <p className="text-slate-600">{item.location}</p>
              </div>
            )}

            <Link
              href="/contact"
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              تواصل معنا الان
            </Link>
          </aside>
        </div>

        {relatedItems.length > 0 && (
          <section className="mt-24 pt-16 border-t border-slate-200">
            <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-10">
              مشاريع ذات صلة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedItems.map((related) => (
                <Link
                  key={related.id}
                  href={`/portfolio/${related.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <SiteImage
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-cairo font-bold text-slate-900 group-hover:text-amber-600">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
