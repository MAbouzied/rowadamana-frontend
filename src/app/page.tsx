import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { getAbsoluteUrl } from "@/lib/site";

const homeTitle = `${SITE_NAME} – ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description:
    "رواد الامانة لتركيب الشتر والزجاج – نوافذ شتر، تند ومظلات، غطاء حمام السباحة، عربات فودتراك. الرياض.",
  alternates: { canonical: getAbsoluteUrl("/") },
  openGraph: {
    url: getAbsoluteUrl("/"),
    title: homeTitle,
  },
};
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <ReviewsSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
