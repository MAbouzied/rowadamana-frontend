import { notFound } from "next/navigation";
import { SERVICES, SERVICE_SLUGS, CONTACT, type ServiceSlug } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";
import ImageSlider from "@/components/shared/ImageSlider";

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();

  const service = SERVICES[slug as ServiceSlug];
  const gallery =
    service.gallery && service.gallery.length > 0
      ? service.gallery
      : service.image
        ? [service.image]
        : [];

  return (
    <div>
      <section className="relative h-[55vh] min-h-[400px] bg-slate-900 overflow-hidden">
        <SiteImage
          src={"heroImage" in service && service.heroImage ? service.heroImage : (service.image || "https://rowadamana.com/wp-content/uploads/2023/08/Untitled-design-42.jpg")}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <h1 className="font-cairo text-4xl sm:text-5xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12 min-w-0 overflow-hidden">
            <section>
              <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                وصف الخدمة
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {service.detailedDescription || service.description}
              </p>
            </section>

            {gallery.length > 0 && (
              <section>
                <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                  معرض الصور
                </h2>
                <ImageSlider images={gallery} altPrefix={service.title} />
              </section>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <section>
                <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                  مميزات الخدمة
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"
                    >
                      <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-5 h-5 text-amber-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-slate-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {service.whyChoose && service.whyChoose.length > 0 && (
              <section>
                <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-6">
                  لماذا تختارنا
                </h2>
                <ul className="space-y-4">
                  {service.whyChoose.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl"
                    >
                      <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-600">{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-8">
            {service.materials && service.materials.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-cairo font-bold text-xl text-slate-900 mb-4">
                  المواد المستخدمة
                </h3>
                <ul className="space-y-2">
                  {service.materials.map((m, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.customization && service.customization.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-cairo font-bold text-xl text-slate-900 mb-4">
                  خيارات التخصيص
                </h3>
                <ul className="space-y-2">
                  {service.customization.map((c, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن الخدمات")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              واتساب
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
