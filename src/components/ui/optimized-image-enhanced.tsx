'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showLoader?: boolean;
}

/**
 * Optimized Image component with loading states and error handling
 * Implements progressive image loading with blur placeholder
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  showLoader = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && showLoader && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

/**
 * Responsive image with art direction
 */
interface ResponsiveImageProps {
  mobileSrc: string;
  desktopSrc: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  alt,
  priority = false,
  className,
}: ResponsiveImageProps) {
  return (
    <>
      {/* Mobile */}
      <Image
        src={mobileSrc}
        alt={alt}
        width={768}
        height={432}
        priority={priority}
        className={cn('md:hidden', className)}
        sizes="100vw"
      />
      {/* Desktop */}
      <Image
        src={desktopSrc}
        alt={alt}
        width={1920}
        height={1080}
        priority={priority}
        className={cn('hidden md:block', className)}
        sizes="100vw"
      />
    </>
  );
}
