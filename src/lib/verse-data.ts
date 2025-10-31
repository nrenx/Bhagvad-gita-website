// Server-side data access for reading verse files
import fs from 'fs';
import path from 'path';
import { VerseContent } from './data';

export async function getVerseContentFromFiles(chapter: number, verse: number): Promise<VerseContent | null> {
  try {
    const basePath = path.join(process.cwd(), 'src', 'data', 'quotes-for-each-verse', `chapter-${chapter}`, `verse-${verse}`);
    
    const sanskrit = fs.readFileSync(path.join(basePath, 'sanskrit-shloka.txt'), 'utf-8').trim();
    const romanized = fs.readFileSync(path.join(basePath, 'romanized-transliteration.txt'), 'utf-8').trim();
    const english = fs.readFileSync(path.join(basePath, 'english-translation.txt'), 'utf-8').trim();
    const wordByWord = fs.readFileSync(path.join(basePath, 'word-by-word-translation.txt'), 'utf-8').trim();
    
    return {
      sanskrit,
      romanized,
      english,
      wordByWord
    };
  } catch (error) {
    console.error(`Error reading verse ${chapter}.${verse}:`, error);
    return null;
  }
}

export function getVerseDataFromFiles(chapter: number, verse: number): VerseContent | null {
  try {
    const basePath = path.join(process.cwd(), 'src', 'data', 'quotes-for-each-verse', `chapter-${chapter}`, `verse-${verse}`);
    
    const sanskrit = fs.readFileSync(path.join(basePath, 'sanskrit-shloka.txt'), 'utf-8').trim();
    const romanized = fs.readFileSync(path.join(basePath, 'romanized-transliteration.txt'), 'utf-8').trim();
    const english = fs.readFileSync(path.join(basePath, 'english-translation.txt'), 'utf-8').trim();
    const wordByWord = fs.readFileSync(path.join(basePath, 'word-by-word-translation.txt'), 'utf-8').trim();
    
    return {
      sanskrit,
      romanized,
      english,
      wordByWord
    };
  } catch (error) {
    console.error(`Error reading verse ${chapter}.${verse}:`, error);
    return null;
  }
}
