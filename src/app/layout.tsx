import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyContact from "@/components/layout/StickyContact";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/site";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const defaultTitle = `${SITE_NAME} – ${SITE_TAGLINE}`;
const defaultDescription =
  "رواد الامانة لتركيب الشتر والزجاج – نوافذ شتر، تند ومظلات، غطاء حمام السباحة، عربات فودتراك. الرياض.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${ibmPlexArabic.variable}`}
    >
      <body className="antialiased font-arabic min-h-screen bg-[#fafaf9] text-[#0f172a] w-full overflow-x-hidden">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PDCHN49R"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <GoogleTagManager gtmId="GTM-PDCHN49R" dataLayer={{ page_language: "ar" }} />
        <JsonLd />
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyContact />
      </body>
    </html>
  );
}
