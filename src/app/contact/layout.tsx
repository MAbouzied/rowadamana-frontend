import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع ${SITE_NAME} للاستفسار عن الشتر والزجاج والتند والمظلات وغطاء المسبح وعربات الفودتراك. الرياض وجدة.`,
  alternates: { canonical: getAbsoluteUrl("/contact") },
  openGraph: {
    title: `تواصل معنا | ${SITE_NAME}`,
    url: getAbsoluteUrl("/contact"),
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
