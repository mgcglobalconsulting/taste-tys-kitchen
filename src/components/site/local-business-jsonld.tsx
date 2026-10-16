import { site } from "@/content/site";

/** schema.org LocalBusiness data for search engines. Facts from docs/CONTENT.md. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: `${site.url}/brand/totk-logo.jpg`,
    image: `${site.url}/brand/totk-logo.jpg`,
    telephone: "+1-443-226-3279",
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    sameAs: [site.social.instagram.url, site.social.facebook.url],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: every value is a static string from site.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
