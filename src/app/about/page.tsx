import { ABOUT_CONTENT } from "@/lib/constants";
import SiteImage from "@/components/shared/SiteImage";

function ValueCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  const icons: Record<string, JSX.Element> = {
    quality: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    time: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    professional: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    customer: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-amber-500/20 transition-all">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
        {icons[icon] || icons.quality}
      </div>
      <h3 className="font-cairo font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  const valueIcons = ["quality", "time", "professional", "customer"];

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="font-cairo text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            من نحن
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {ABOUT_CONTENT.headline}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="font-cairo font-bold text-3xl text-slate-900 mb-6">
                قصتنا
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {ABOUT_CONTENT.intro}
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                {ABOUT_CONTENT.story}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <SiteImage
                src="https://rowadamana.com/wp-content/uploads/2023/11/Untitled-design-44.jpg"
                alt="رواد الامانة"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="bg-amber-500/5 rounded-2xl p-10 border border-amber-500/20">
              <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-4">
                رؤيتنا
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {ABOUT_CONTENT.vision}
              </p>
            </div>
            <div className="bg-amber-500/5 rounded-2xl p-10 border border-amber-500/20">
              <h2 className="font-cairo font-bold text-2xl text-slate-900 mb-4">
                مهمتنا
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {ABOUT_CONTENT.mission}
              </p>
            </div>
          </div>

          <section className="mb-24">
            <h2 className="font-cairo font-bold text-3xl text-slate-900 text-center mb-12">
              قيمنا
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ABOUT_CONTENT.values.map((v, i) => (
                <ValueCard
                  key={i}
                  title={v.title}
                  desc={v.desc}
                  icon={valueIcons[i] || "quality"}
                />
              ))}
            </div>
          </section>

          <section className="bg-slate-900 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="font-cairo font-bold text-2xl md:text-3xl mb-6">
              رواد الامانة تصنع الفرق
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {ABOUT_CONTENT.difference}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
