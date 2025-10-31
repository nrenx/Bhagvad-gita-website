'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { VerseContent } from '@/lib/data';
import { Volume2, Copy, Share2, BookOpen, Languages } from 'lucide-react';
import { toast } from 'sonner';

interface VerseDisplayProps {
  chapter: number;
  verse: number;
  content: VerseContent;
  className?: string;
}

export function VerseDisplay({ chapter, verse, content, className = '' }: VerseDisplayProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      toast.success(`${section} copied to clipboard`);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const shareVerse = async () => {
    const shareData = {
      title: `Bhagavad Gita - Chapter ${chapter}, Verse ${verse}`,
      text: `${content.sanskrit}\n\n${content.english}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`,
          'Verse details'
        );
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Card className={`max-w-4xl mx-auto bg-gradient-to-br from-white to-slate-50 shadow-xl border-0 ${className}`}>
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Badge variant="outline" className="text-base px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
            <BookOpen className="w-4 h-4 mr-2" />
            Chapter {chapter}
          </Badge>
          <Badge variant="outline" className="text-base px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
            Verse {verse}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Chapter {chapter}, Verse {verse}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Sanskrit Shloka */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700 flex items-center">
              <Languages className="w-5 h-5 mr-2 text-orange-500" />
              Sanskrit Shloka
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.sanskrit, 'Sanskrit')}
              className="hover:bg-orange-50"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copiedSection === 'Sanskrit' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100">
            <p className="text-2xl md:text-3xl font-sanskrit leading-relaxed text-slate-800">
              {content.sanskrit}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Romanized Transliteration */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700 flex items-center">
              <Volume2 className="w-5 h-5 mr-2 text-blue-500" />
              Pronunciation Guide
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.romanized, 'Pronunciation')}
              className="hover:bg-blue-50"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copiedSection === 'Pronunciation' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed italic">
              {content.romanized}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* English Translation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700">
              English Translation
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.english, 'Translation')}
              className="hover:bg-green-50"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copiedSection === 'Translation' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
            <p className="text-lg leading-relaxed text-slate-700">
              {content.english}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Word-by-Word Translation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700">
              Word-by-Word Meaning
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.wordByWord, 'Word meanings')}
              className="hover:bg-purple-50"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copiedSection === 'Word meanings' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
            <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line">
              {content.wordByWord}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            onClick={shareVerse}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share This Verse
          </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(
              `Chapter ${chapter}, Verse ${verse}\n\n${content.sanskrit}\n\n${content.english}`,
              'Complete verse'
            )}
            className="flex-1 border-slate-300 hover:bg-slate-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Complete Verse
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
