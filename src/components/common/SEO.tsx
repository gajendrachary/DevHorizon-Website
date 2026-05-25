import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  schema?: object;
  noindex?: boolean;
}

const BASE_URL = 'https://devhorizontech.com';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/pkvyJBGC6VYC9rCCpwRzSlSJLDy2/social-images/social-1766729263212-Screenshot 2025-12-26 at 11.37.02 AM.png';

export const SEO = ({
  title,
  description,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  schema,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const fullTitle = title.includes('DevHorizon') ? title : `${title} | DevHorizon Technologies Private Limited`;
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', type, true);
    updateMeta('og:image', image, true);

    // Twitter
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add JSON-LD schema if provided
    if (schema) {
      let scriptElement = document.querySelector('script[data-schema="seo"]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-schema', 'seo');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      const schemaScript = document.querySelector('script[data-schema="seo"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, type, image, schema, noindex]);

  return null;
};

// Pre-defined schemas
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevHorizon Technologies Private Limited',
  url: 'https://devhorizontech.com',
  logo: 'https://storage.googleapis.com/gpt-engineer-file-uploads/pkvyJBGC6VYC9rCCpwRzSlSJLDy2/uploads/1766556238529-cropped_circle_image (11).png',
  description: 'Full-service digital company specializing in web development, mobile apps, and Meta advertising.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
    streetAddress: 'Vidyaranyapura',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8688097373',
    contactType: 'customer service',
    email: 'info@devhorizontech.com',
    availableLanguage: ['English', 'Hindi', 'Kannada'],
  },
  sameAs: [
    'https://linkedin.com/company/devhorizon',
    'https://github.com/devhorizon',
  ],
  foundingDate: '2025-06',
  founder: {
    '@type': 'Person',
    name: 'Gajendrachary',
  },
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://devhorizontech.com/#localbusiness',
  name: 'DevHorizon Technologies Private Limited',
  image: 'https://storage.googleapis.com/gpt-engineer-file-uploads/pkvyJBGC6VYC9rCCpwRzSlSJLDy2/uploads/1766556238529-cropped_circle_image (11).png',
  telephone: '+91-8688097373',
  email: 'info@devhorizontech.com',
  url: 'https://devhorizontech.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vidyaranyapura',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560097',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0827,
    longitude: 77.5877,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '₹₹',
  areaServed: ['Bengaluru', 'India', 'UAE', 'UK', 'USA', 'Canada'],
});

export const getServiceSchema = (services: { name: string; description: string; price: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'Service',
    position: index + 1,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'DevHorizon Technologies Private Limited',
    },
    offers: {
      '@type': 'Offer',
      price: service.price.replace(/[^\d]/g, ''),
      priceCurrency: 'INR',
    },
  })),
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getAggregateRatingSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevHorizon Technologies Private Limited',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '40',
    bestRating: '5',
    worstRating: '1',
  },
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default SEO;
