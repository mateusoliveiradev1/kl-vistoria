import { Helmet } from "react-helmet-async";
import { COMPANY_INFO } from "../data/company";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
  const siteTitle = title
    ? `${title} | ${COMPANY_INFO.name}`
    : COMPANY_INFO.name;
  const siteDescription = description || COMPANY_INFO.description;
  const siteKeywords =
    keywords ||
    "vistoria cautelar, vistoria veicular, laudo cautelar, goiânia, perícia automotiva, compra de carros, carros usados, histórico veicular";
  const siteImage =
    image ||
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop"; // Hero image as default
  const siteUrl = url || "https://klvistorias.com.br"; // Replace with actual domain

  // Schema.org Structured Data for Local Business
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": COMPANY_INFO.name,
    "image": siteImage,
    "description": "Líder em Vistoria Cautelar e Perícia Automotiva em Goiânia. Evite golpes e prejuízos na compra de veículos usados com nosso laudo técnico especializado.",
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": COMPANY_INFO.contact.phone,
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "512",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. T-63", // Add specific address if available in COMPANY_INFO
      "addressLocality": "Goiânia",
      "addressRegion": "GO",
      "postalCode": "74823-040",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -16.6534954,
      "longitude": -49.3361483
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      COMPANY_INFO.social.instagram,
      COMPANY_INFO.social.facebook
    ]
  };

  // Schema.org Structured Data for Service
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vistoria Cautelar Veicular",
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_INFO.name
    },
    "areaServed": [
      { "@type": "City", "name": "Goiânia" },
      { "@type": "City", "name": "Aparecida de Goiânia" },
      { "@type": "City", "name": "Anápolis" },
      { "@type": "City", "name": "Senador Canedo" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Vistoria",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vistoria Cautelar Completa"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vistoria Pré-Compra"
          }
        }
      ]
    }
  };

  // Schema.org Structured Data for FAQ
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é a Vistoria Cautelar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É uma análise completa do veículo que verifica a estrutura (chassi, carroceria), originalidade das peças e histórico documental (leilões, sinistros, roubos)."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre Vistoria Cautelar e Vistoria de Transferência?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Vistoria de Transferência é obrigatória pelo DETRAN apenas para mudar a propriedade do veículo. A Cautelar é muito mais profunda, analisando a qualidade e o passado do carro."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo demora o serviço?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uma vistoria cautelar completa leva em média de 40 a 60 minutos."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* 💎 PERFORMANCE & PRE-FETCHING */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />

      {/* 🎯 PRIMARY META TAGS */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content={COMPANY_INFO.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={siteUrl} />

      {/* 📱 OPEN GRAPH / FACEBOOK (ELITE SPECS) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content="KL Vistorias | Segurança Total na Compra do seu Carro 🚗" />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={COMPANY_INFO.name} />

      {/* 🐦 TWITTER (LARGE CARD) */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content="Vistoria Cautelar em Goiânia - KL Vistorias" />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />

      {/* 🛠️ TECHNOLOGY & PWA */}
      <meta name="theme-color" content="#0F172A" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* 🏗️ JSON-LD STRUCTURED DATA (AUTO-REPAIR + SERVICE + FAQ) */}
      <script type="application/ld+json">
        {JSON.stringify([localBusinessData, serviceData, faqData])}
      </script>
    </Helmet>
  );
}
