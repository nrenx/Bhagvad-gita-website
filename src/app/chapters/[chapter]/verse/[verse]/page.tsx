import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Home, Book, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { VerseDisplay } from '@/components/verse/VerseDisplay'
import { VideoPlayer } from '@/components/verse/VideoPlayer'
import { QuickActions } from '@/components/verse/QuickActions'
import { getAllVerseKeys, getChapterInfo, getAdjacentVerses } from '@/lib/data'
import { getVerseDataFromFiles } from '@/lib/verse-data'
import { generateVerseVideoUrl } from '@/lib/content-utils'

interface VersePageProps {
  params: {
    chapter: string
    verse: string
  }
}

export async function generateMetadata({ params }: VersePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const chapterNum = parseInt(resolvedParams.chapter)
  const verseNum = parseInt(resolvedParams.verse)
  
  if (isNaN(chapterNum) || isNaN(verseNum)) {
    return {
      title: 'Verse Not Found - Bhagavad Gita',
      description: 'The requested verse could not be found.'
    }
  }

  const chapterInfo = getChapterInfo(chapterNum)
  const verseData = getVerseDataFromFiles(chapterNum, verseNum)
  
  if (!chapterInfo || !verseData) {
    return {
      title: 'Verse Not Found - Bhagavad Gita',
      description: 'The requested verse could not be found.'
    }
  }

  const versePreview = verseData.english.length > 150 
    ? verseData.english.substring(0, 150) + '...'
    : verseData.english

  return {
    title: `Chapter ${chapterNum}, Verse ${verseNum} - ${chapterInfo.title} | Bhagvad Gita`,
    description: versePreview,
    keywords: [
      `Chapter ${chapterNum}`,
      `Verse ${verseNum}`,
      chapterInfo.title,
      'Bhagavad Gita',
      'Sanskrit',
      'Hindu scripture',
      'spiritual wisdom',
      'Krishna',
      'Arjuna'
    ],
    openGraph: {
      title: `Chapter ${chapterNum}, Verse ${verseNum} - ${chapterInfo.title}`,
      description: versePreview,
      type: 'article',
      url: `/chapters/${chapterNum}/verse/${verseNum}`,
      images: [
        {
          url: '/images/ACEE6900-5949-4291-A3C6-83379D7BDB4E_1_105_c.jpeg',
          width: 1200,
          height: 630,
          alt: `Bhagavad Gita Chapter ${chapterNum} Verse ${verseNum}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Chapter ${chapterNum}, Verse ${verseNum} - ${chapterInfo.title}`,
      description: versePreview,
      images: ['/images/ACEE6900-5949-4291-A3C6-83379D7BDB4E_1_105_c.jpeg']
    },
    alternates: {
      canonical: `/chapters/${chapterNum}/verse/${verseNum}`
    }
  }
}

export async function generateStaticParams() {
  return getAllVerseKeys().map(({ chapter, verse }) => ({
    chapter: chapter.toString(),
    verse: verse.toString()
  }))
}

export default async function VersePage({ params }: VersePageProps) {
  const resolvedParams = await params;
  const chapterNum = parseInt(resolvedParams.chapter)
  const verseNum = parseInt(resolvedParams.verse)
  
  if (isNaN(chapterNum) || isNaN(verseNum)) {
    notFound()
  }

  const chapterInfo = getChapterInfo(chapterNum)
  const verseData = getVerseDataFromFiles(chapterNum, verseNum)
  
  if (!chapterInfo || !verseData) {
    notFound()
  }

  const { previousVerse, nextVerse } = getAdjacentVerses(chapterNum, verseNum)
  const videoUrl = generateVerseVideoUrl(chapterNum, verseNum)

  // Extract key themes/concepts from the verse
  const extractKeyThemes = (text: string): string[] => {
    const themes = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('dharma') || lowerText.includes('duty') || lowerText.includes('righteous')) themes.push('Dharma')
    if (lowerText.includes('karma') || lowerText.includes('action') || lowerText.includes('work')) themes.push('Karma')
    if (lowerText.includes('yoga') || lowerText.includes('union') || lowerText.includes('discipline')) themes.push('Yoga')
    if (lowerText.includes('devotion') || lowerText.includes('bhakti') || lowerText.includes('worship')) themes.push('Bhakti')
    if (lowerText.includes('knowledge') || lowerText.includes('wisdom') || lowerText.includes('jnana')) themes.push('Jnana')
    if (lowerText.includes('detachment') || lowerText.includes('renunciation')) themes.push('Detachment')
    if (lowerText.includes('soul') || lowerText.includes('atman') || lowerText.includes('self')) themes.push('Soul')
    if (lowerText.includes('krishna') || lowerText.includes('divine') || lowerText.includes('god')) themes.push('Divine')
    
    return themes.length > 0 ? themes : ['Spiritual Wisdom']
  }

  const verseThemes = extractKeyThemes(verseData.english)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/chapters" className="hover:text-orange-600 transition-colors flex items-center">
            <Book className="w-4 h-4 mr-1" />
            Chapters
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/chapters/${chapterNum}`} 
            className="hover:text-orange-600 transition-colors"
          >
            Chapter {chapterNum}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-orange-600 font-medium">Verse {verseNum}</span>
        </nav>

        {/* Verse Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Chapter {chapterNum}
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
              Verse {verseNum}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {chapterInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verse {verseNum} of {chapterInfo.verses} - {chapterInfo.meaning}
          </p>
        </div>

        {/* Key Themes */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {verseThemes.map((theme, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200"
            >
              {theme}
            </Badge>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Verse Content */}
          <div className="space-y-6">
            <VerseDisplay 
              chapter={chapterNum}
              verse={verseNum}
              content={verseData}
            />
            
            {/* Quick Actions */}
            <QuickActions 
              verseData={verseData}
              chapterNum={chapterNum}
              verseNum={verseNum}
            />
          </div>

          {/* Video Player and Navigation */}
          <div className="space-y-6">
            {/* Video Player */}
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Video Commentary
                  <Badge variant="secondary" className="ml-2">Multi-language</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VideoPlayer 
                  chapter={chapterNum}
                  verse={verseNum}
                />
              </CardContent>
            </Card>

            {/* Verse Navigation */}
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Navigate Verses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Previous Verse */}
                {previousVerse && (
                  <Link 
                    href={`/chapters/${previousVerse.chapter}/verse/${previousVerse.verse}`}
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-between group">
                      <div className="flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Previous Verse
                      </div>
                      <div className="text-sm text-gray-500">
                        {previousVerse.chapter}:{previousVerse.verse}
                      </div>
                    </Button>
                  </Link>
                )}

                {/* Chapter Overview */}
                <Link href={`/chapters/${chapterNum}`}>
                  <Button variant="outline" className="w-full">
                    <Book className="w-4 h-4 mr-2" />
                    Chapter {chapterNum} Overview
                  </Button>
                </Link>

                {/* Next Verse */}
                {nextVerse && (
                  <Link 
                    href={`/chapters/${nextVerse.chapter}/verse/${nextVerse.verse}`}
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-between group">
                      <div className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Next Verse
                      </div>
                      <div className="text-sm text-gray-500">
                        {nextVerse.chapter}:{nextVerse.verse}
                      </div>
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Chapter Context */}
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Chapter Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Summary</h4>
                    <p className="text-sm text-gray-600">{chapterInfo.summary}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Total Verses:</span>
                      <span className="ml-2 text-gray-600">{chapterInfo.verses}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Current:</span>
                      <span className="ml-2 text-gray-600">{verseNum} of {chapterInfo.verses}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-amber-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(verseNum / chapterInfo.verses) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          {previousVerse ? (
            <Link 
              href={`/chapters/${previousVerse.chapter}/verse/${previousVerse.verse}`}
              className="order-1 sm:order-none"
            >
              <Button size="lg" variant="outline" className="group">
                <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Previous Verse
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          <Link href={`/chapters/${chapterNum}`}>
            <Button size="lg" variant="secondary">
              <Book className="w-5 h-5 mr-2" />
              Chapter Overview
            </Button>
          </Link>

          {nextVerse ? (
            <Link 
              href={`/chapters/${nextVerse.chapter}/verse/${nextVerse.verse}`}
              className="order-2 sm:order-none"
            >
              <Button size="lg" variant="outline" className="group">
                Next Verse
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
