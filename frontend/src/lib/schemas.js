// JSON-LD Schema generators for Leapifyes

const SITE_URL = 'https://leapifyes.com';

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Leapifyes",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": `${SITE_URL}/og-image.png`,
  "description": "Transformación digital y agentes de IA para empresas en Barcelona y Cataluña",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelona",
    "addressRegion": "Cataluña",
    "addressCountry": "ES"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Barcelona"
    },
    {
      "@type": "State",
      "name": "Cataluña"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hola@leapifyes.com",
    "availableLanguage": ["Spanish", "Catalan", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/leapifyes",
    "https://twitter.com/leapifyes"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "url": SITE_URL,
  "name": "Leapifyes",
  "description": "Transformación digital y agentes de IA para empresas",
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/recursos?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  "name": "Leapifyes",
  "image": `${SITE_URL}/logo.png`,
  "url": SITE_URL,
  "telephone": "+34 93 XXX XX XX",
  "email": "hola@leapifyes.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Barcelona",
    "addressLocality": "Barcelona",
    "postalCode": "08001",
    "addressRegion": "Cataluña",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3851,
    "longitude": 2.1734
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "€€€"
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/soluciones/transformacion-digital#service`,
    "name": "Transformación Digital",
    "description": "Digitalizamos tus procesos con un enfoque humano. Automatización inteligente, flujos optimizados y sistemas que trabajan para ti.",
    "provider": {
      "@id": `${SITE_URL}/#organization`
    },
    "areaServed": {
      "@type": "State",
      "name": "Cataluña"
    },
    "serviceType": "Consultoría de Transformación Digital"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/soluciones/agentes-ia#service`,
    "name": "Agentes de IA",
    "description": "Agentes conversacionales que atienden, cualifican y convierten. Desde WhatsApp hasta tu CRM, sin intervención manual.",
    "provider": {
      "@id": `${SITE_URL}/#organization`
    },
    "areaServed": {
      "@type": "State",
      "name": "Cataluña"
    },
    "serviceType": "Desarrollo de Chatbots e IA"
  }
];

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${SITE_URL}${item.path}`
  }))
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateBlogPostSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "datePublished": post.date,
  "dateModified": post.date,
  "author": {
    "@type": "Organization",
    "name": "Leapifyes"
  },
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/recursos/${post.slug}`
  }
});

// Helper to render schema as script tag content
export const schemaToString = (schema) => JSON.stringify(schema);
