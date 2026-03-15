import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyContact from "@/components/layout/StickyContact";

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

export const metadata: Metadata = {
  title: "رواد الامانة – لأعمال الشتر",
  description:
    "رواد الامانة لتركيب الشتر والزجاج – نوافذ شتر، تند ومظلات، غطاء حمام السباحة، عربات فودتراك. الرياض.",
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
      <body className="antialiased font-arabic min-h-screen bg-[#fafaf9] text-[#0f172a]">
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyContact />
      </body>
    </html>
  );
}
