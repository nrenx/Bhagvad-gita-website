'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChapterInfo } from '@/lib/data';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterInfo;
  className?: string;
}

export function ChapterCard({ chapter, className = '' }: ChapterCardProps) {
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {chapter.number}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                Chapter {chapter.number}
              </CardTitle>
              <p className="text-sm text-slate-600 font-medium">{chapter.title}</p>
            </div>
          </div>
          <BookOpen className="h-6 w-6 text-slate-400 group-hover:text-orange-500 transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <p className="text-slate-600 leading-relaxed line-clamp-3">
          {chapter.description}
        </p>
        <div className="mt-4 flex items-center text-sm text-slate-500">
          <span className="bg-slate-100 px-2 py-1 rounded-full">
            {chapter.verseCount} verses
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
        >
          <Link href={`/chapters/${chapter.number}`} className="flex items-center justify-center">
            Explore Chapter
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
