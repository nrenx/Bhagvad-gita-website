'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Component to inject JSON-LD structured data into pages
 * Improves SEO and rich snippet display in search results
 */
export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

/**
 * Generate WebSite structured data
 */
export function generateWebsiteSchema(url: string = 'https://bhagavad-gita.org') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bhagavad Gita Wisdom',
    url: url,
    description: 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/chapters?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article structured data for verse pages
 */
export function generateVerseArticleSchema({
  chapter,
  verse,
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  chapter: number;
  verse: number;
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Bhagavad Gita Chapter ${chapter}, Verse ${verse} - ${title}`,
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'Bhagavad Gita Wisdom',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bhagavad Gita Wisdom',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bhagavad-gita.org/favicon.jpg',
      },
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: ['en', 'sa'],
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Book structured data for chapters
 */
export function generateBookSchema({
  chapter,
  title,
  description,
  url,
}: {
  chapter: number;
  title: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `Bhagavad Gita - Chapter ${chapter}: ${title}`,
    description: description,
    url: url,
    inLanguage: ['en', 'sa'],
    bookFormat: 'EBook',
    author: {
      '@type': 'Person',
      name: 'Lord Krishna',
    },
    about: {
      '@type': 'Thing',
      name: 'Hindu Philosophy',
    },
  };
}
