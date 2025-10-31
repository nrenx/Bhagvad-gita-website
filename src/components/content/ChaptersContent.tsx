import React from 'react';
import { ChapterCard } from '@/components/chapter/ChapterCard';
import { getAllChapters } from '@/lib/data';

export function ChaptersContent() {
  const chapters = getAllChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Chapters Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {chapters.map((chapter, index) => (
              <div key={chapter.number} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ChapterCard chapter={chapter} />
              </div>
            ))}
          </div>

          {/* Reading Guide */}
          <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 lg:p-12 border border-orange-100">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6 text-center">
                How to Read the Bhagavad Gita
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        1
                      </span>
                      For Beginners
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      Start with <strong>Chapter 2 (Sankhya Yoga)</strong> for foundational concepts, 
                      then read <strong>Chapter 12 (Bhakti Yoga)</strong> for the path of devotion.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        2
                      </span>
                      Sequential Reading
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      Read from Chapter 1 through 18 to follow Arjuna's complete spiritual 
                      transformation and Krishna's systematic teaching.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        3
                      </span>
                      Thematic Study
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      Focus on specific themes: Chapters 3-5 for Karma Yoga, 
                      Chapters 7-12 for Bhakti Yoga, Chapters 13-18 for Jnana Yoga.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        4
                      </span>
                      Daily Practice
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      Read one verse daily with contemplation. Each verse contains 
                      enough wisdom for deep reflection and practical application.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        5
                      </span>
                      With Commentary
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      Use our video commentary and word-by-word translations to 
                      understand the deeper meanings and Sanskrit terminology.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        6
                      </span>
                      Apply Teachings
                    </h4>
                    <p className="text-slate-600 leading-relaxed ml-11">
                      The Gita is meant for practical application. Reflect on how 
                      each teaching applies to your daily challenges and decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Categories */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Three Paths of Yoga
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The Bhagavad Gita teaches three main paths to spiritual realization, 
              often called the three yogas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Karma Yoga */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  कर्म
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Karma Yoga</h3>
                <p className="text-slate-600">The Path of Action</p>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The yoga of selfless action, performing one's duty without attachment to results. 
                This path is ideal for active individuals who want to transform their work into worship.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-slate-500"><strong>Key Chapters:</strong> 3, 4, 5</p>
                <p className="text-sm text-slate-500"><strong>Central Teaching:</strong> Detached action</p>
                <p className="text-sm text-slate-500"><strong>Best For:</strong> Active personalities</p>
              </div>
            </div>

            {/* Bhakti Yoga */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  भक्ति
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Bhakti Yoga</h3>
                <p className="text-slate-600">The Path of Devotion</p>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The yoga of love and devotion to the Divine. This path emphasizes surrender, 
                faith, and emotional connection with God through prayer, worship, and service.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-slate-500"><strong>Key Chapters:</strong> 7, 9, 12</p>
                <p className="text-sm text-slate-500"><strong>Central Teaching:</strong> Divine love</p>
                <p className="text-sm text-slate-500"><strong>Best For:</strong> Emotional temperaments</p>
              </div>
            </div>

            {/* Jnana Yoga */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  ज्ञान
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Jnana Yoga</h3>
                <p className="text-slate-600">The Path of Knowledge</p>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The yoga of wisdom and self-inquiry. This path involves understanding the true 
                nature of reality through study, contemplation, and direct realization of the Self.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-slate-500"><strong>Key Chapters:</strong> 2, 13, 15</p>
                <p className="text-sm text-slate-500"><strong>Central Teaching:</strong> Self-realization</p>
                <p className="text-sm text-slate-500"><strong>Best For:</strong> Intellectual seekers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
