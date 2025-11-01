import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getChapterInfo, getChapterVerses } from '@/lib/data';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Users,
  Sparkles,
  ChevronRight,
  Home
} from 'lucide-react';

type ChapterParams = {
  chapter: string;
};

interface ChapterPageProps {
  params: Promise<ChapterParams>;
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { chapter } = await params;
  const chapterNumber = Number.parseInt(chapter, 10);
  const chapterInfo = getChapterInfo(chapterNumber);

  if (!chapterInfo) {
    return {
      title: 'Chapter Not Found - Bhagavad Gita',
    };
  }

  return {
    title: `Chapter ${chapterInfo.number}: ${chapterInfo.title} - Bhagavad Gita`,
    description: `${chapterInfo.description} - Complete chapter with ${chapterInfo.verseCount} verses, Sanskrit text, English translations, and commentary.`,
    keywords: [
      `Bhagavad Gita Chapter ${chapterInfo.number}`,
      chapterInfo.title,
      'Sanskrit verses',
      'spiritual wisdom',
      'Krishna teachings',
      'Hindu scripture',
      'yoga philosophy'
    ],
    openGraph: {
      title: `Chapter ${chapterInfo.number}: ${chapterInfo.title}`,
      description: chapterInfo.description,
      url: `/chapters/${chapterInfo.number}`,
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter } = await params;
  const chapterNumber = Number.parseInt(chapter, 10);
  const chapterInfo = getChapterInfo(chapterNumber);

  if (!chapterInfo) {
    notFound();
    return null;
  }

  const verseNumbers = await getChapterVerses(chapterNumber);
  const hasNextChapter = chapterNumber < 18;
  const hasPrevChapter = chapterNumber > 1;

  // Get chapter-specific content and themes
  const getChapterThemes = (chapter: number): string[] => {
    const themes: { [key: number]: string[] } = {
      1: ['Moral Crisis', 'Duty vs Emotion', 'Warrior Ethics', 'Spiritual Confusion'],
      2: ['Eternal Soul', 'Detachment', 'Karma Yoga', 'Equanimity'],
      3: ['Selfless Action', 'Duty (Dharma)', 'Social Responsibility', 'Sacrifice'],
      4: ['Divine Incarnation', 'Knowledge & Action', 'Spiritual Sacrifice', 'Ancient Wisdom'],
      5: ['Renunciation', 'Action in Inaction', 'Mental Purification', 'True Freedom'],
      6: ['Meditation', 'Mind Control', 'Spiritual Practice', 'Self-Realization'],
      7: ['Divine Knowledge', 'Devotion', 'Maya (Illusion)', 'Surrender'],
      8: ['Death & Afterlife', 'Cosmic Cycles', 'Supreme Absolute', 'Final Thought'],
      9: ['Sovereign Secret', 'Divine Grace', 'Universal Form', 'Easy Path'],
      10: ['Divine Manifestations', 'Cosmic Glory', 'Infinite Presence', 'Divine Attributes'],
      11: ['Universal Form', 'Cosmic Vision', 'Divine Terror & Beauty', 'Cosmic Time'],
      12: ['Pure Devotion', 'Qualities of Devotee', 'Paths to God', 'Divine Love'],
      13: ['Body & Soul', 'Knower & Known', 'Consciousness', 'Transcendence'],
      14: ['Three Gunas', 'Nature\'s Modes', 'Transcending Qualities', 'Liberation'],
      15: ['Tree of Existence', 'Supreme Person', 'Cosmic Reality', 'Ultimate Goal'],
      16: ['Divine & Demonic', 'Moral Qualities', 'Spiritual Destiny', 'Character Types'],
      17: ['Three Faiths', 'Worship Types', 'Food & Character', 'Austerity & Charity'],
      18: ['Complete Surrender', 'Final Teaching', 'Liberation Path', 'Divine Secret']
    };
    return themes[chapter] || [];
  };

  const themes = getChapterThemes(chapterNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/chapters" className="hover:text-orange-600 transition-colors">
                Chapters
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-800 font-medium">Chapter {chapterNumber}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-red-50/30 to-pink-100/50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                  {chapterNumber}
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-slate-800">Chapter {chapterNumber}</span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  {chapterInfo.title}
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                {chapterInfo.description}
              </p>

              {/* Chapter Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-orange-200">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {chapterInfo.verseCount} Verses
                </Badge>
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-blue-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sanskrit & English
                </Badge>
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-purple-200">
                  <Play className="w-4 h-4 mr-2" />
                  Video Commentary
                </Badge>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg">
                  <Link href={`/chapters/${chapterNumber}/verse/1`} className="flex items-center">
                    Start Reading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-slate-300 hover:bg-slate-50">
                  <Link href="#verses-list" className="flex items-center">
                    Browse Verses
                    <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Themes */}
        {themes.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6 text-center">
                  Key Themes & Teachings
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themes.map((theme, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center border border-orange-100"
                    >
                      <p className="text-sm font-medium text-slate-700">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Verses List */}
        <section id="verses-list" className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                  All Verses in Chapter {chapterNumber}
                </h2>
                <p className="text-lg text-slate-600">
                  Click on any verse to read the complete Sanskrit text, English translation, and commentary
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {verseNumbers.map((verseNumber) => (
                  <Card
                    key={verseNumber}
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white shadow-md cursor-pointer"
                  >
                    <Link href={`/chapters/${chapterNumber}/verse/${verseNumber}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2 group-hover:shadow-lg transition-shadow">
                            {verseNumber}
                          </div>
                          <p className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            Verse {verseNumber}
                          </p>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-center">
                        <p className="text-sm text-slate-600 mb-3">
                          Chapter {chapterNumber}.{verseNumber}
                        </p>
                        <div className="flex items-center justify-center text-orange-500 group-hover:text-orange-600 transition-colors">
                          <span className="text-sm font-medium">Read Verse</span>
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Navigation */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                {/* Previous Chapter */}
                <div className="w-full sm:w-auto">
                  {hasPrevChapter ? (
                    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-slate-300 hover:bg-slate-50">
                      <Link href={`/chapters/${chapterNumber - 1}`} className="flex items-center">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Previous Chapter
                      </Link>
                    </Button>
                  ) : (
                    <div className="w-full sm:w-auto"></div>
                  )}
                </div>

                {/* Back to Chapters */}
                <Button variant="ghost" asChild className="hover:bg-orange-50">
                  <Link href="/chapters" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    All Chapters
                  </Link>
                </Button>

                {/* Next Chapter */}
                <div className="w-full sm:w-auto">
                  {hasNextChapter ? (
                    <Button size="lg" asChild className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      <Link href={`/chapters/${chapterNumber + 1}`} className="flex items-center">
                        Next Chapter
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  ) : (
                    <div className="w-full sm:w-auto"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
