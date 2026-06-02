import { Helmet } from "react-helmet-async";
import { COMPANY_INFO } from "../data/company";
import { FAQ_ITEMS } from "../data/faq";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

export function SEO({ title, description, keywords, image, url, noIndex }: SEOProps) {
  const siteTitle = title
    ? `${title} | ${COMPANY_INFO.name}`
    : COMPANY_INFO.name;
  const siteDescription = description || COMPANY_INFO.description;
  const siteKeywords =
    keywords ||
    "vistoria cautelar, vistoria veicular, laudo cautelar, goiania, pericia automotiva, compra de carros, carros usados, historico veicular";
  const siteImage = image || `${COMPANY_INFO.website}/documento.webp`;
  const siteUrl = url || COMPANY_INFO.website;

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    image: siteImage,
    description: COMPANY_INFO.description,
    "@id": siteUrl,
    url: siteUrl,
    telephone: COMPANY_INFO.contact.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.state,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [COMPANY_INFO.social.instagram],
    areaServed: COMPANY_INFO.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vistoria Cautelar Veicular",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_INFO.name,
    },
    areaServed: COMPANY_INFO.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicos de vistoria",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vistoria Cautelar Completa",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vistoria Pre-Compra",
          },
        },
      ],
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />

      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content={COMPANY_INFO.name} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={siteUrl} />

      <meta name="geo.region" content="BR-GO" />
      <meta name="geo.placename" content={COMPANY_INFO.address.city} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={COMPANY_INFO.name} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />

      <meta name="theme-color" content="#080B10" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <script type="application/ld+json">
        {JSON.stringify([localBusinessData, serviceData, faqData])}
      </script>
    </Helmet>
  );
}
