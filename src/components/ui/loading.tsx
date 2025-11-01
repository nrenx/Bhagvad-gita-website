'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner with spiritual Om symbol animation
 */
export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={cn(sizeClasses[size], className)}
    >
      <Loader2 className="w-full h-full text-orange-500" />
    </motion.div>
  );
}

/**
 * Full-page loading state with Om symbol
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl mx-auto mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ॐ
        </motion.div>
        <p className="text-slate-600 font-medium">Loading sacred wisdom...</p>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for cards
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-slate-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
      </div>
      <div className="h-10 bg-slate-200 rounded" />
    </div>
  );
}

/**
 * Skeleton loader for verse content
 */
export function VerseSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg border border-slate-200 p-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="h-8 bg-slate-200 rounded w-32" />
        <div className="h-8 bg-slate-200 rounded w-32" />
      </div>
      
      {/* Sanskrit */}
      <div className="mb-8 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="h-8 bg-slate-200 rounded mb-3" />
          <div className="h-8 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
      
      {/* Translation */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-32 mb-4" />
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
      </div>
    </div>
  );
}

/**
 * Generic content skeleton
 */
export function ContentSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 rounded"
          style={{ width: i === lines - 1 ? '80%' : '100%' }}
        />
      ))}
    </div>
  );
}

/**
 * Grid skeleton for chapter cards
 */
export function ChapterGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
