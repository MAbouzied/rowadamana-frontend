import { WHY_CHOOSE_US } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            أفضل خدمة بطرق احترافية
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {WHY_CHOOSE_US.map((item, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-500/20 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <span className="font-cairo font-bold text-2xl text-amber-600">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-cairo font-bold text-xl text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
