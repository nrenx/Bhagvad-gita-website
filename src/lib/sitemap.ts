import { getAllChapters } from '@/lib/data';

export interface SiteRoute {
  url: string;
  title: string;
  description: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Generate all routes for the website
 */
export function generateAllRoutes(): SiteRoute[] {
  const routes: SiteRoute[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagavad-gita.org';

  // Homepage
  routes.push({
    url: `${baseUrl}`,
    title: 'Bhagavad Gita - Sacred Text & Wisdom',
    description: 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
    priority: 1.0,
    changefreq: 'weekly'
  });

  // Chapters overview
  routes.push({
    url: `${baseUrl}/chapters`,
    title: 'All 18 Chapters - Bhagavad Gita',
    description: 'Explore all 18 chapters of the Bhagavad Gita with detailed verse-by-verse breakdown',
    priority: 0.9,
    changefreq: 'monthly'
  });

  // Individual chapters
  const chapters = getAllChapters();
  chapters.forEach(chapter => {
    routes.push({
      url: `${baseUrl}/chapters/${chapter.number}`,
      title: `Chapter ${chapter.number}: ${chapter.title} - Bhagavad Gita`,
      description: `${chapter.description} - Complete chapter with ${chapter.verseCount} verses`,
      priority: 0.8,
      changefreq: 'monthly'
    });

    // Individual verses
    for (let verse = 1; verse <= chapter.verseCount; verse++) {
      routes.push({
        url: `${baseUrl}/chapters/${chapter.number}/verse/${verse}`,
        title: `Chapter ${chapter.number}, Verse ${verse} - ${chapter.title}`,
        description: `Sanskrit shloka, romanized pronunciation, and English translation of verse ${chapter.number}.${verse}`,
        priority: 0.7,
        changefreq: 'yearly'
      });
    }
  });

  // Static pages
  routes.push({
    url: `${baseUrl}/about`,
    title: 'About - Bhagavad Gita Wisdom',
    description: 'Learn about our mission to share the timeless wisdom of the Bhagavad Gita',
    priority: 0.6,
    changefreq: 'monthly'
  });

  routes.push({
    url: `${baseUrl}/donate`,
    title: 'Support Our Mission - Donate',
    description: 'Support the preservation and sharing of Bhagavad Gita wisdom',
    priority: 0.5,
    changefreq: 'monthly'
  });

  routes.push({
    url: `${baseUrl}/contact`,
    title: 'Contact Us - Bhagavad Gita',
    description: 'Get in touch with our team for questions about the Bhagavad Gita',
    priority: 0.5,
    changefreq: 'monthly'
  });

  return routes;
}

/**
 * Generate XML sitemap
 */
export function generateSitemap(): string {
  const routes = generateAllRoutes();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

/**
 * Get route metadata for SEO
 */
export function getRouteMetadata(pathname: string): Partial<SiteRoute> | null {
  const routes = generateAllRoutes();
  const route = routes.find(r => r.url.endsWith(pathname));
  
  if (route) {
    return {
      title: route.title,
      description: route.description
    };
  }
  
  return null;
}
