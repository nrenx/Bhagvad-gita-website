'use client';

import { Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickActionsProps {
  verseData: {
    sanskrit: string;
    romanized: string;
    english: string;
  };
  chapterNum: number;
  verseNum: number;
}

export function QuickActions({ verseData, chapterNum, verseNum }: QuickActionsProps) {
  const handleCopyVerse = () => {
    navigator.clipboard.writeText(
      `${verseData.sanskrit}\n\n${verseData.romanized}\n\n${verseData.english}\n\n- Bhagavad Gita, Chapter ${chapterNum}, Verse ${verseNum}`
    );
  };

  const handleShareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: `Chapter ${chapterNum}, Verse ${verseNum} - Bhagavad Gita`,
        text: verseData.english,
        url: window.location.href
      });
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleCopyVerse}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Verse
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleShareVerse}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Verse
        </Button>
      </CardContent>
    </Card>
  );
}
