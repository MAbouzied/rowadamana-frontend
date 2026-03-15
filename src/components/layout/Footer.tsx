import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { NAV_LINKS, SERVICES, CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <Logo dark />
            <p className="mt-6 text-slate-400 leading-relaxed">
              رواد الامانة لأعمال الشتر – حلول احترافية وجودة عالية
              لجميع احتياجاتك
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-slate-400">
                <span className="font-semibold text-slate-300">العنوان:</span>{" "}
                {CONTACT.address}
              </p>
              <a
                href={`tel:${CONTACT.phone}`}
                className="block text-slate-400 hover:text-amber-400 transition-colors"
              >
                <span className="whitespace-nowrap">{CONTACT.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-slate-400 hover:text-amber-400 transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-cairo font-bold text-lg mb-6 text-white">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  صفحة التواصل
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cairo font-bold text-lg mb-6 text-white">
              خدماتنا
            </h3>
            <ul className="space-y-3">
              {Object.values(SERVICES).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-6">
          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} رواد الامانة. جميع الحقوق محفوظة.{" "}
            <a
              href="https://dev-internal.on-dm.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              من تصميم ON DM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
