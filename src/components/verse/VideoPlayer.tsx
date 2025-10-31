'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { YouTubeThumbnail } from '@/components/ui/optimized-image';
import { Play, Volume2, ExternalLink, Languages, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  chapter: number;
  verse: number;
  className?: string;
  videoId?: string; // Optional YouTube video ID
}

export function VideoPlayer({ chapter, verse, className = '', videoId }: VideoPlayerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  // Mock video ID for demonstration - in real app this would come from your data
  const mockVideoId = videoId || 'dQw4w9WgXcQ'; // Default placeholder video
  const hasVideo = Boolean(videoId);

  const handleVideoClick = () => {
    if (hasVideo) {
      // Open video in modal or navigate to video page
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Play className="w-5 h-5 mr-2 text-orange-600" />
            Video Commentary
            {!hasVideo && <Badge variant="secondary" className="ml-2">Coming Soon</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasVideo ? (
            <YouTubeThumbnail
              videoId={videoId!}
              quality="high"
              alt={`Bhagavad Gita Chapter ${chapter} Verse ${verse} Video Commentary`}
              className="w-full"
              onClick={handleVideoClick}
            />
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
          
          {hasVideo && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleVideoClick}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Watch on YouTube
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Languages className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Multiple languages available</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
