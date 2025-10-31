// Client-safe data access for Bhagavad Gita content
export interface VerseContent {
  sanskrit: string;
  romanized: string;
  english: string;
  wordByWord: string;
}

export interface ChapterInfo {
  number: number;
  title: string;
  verseCount: number;
  description: string;
  verses: number;
  meaning: string;
  summary: string;
}

const CHAPTERS_DATA = [
  { number: 1, title: "Arjuna Vishada Yoga", verseCount: 47, description: "The Yoga of Arjuna's Dejection - The crisis of conscience that begins the spiritual dialogue" },
  { number: 2, title: "Sankhya Yoga", verseCount: 72, description: "The Yoga of Knowledge - The philosophy of the eternal soul and the path of knowledge" },
  { number: 3, title: "Karma Yoga", verseCount: 43, description: "The Yoga of Action - The path of selfless action and duty" },
  { number: 4, title: "Jnana Karma Sanyasa Yoga", verseCount: 42, description: "The Yoga of Knowledge and Renunciation of Action" },
  { number: 5, title: "Karma Sanyasa Yoga", verseCount: 29, description: "The Yoga of Renunciation of Action" },
  { number: 6, title: "Atma Samyama Yoga", verseCount: 47, description: "The Yoga of Self-Control" },
  { number: 7, title: "Paramahamsa Vijnana Yoga", verseCount: 30, description: "The Yoga of Knowledge and Realization" },
  { number: 8, title: "Aksara Brahma Yoga", verseCount: 28, description: "The Yoga of the Imperishable Brahman" },
  { number: 9, title: "Raja Vidya Yoga", verseCount: 34, description: "The Yoga of Royal Knowledge and Royal Mystery" },
  { number: 10, title: "Vibhuti Vistara Yoga", verseCount: 42, description: "The Yoga of Divine Glories" },
  { number: 11, title: "Visvarupa Darshana Yoga", verseCount: 55, description: "The Yoga of the Vision of the Universal Form" },
  { number: 12, title: "Bhakti Yoga", verseCount: 20, description: "The Yoga of Devotion" },
  { number: 13, title: "Ksetra Ksetrajna Vibhaga Yoga", verseCount: 35, description: "The Yoga of Distinction between the Field and the Knower of the Field" },
  { number: 14, title: "Gunatraya Vibhaga Yoga", verseCount: 27, description: "The Yoga of the Division of the Three Gunas" },
  { number: 15, title: "Purushottama Prapti Yoga", verseCount: 20, description: "The Yoga of the Supreme Divine Personality" },
  { number: 16, title: "Daivasura Sampad Vibhaga Yoga", verseCount: 24, description: "The Yoga of the Division between the Divine and Demoniac Natures" },
  { number: 17, title: "Shraddhatraya Vibhaga Yoga", verseCount: 28, description: "The Yoga of the Division of the Three Kinds of Faith" },
  { number: 18, title: "Moksha Sanyasa Yoga", verseCount: 78, description: "The Yoga of Liberation through Renunciation" },
];

export const CHAPTERS_INFO: ChapterInfo[] = CHAPTERS_DATA.map(chapter => ({
  ...chapter,
  verses: chapter.verseCount,
  meaning: chapter.description,
  summary: chapter.description
}));

export function getAllChapters(): ChapterInfo[] {
  return CHAPTERS_INFO;
}

export function getTotalVerseCount(): number {
  return CHAPTERS_INFO.reduce((total, chapter) => total + chapter.verseCount, 0);
}

export function getChapterInfo(chapter: number): ChapterInfo | null {
  return CHAPTERS_INFO.find(c => c.number === chapter) || null;
}

export function getChapterVerses(chapter: number): number[] {
  const chapterInfo = getChapterInfo(chapter);
  if (!chapterInfo) return [];
  return Array.from({ length: chapterInfo.verseCount }, (_, i) => i + 1);
}

export function verseExists(chapter: number, verse: number): boolean {
  const chapterInfo = getChapterInfo(chapter);
  return chapterInfo ? verse >= 1 && verse <= chapterInfo.verseCount : false;
}

export async function getVerseContent(chapter: number, verse: number): Promise<VerseContent | null> {
  if (!verseExists(chapter, verse)) return null;
  
  return {
    sanskrit: `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। (${chapter}.${verse})`,
    romanized: `dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ (${chapter}.${verse})`,
    english: `On the field of dharma, on the field of Kurukshetra, assembled and desiring to fight... (Chapter ${chapter}, Verse ${verse})`,
    wordByWord: `dharma-kṣetre = on the field of dharma; kuru-kṣetre = on the field of Kurukshetra`
  };
}

export function getVerseData(chapter: number, verse: number): VerseContent | null {
  if (!verseExists(chapter, verse)) return null;
  
  return {
    sanskrit: `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। (${chapter}.${verse})`,
    romanized: `dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ (${chapter}.${verse})`,
    english: `On the field of dharma, on the field of Kurukshetra, assembled and desiring to fight... (Chapter ${chapter}, Verse ${verse})`,
    wordByWord: `dharma-kṣetre = on the field of dharma; kuru-kṣetre = on the field of Kurukshetra`
  };
}

export function getAllVerseKeys(): Array<{ chapter: number; verse: number }> {
  const keys: Array<{ chapter: number; verse: number }> = [];
  for (const chapterInfo of CHAPTERS_INFO) {
    for (let verse = 1; verse <= chapterInfo.verseCount; verse++) {
      keys.push({ chapter: chapterInfo.number, verse });
    }
  }
  return keys;
}

export function getNextVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  const chapterInfo = getChapterInfo(chapter);
  if (!chapterInfo) return null;

  if (verse < chapterInfo.verseCount) {
    return { chapter, verse: verse + 1 };
  }

  if (chapter < 18) {
    return { chapter: chapter + 1, verse: 1 };
  }

  return null;
}

export function getPreviousVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  if (verse > 1) {
    return { chapter, verse: verse - 1 };
  }

  if (chapter > 1) {
    const prevChapterInfo = getChapterInfo(chapter - 1);
    if (prevChapterInfo) {
      return { chapter: chapter - 1, verse: prevChapterInfo.verseCount };
    }
  }

  return null;
}

export function getAdjacentVerses(chapter: number, verse: number): { 
  previousVerse: { chapter: number; verse: number } | null;
  nextVerse: { chapter: number; verse: number } | null;
} {
  return {
    previousVerse: getPreviousVerse(chapter, verse),
    nextVerse: getNextVerse(chapter, verse)
  };
}
