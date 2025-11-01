import { getAllChapters, getVerseContent, verseExists } from './data';

/**
 * Video integration configuration for multilingual support
 */

export interface VideoLanguage {
  code: string;
  name: string;
  flag: string;
}

export interface VerseVideo {
  chapter: number;
  verse: number;
  videos: {
    [languageCode: string]: {
      url: string;
      title: string;
      duration?: number;
      isShort?: boolean;
    };
  };
}

export const SUPPORTED_LANGUAGES: VideoLanguage[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', flag: '🇮🇳' },
];

/**
 * Social media configuration
 */
export const SOCIAL_MEDIA_LINKS = {
  instagram: 'https://www.instagram.com/gita_gyanaam/',
  youtube: 'https://www.youtube.com/@Gita_Gyanaam',
  facebook: 'https://www.facebook.com/profile.php?id=61577900636828',
};

/**
 * YouTube API utilities
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    ...(autoplay && { autoplay: '1' })
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Generate video URL for a specific verse
 */
export function generateVerseVideoUrl(chapter: number, verse: number, language: string = 'en'): string {
  // This would be your actual video URL generation logic
  return `https://youtube.com/watch?v=bhagavad-gita-${chapter}-${verse}-${language}`;
}

/**
 * Search and filtering utilities
 */
export interface SearchResult {
  type: 'chapter' | 'verse';
  chapter: number;
  verse?: number;
  title: string;
  excerpt: string;
  url: string;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();
  
  // Search in chapter titles and descriptions
  const chapters = getAllChapters();
  chapters.forEach(chapter => {
    if (
      chapter.title.toLowerCase().includes(searchTerm) ||
      chapter.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        type: 'chapter',
        chapter: chapter.number,
        title: `Chapter ${chapter.number}: ${chapter.title}`,
        excerpt: chapter.description,
        url: `/chapters/${chapter.number}`
      });
    }
  });
  
  // Search in verse content (limited for performance)
  for (const chapter of chapters) {
    for (let verse = 1; verse <= Math.min(chapter.verseCount, 10); verse++) {
      const content = await getVerseContent(chapter.number, verse);
      if (content) {
        const searchableText = [
          content.sanskrit,
          content.romanized,
          content.english,
          content.wordByWord
        ].join(' ').toLowerCase();
        
        if (searchableText.includes(searchTerm)) {
          results.push({
            type: 'verse',
            chapter: chapter.number,
            verse,
            title: `Chapter ${chapter.number}, Verse ${verse}`,
            excerpt: content.english.substring(0, 200) + '...',
            url: `/chapters/${chapter.number}/verse/${verse}`
          });
        }
      }
    }
  }
  
  return results.slice(0, 20); // Limit results
}

/**
 * Progress tracking utilities
 */
export interface ReadingProgress {
  totalVersesRead: number;
  chaptersCompleted: number;
  lastReadChapter: number;
  lastReadVerse: number;
  readVerses: Set<string>; // Format: "chapter-verse"
}

export function getProgressKey(chapter: number, verse: number): string {
  return `${chapter}-${verse}`;
}

export function calculateProgress(readVerses: Set<string>): ReadingProgress {
  const chapters = getAllChapters();
  let chaptersCompleted = 0;
  let lastReadChapter = 1;
  let lastReadVerse = 1;
  
  chapters.forEach(chapter => {
    let chapterComplete = true;
    for (let verse = 1; verse <= chapter.verseCount; verse++) {
      const key = getProgressKey(chapter.number, verse);
      if (readVerses.has(key)) {
        lastReadChapter = chapter.number;
        lastReadVerse = verse;
      } else {
        chapterComplete = false;
      }
    }
    if (chapterComplete) chaptersCompleted++;
  });
  
  return {
    totalVersesRead: readVerses.size,
    chaptersCompleted,
    lastReadChapter,
    lastReadVerse,
    readVerses
  };
}

/**
 * Content validation and error handling
 */
export class ContentError extends Error {
  constructor(
    message: string,
    public chapter?: number,
    public verse?: number
  ) {
    super(message);
    this.name = 'ContentError';
  }
}

export async function validateContent(chapter: number, verse: number): Promise<boolean> {
  try {
    if (!verseExists(chapter, verse)) {
      throw new ContentError(`Invalid verse reference: ${chapter}.${verse}`, chapter, verse);
    }
    
    const content = await getVerseContent(chapter, verse);
    if (!content) {
      throw new ContentError(`Content not found for verse: ${chapter}.${verse}`, chapter, verse);
    }
    
    // Validate content completeness
    if (!content.sanskrit || !content.english || !content.romanized || !content.wordByWord) {
      throw new ContentError(`Incomplete content for verse: ${chapter}.${verse}`, chapter, verse);
    }
    
    return true;
  } catch (error) {
    console.error('Content validation failed:', error);
    return false;
  }
}
