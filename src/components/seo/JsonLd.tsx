import { CONTACT, SITE_NAME } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";

export default function JsonLd() {
  const url = getSiteUrl();
  const phone = CONTACT.phone.replace(/\s/g, "");

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url,
      email: CONTACT.email,
      telephone: phone,
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}/#localbusiness`,
      name: SITE_NAME,
      url,
      telephone: phone,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.address,
        addressCountry: "SA",
      },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url,
      inLanguage: "ar",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
