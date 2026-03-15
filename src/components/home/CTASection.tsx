import Link from "next/link";
import { ABOUT_CONTENT } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-white mb-6">
          رواد الامانة تصنع الفرق
        </h2>
        <p className="text-slate-300 text-lg mb-10 leading-relaxed">
          {ABOUT_CONTENT.difference}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
        >
          تواصل معنا
        </Link>
      </div>
    </section>
  );
}
