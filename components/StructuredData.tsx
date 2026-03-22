import { getSiteUrl, siteConfig } from "@/lib/site-config";

export default function StructuredData() {
  const url = getSiteUrl();
  const { contact, geo, coachName, coachJobTitle, name, description, instagramUrl } = siteConfig;

  const address =
    contact.streetAddress && contact.postalCode && contact.addressLocality
      ? {
          "@type": "PostalAddress" as const,
          streetAddress: contact.streetAddress,
          postalCode: contact.postalCode,
          addressLocality: contact.addressLocality,
          addressRegion: geo.region,
          addressCountry: geo.country,
        }
      : {
          "@type": "PostalAddress" as const,
          addressRegion: `${geo.department}, ${geo.region}`,
          addressCountry: geo.country,
        };

  const localBusiness: Record<string, unknown> = {
    "@type": "SportsActivityLocation",
    "@id": `${url}/#localbusiness`,
    name,
    description,
    url,
    image: `${url}/images/rgfightclub_hero.png`,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: geo.department },
      { "@type": "AdministrativeArea", name: geo.region },
      ...geo.cities.map((city) => ({ "@type": "City", name: city })),
    ],
    sameAs: [instagramUrl],
  };

  if (contact.telephone) localBusiness.telephone = contact.telephone;
  if (contact.email) localBusiness.email = contact.email;

  const person = {
    "@type": "Person",
    "@id": `${url}/#person`,
    name: coachName,
    jobTitle: coachJobTitle,
    worksFor: { "@id": `${url}/#localbusiness` },
    url,
    sameAs: [instagramUrl],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, person],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
