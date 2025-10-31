'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, Play, ExternalLink } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/lib/content-utils';
import type { VerseVideoSourceMap } from '@/lib/verse-videos';

interface VideoPlayerProps {
  chapter: number;
  verse: number;
  videos: VerseVideoSourceMap;
  defaultLanguage?: string | null;
  className?: string;
}

export function VideoPlayer({
  chapter,
  verse,
  videos,
  defaultLanguage,
  className = '',
}: VideoPlayerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const availableLanguages = useMemo(
    () => Object.keys(videos),
    [videos]
  );

  useEffect(() => {
    if (availableLanguages.length === 0) {
      setSelectedLanguage('');
      return;
    }

    if (defaultLanguage && videos[defaultLanguage]) {
      setSelectedLanguage(defaultLanguage);
      return;
    }

    if (!videos[selectedLanguage]) {
      setSelectedLanguage(availableLanguages[0]);
    }
  }, [availableLanguages, defaultLanguage, selectedLanguage, videos]);

  const languageMetaMap = useMemo(
    () => new Map(SUPPORTED_LANGUAGES.map((language) => [language.code, language])),
    []
  );

  const currentVideo = selectedLanguage ? videos[selectedLanguage] : undefined;

  const handleOpenPreview = () => {
    if (!currentVideo) return;
    window.open(`https://youtube.com/shorts/${currentVideo.videoId}`, '_blank', 'noopener');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {currentVideo ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Languages className="w-4 h-4 text-gray-500" />
            {availableLanguages.map((languageCode) => {
              const meta = languageMetaMap.get(languageCode);
              const label = meta ? `${meta.flag} ${meta.name}` : languageCode.toUpperCase();
              const isActive = selectedLanguage === languageCode;

              return (
                <Button
                  key={languageCode}
                  size="sm"
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setSelectedLanguage(languageCode)}
                >
                  {label}
                </Button>
              );
            })}
          </div>

          <div className="aspect-video overflow-hidden rounded-lg border border-orange-200 bg-black">
            <iframe
              key={currentVideo.videoId}
              src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playsinline=1`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
              title={currentVideo.title}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button size="sm" variant="outline" onClick={handleOpenPreview}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in new tab
            </Button>
            <Badge variant="secondary">
              {languageMetaMap.get(selectedLanguage)?.name ?? 'Video'} commentary
            </Badge>
          </div>
        </>
      ) : (
        <div className="aspect-video rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <Play className="w-12 h-12 mx-auto text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Video Coming Soon
            </h3>
            <p className="text-gray-600">
              Chapter {chapter}, Verse {verse} video commentary will be available soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
