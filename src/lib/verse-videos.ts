import teluguVideos from '@/data/verse-videos/telugu_videos.json';
import { SUPPORTED_LANGUAGES, type VideoLanguage } from './content-utils';

type RawVideoEntry = {
  title: string;
  videoId: string;
  embedLink: string;
  playlistId?: string;
};

export interface VerseVideoSource {
  language: string;
  embedUrl: string;
  videoId: string;
  title: string;
  playlistId?: string;
}

export type VerseVideoSourceMap = Record<string, VerseVideoSource>;

const DEFAULT_VIDEO_LANGUAGE = 'te';

const languageMetaMap = new Map<string, VideoLanguage>(
  SUPPORTED_LANGUAGES.map((language) => [language.code, language])
);

function getLanguageMeta(languageCode: string): VideoLanguage {
  return (
    languageMetaMap.get(languageCode) || {
      code: languageCode,
      name: languageCode.toUpperCase(),
      flag: 'Video',
    }
  );
}

function buildVideoIndex(
  languageCode: string,
  entries: RawVideoEntry[]
): VerseVideoSourceMap {
  const index: VerseVideoSourceMap = {};

  for (const entry of entries) {
    // Extract chapter and verse from title (e.g., భగవద్గీత 1.2:...)
    const match = entry.title.match(/(\d+)\.(\d+)/);
    if (!match) continue;
    const chapter = Number.parseInt(match[1], 10);
    const verse = Number.parseInt(match[2], 10);
    if (!Number.isFinite(chapter) || !Number.isFinite(verse)) continue;

    const key = `${chapter}-${verse}`;
    const language = getLanguageMeta(languageCode);

    index[key] = {
      language: language.code,
      embedUrl: entry.embedLink,
      videoId: entry.videoId,
      title: entry.title,
      playlistId: entry.playlistId,
    };
  }

  return index;
}

const VIDEO_LIBRARY: Record<string, VerseVideoSourceMap> = {
  te: buildVideoIndex('te', teluguVideos satisfies RawVideoEntry[]),
};

export function getVideoLanguages(): VideoLanguage[] {
  return SUPPORTED_LANGUAGES.filter((language) => VIDEO_LIBRARY[language.code]);
}

export function getLanguageLabel(languageCode: string): string {
  return getLanguageMeta(languageCode).name;
}

export function getVerseVideoSources(
  chapter: number,
  verse: number
): VerseVideoSourceMap {
  const key = `${chapter}-${verse}`;
  const sources: VerseVideoSourceMap = {};

  for (const [languageCode, videoIndex] of Object.entries(VIDEO_LIBRARY)) {
    const source = videoIndex[key];
    if (source) {
      sources[languageCode] = source;
    }
  }

  return sources;
}

export function resolveDefaultVideoLanguage(
  sources: VerseVideoSourceMap,
  fallback: string = DEFAULT_VIDEO_LANGUAGE
): string | null {
  const availableLanguages = Object.keys(sources);
  if (availableLanguages.length === 0) return null;
  if (sources[fallback]) return fallback;
  return availableLanguages[0] ?? null;
}

export function getVideoLanguageOptionsForVerse(
  sources: VerseVideoSourceMap
): VideoLanguage[] {
  return Object.keys(sources).map((languageCode) => getLanguageMeta(languageCode));
}

export { DEFAULT_VIDEO_LANGUAGE };
