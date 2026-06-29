import { BRAND, SERVICES, FAQS } from "./constants";

/**
 * Generates Organization JSON-LD structured data.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    description: BRAND.description,
    url: "https://astdigitally.com",
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/astdigitally",
      "https://linkedin.com/company/astdigitally",
      "https://github.com/astdigitally",
    ],
  };
}

/**
 * Generates Service JSON-LD structured data.
 */
export function getServiceSchema() {
  return SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
    },
  }));
}

/**
 * Generates FAQ JSON-LD structured data.
 */
export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Breadcrumb JSON-LD structured data.
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
