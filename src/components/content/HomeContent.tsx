import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChapterCard } from '@/components/chapter/ChapterCard';
import { AnimatedSection, FloatingOm, ParallaxElement, ParallaxHero, ParallaxText, AnimatedStaggerItem, InteractiveCard, MagneticElement } from '@/components/ui/animations';
import { getAllChapters, getTotalVerseCount } from '@/lib/data';
import { 
  BookOpen, 
  Play, 
  Languages, 
  Heart, 
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function HomeContent() {
  const allChapters = getAllChapters();
  const totalVerses = getTotalVerseCount();
  const featuredChapters = [
    allChapters[0],  // Chapter 1
    allChapters[1],  // Chapter 2  
    allChapters[10], // Chapter 11
    allChapters[17]  // Chapter 18
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <main>
        {/* Hero Section */}
        <ParallaxHero 
          backgroundSpeed={0.6} 
          midgroundSpeed={0.4}
          className="py-20 lg:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Om Symbol */}
              <AnimatedSection variant="fadeInUp" className="mb-8 flex justify-center">
                <FloatingOm>
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                    ॐ
                  </div>
                </FloatingOm>
              </AnimatedSection>
              
              <AnimatedSection variant="fadeInUp" delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <ParallaxText speed={0.1}>
                    <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                      Bhagavad Gita
                    </span>
                  </ParallaxText>
                  <br />
                  <ParallaxText speed={0.15}>
                    <span className="text-slate-800">Sacred Wisdom for Life</span>
                  </ParallaxText>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection variant="fadeInUp" delay={0.4}>
                <ParallaxText speed={0.2}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                    Discover the timeless teachings of Lord Krishna through the complete Bhagavad Gita 
                    with Sanskrit verses, clear English translations, and enlightening video commentary.
                  </p>
                </ParallaxText>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection variant="fadeInUp" delay={0.6}>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-orange-200">
                    <BookOpen className="w-4 h-4 mr-2" />
                    18 Chapters
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-red-200">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {totalVerses}+ Verses
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2 bg-white/80 border-pink-200">
                    <Play className="w-4 h-4 mr-2" />
                    Video Commentary
                  </Badge>
                </div>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection variant="fadeInUp" delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <MagneticElement>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
                      asChild
                    >
                      <Link href="/chapters">
                        Begin Your Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticElement>
                  <MagneticElement>
                    <Button size="lg" variant="outline" asChild className="border-slate-300 hover:bg-slate-50">
                      <Link href="/chapters/1/verse/1" className="flex items-center">
                        Read First Verse
                        <BookOpen className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticElement>
                </div>
              </AnimatedSection>

              {/* Featured Quote */}
              <AnimatedSection variant="fadeInUp" delay={1.0}>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-white/50 shadow-lg max-w-2xl mx-auto">
                  <p className="text-2xl font-sanskrit text-slate-700 mb-4">
                    कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
                  </p>
                  <p className="text-lg text-slate-600 italic">
                    "You have the right to perform your actions, but never to the fruits of action."
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    — Bhagavad Gita 2.47
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </ParallaxHero>

        {/* Featured Chapters */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                  Featured Chapters
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Start your spiritual journey with these essential chapters of the Bhagavad Gita
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="stagger">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {featuredChapters.map((chapter) => (
                  <AnimatedStaggerItem key={chapter.number}>
                    <ChapterCard chapter={chapter} />
                  </AnimatedStaggerItem>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeInUp" delay={0.6}>
              <div className="text-center">
                <MagneticElement>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-slate-300 hover:bg-slate-50"
                    asChild
                  >
                    <Link href="/chapters">
                      View All 18 Chapters
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticElement>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-16 bg-gradient-to-br from-slate-50 to-orange-50 overflow-hidden">
          <ParallaxElement speed={0.3}>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/30 via-transparent to-red-100/20" />
          </ParallaxElement>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection variant="fadeInUp">
              <div className="text-center mb-12">
                <ParallaxText speed={0.1}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                    Complete Spiritual Experience
                  </h2>
                </ParallaxText>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Access the Bhagavad Gita in its full glory with modern technology and ancient wisdom
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="stagger">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <AnimatedStaggerItem>
                  <InteractiveCard>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white mr-3">
                            ॐ
                          </div>
                          Original Sanskrit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Read the original Sanskrit shlokas in beautiful Devanagari script with proper formatting and pronunciation guides.
                        </p>
                      </CardContent>
                    </Card>
                  </InteractiveCard>
                </AnimatedStaggerItem>

              {/* Feature 2 */}
              <AnimatedStaggerItem>
                <InteractiveCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white mr-3">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        Clear Translations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Understand every verse with clear, modern English translations that preserve the spiritual essence.
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </AnimatedStaggerItem>

              {/* Feature 3 */}
              <AnimatedStaggerItem>
                <InteractiveCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white mr-3">
                          <Star className="w-5 h-5" />
                        </div>
                        Word Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Dive deep with word-by-word translations and meanings to understand the profound Sanskrit terminology.
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </AnimatedStaggerItem>

              {/* Feature 4 */}
              <AnimatedStaggerItem>
                <InteractiveCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center text-white mr-3">
                          <Play className="w-5 h-5" />
                        </div>
                        Video Commentary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Watch expert commentary and explanations through our comprehensive video library for deeper understanding.
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </AnimatedStaggerItem>

              {/* Feature 5 */}
              <AnimatedStaggerItem>
                <InteractiveCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center text-white mr-3">
                          <Languages className="w-5 h-5" />
                        </div>
                        Multi-Language
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Access content in multiple Indian languages including Hindi, Bengali, Tamil, Telugu, and more.
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </AnimatedStaggerItem>

              {/* Feature 6 */}
              <AnimatedStaggerItem>
                <InteractiveCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white mr-3">
                          <Heart className="w-5 h-5" />
                        </div>
                        Always Free
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Complete access to all content is free forever. Spiritual wisdom should be accessible to everyone.
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </AnimatedStaggerItem>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Serving Seekers Worldwide
              </h2>
              <p className="text-lg text-slate-600">
                Join thousands of spiritual seekers on their journey of self-discovery
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                  18
                </div>
                <div className="text-slate-600">Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {totalVerses}+
                </div>
                <div className="text-slate-600">Sacred Verses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-slate-600">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-slate-600">Free Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Discover the profound teachings that have guided millions for over 5000 years. 
              Start with any chapter or verse that calls to your heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100" asChild>
                <Link href="/chapters/1/verse/1" className="flex items-center">
                  Start Reading Now
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/chapters">
                  Browse All Chapters
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
