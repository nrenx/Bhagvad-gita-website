import { Metadata } from 'next';
import { getChapterInfo, verseExists } from '@/lib/data';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagavad-gita.org';
const SITE_NAME = 'Bhagavad Gita Wisdom';
const DEFAULT_IMAGE = '/favicon.jpg';

/**
 * Generate base metadata for all pages
 */
export function generateBaseMetadata(props: SEOProps = {}): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_IMAGE,
    url = '/',
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section
  } = props;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  const baseKeywords = [
    'Bhagavad Gita',
    'Sanskrit',
    'Hindu scripture',
    'Krishna',
    'Arjuna',
    'spiritual wisdom',
    'yoga',
    'dharma',
    'moksha',
    'Hinduism',
    'sacred text',
    'philosophy',
    'meditation',
    'spiritual growth'
  ];

  const allKeywords = [...new Set([...baseKeywords, ...keywords])];

  return {
    title: fullTitle,
    description: description || 'Complete Bhagavad Gita with Sanskrit verses, English translations, word-by-word meanings, and spiritual commentary. Explore all 18 chapters and 700+ verses of this sacred Hindu scripture.',
    keywords: allKeywords,
    authors: [{ name: author || SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: description || 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
      siteName: SITE_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || 'Complete Bhagavad Gita with Sanskrit verses, English translations, and spiritual commentary',
      images: [fullImageUrl],
      creator: '@GitaGyanaam',
      site: '@GitaGyanaam',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE,
      yandex: process.env.YANDEX_VERIFICATION_CODE,
      yahoo: process.env.YAHOO_VERIFICATION_CODE,
    },
  };
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Bhagavad Gita - Sacred Text & Wisdom',
    description: 'Discover the complete Bhagavad Gita with Sanskrit shlokas, English translations, word-by-word meanings, and video commentary. Explore all 18 chapters and 700+ verses of this timeless spiritual guide that teaches the path to self-realization and divine consciousness.',
    keywords: [
      'complete Bhagavad Gita',
      'Sanskrit shlokas',
      'English translation',
      'spiritual guide',
      'self-realization',
      'divine consciousness',
      'Lord Krishna teachings',
      'Kurukshetra war',
      'dharma yuddha'
    ],
    url: '/',
    type: 'website'
  });
}

/**
 * Generate metadata for chapters overview page
 */
export function generateChaptersMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'All 18 Chapters - Bhagavad Gita',
    description: 'Explore all 18 chapters of the Bhagavad Gita with detailed summaries, verse counts, and spiritual themes. From Arjuna\'s dilemma to the ultimate teaching of surrender, discover the complete journey of spiritual awakening.',
    keywords: [
      '18 chapters',
      'chapter summary',
      'spiritual themes',
      'Arjuna dilemma',
      'Sankhya Yoga',
      'Karma Yoga',
      'Bhakti Yoga',
      'Jnana Yoga',
      'spiritual awakening'
    ],
    url: '/chapters',
    type: 'website'
  });
}

/**
 * Generate metadata for individual chapter page
 */
export function generateChapterMetadata(chapterNumber: number): Metadata {
  const chapterInfo = getChapterInfo(chapterNumber);
  
  if (!chapterInfo) {
    return generateBaseMetadata({
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.',
    });
  }

  return generateBaseMetadata({
    title: `Chapter ${chapterNumber}: ${chapterInfo.title}`,
    description: `${chapterInfo.description} Explore all ${chapterInfo.verseCount} verses of Chapter ${chapterNumber} with Sanskrit text, English translation, and detailed commentary.`,
    keywords: [
      `chapter ${chapterNumber}`,
      chapterInfo.title,
      `${chapterInfo.verseCount} verses`,
      'Sanskrit verses',
      'spiritual teaching',
      'Krishna wisdom',
      'Gita chapter'
    ],
    url: `/chapters/${chapterNumber}`,
    type: 'article',
    section: 'Bhagavad Gita Chapters',
    author: 'Sage Vyasa'
  });
}

/**
 * Generate metadata for individual verse page
 */
export function generateVerseMetadata(
  chapterNumber: number, 
  verseNumber: number, 
  verseContent?: {
    sanskrit?: string;
    english?: string;
    romanized?: string;
  }
): Metadata {
  if (!verseExists(chapterNumber, verseNumber)) {
    return generateBaseMetadata({
      title: 'Verse Not Found',
      description: 'The requested verse could not be found.',
    });
  }

  const chapterInfo = getChapterInfo(chapterNumber);
  const chapterTitle = chapterInfo?.title || '';
  
  const verseDescription = verseContent?.english 
    ? `"${verseContent.english.substring(0, 150)}${verseContent.english.length > 150 ? '...' : ''}"`
    : `Explore Chapter ${chapterNumber}, Verse ${verseNumber} with Sanskrit shloka, romanized pronunciation, English translation, and word-by-word meaning.`;

  return generateBaseMetadata({
    title: `Chapter ${chapterNumber}, Verse ${verseNumber} - ${chapterTitle}`,
    description: `${verseDescription} Complete study of Bhagavad Gita verse ${chapterNumber}.${verseNumber} with detailed commentary and spiritual insights.`,
    keywords: [
      `chapter ${chapterNumber} verse ${verseNumber}`,
      `verse ${chapterNumber}.${verseNumber}`,
      'Sanskrit shloka',
      'romanized Sanskrit',
      'word by word meaning',
      'spiritual insight',
      'Krishna teaching',
      chapterTitle.toLowerCase()
    ],
    url: `/chapters/${chapterNumber}/verse/${verseNumber}`,
    type: 'article',
    section: `Chapter ${chapterNumber}: ${chapterTitle}`,
    author: 'Sage Vyasa'
  });
}

/**
 * Generate metadata for about page
 */
export function generateAboutMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'About - Bhagavad Gita Wisdom',
    description: 'Learn about our mission to preserve and share the timeless wisdom of the Bhagavad Gita. Discover how we make this sacred text accessible to seekers worldwide through modern technology and traditional understanding.',
    keywords: [
      'about us',
      'mission',
      'spiritual education',
      'preserve wisdom',
      'traditional understanding',
      'modern accessibility',
      'seekers worldwide'
    ],
    url: '/about',
    type: 'website'
  });
}

/**
 * Generate metadata for donation page
 */
export function generateDonateMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Support Our Mission - Donate',
    description: 'Support the preservation and sharing of Bhagavad Gita wisdom. Your donation helps us maintain this free resource and create more spiritual content for seekers worldwide.',
    keywords: [
      'donate',
      'support mission',
      'preserve wisdom',
      'spiritual content',
      'free resource',
      'charity',
      'spiritual education'
    ],
    url: '/donate',
    type: 'website'
  });
}

/**
 * Generate metadata for contact page
 */
export function generateContactMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Contact Us - Bhagavad Gita',
    description: 'Get in touch with our team for questions about the Bhagavad Gita, feedback on our website, or collaboration opportunities. We love hearing from fellow spiritual seekers.',
    keywords: [
      'contact us',
      'get in touch',
      'questions',
      'feedback',
      'collaboration',
      'spiritual seekers',
      'support'
    ],
    url: '/contact',
    type: 'website'
  });
}

/**
 * Generate JSON-LD structured data for verses
 */
export function generateVerseStructuredData(
  chapterNumber: number,
  verseNumber: number,
  content: {
    sanskrit: string;
    english: string;
    romanized: string;
    wordByWord: string;
  }
) {
  const chapterInfo = getChapterInfo(chapterNumber);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Bhagavad Gita Chapter ${chapterNumber}, Verse ${verseNumber}`,
    description: content.english,
    articleSection: `Chapter ${chapterNumber}: ${chapterInfo?.title}`,
    author: {
      '@type': 'Person',
      name: 'Sage Vyasa'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.jpg`
      }
    },
    mainEntity: {
      '@type': 'CreativeWork',
      name: `Bhagavad Gita ${chapterNumber}.${verseNumber}`,
      text: content.sanskrit,
      inLanguage: 'sa',
      translationOfWork: {
        '@type': 'CreativeWork',
        name: 'Bhagavad Gita',
        author: {
          '@type': 'Person',
          name: 'Sage Vyasa'
        }
      }
    },
    url: `${BASE_URL}/chapters/${chapterNumber}/verse/${verseNumber}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    isPartOf: {
      '@type': 'Book',
      name: 'Bhagavad Gita',
      author: {
        '@type': 'Person',
        name: 'Sage Vyasa'
      }
    }
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}
