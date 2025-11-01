'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  generateBlurDataURL, 
  getYouTubeImageProps, 
  IMAGE_QUALITY
} from '@/lib/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
}

/**
 * Optimized Image component using Next.js Image with performance optimizations
 * 
 * Features:
 * - Automatic WebP/AVIF conversion
 * - Lazy loading by default
 * - Responsive image loading
 * - Blur placeholder support
 * - Performance monitoring
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = IMAGE_QUALITY.HIGH,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const handleLoad = () => {
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    onError?.();
  };

  // Generate blur placeholder for better UX
  const getBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL;
    return generateBlurDataURL(width || 400, height || 300);
  };

  const imageProps = {
    src,
    alt,
    quality,
    priority,
    placeholder,
    blurDataURL: placeholder === 'blur' ? getBlurPlaceholder() : undefined,
    sizes,
    className: cn('transition-opacity duration-300', className),
    style: { objectFit },
    onLoad: handleLoad,
    onError: handleError,
    loading: priority ? 'eager' : loading,
    ...props
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        alt={alt}
        fill
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

/**
 * YouTube Thumbnail component with Next.js Image optimization
 */
interface YouTubeThumbnailProps {
  videoId: string;
  quality?: 'default' | 'medium' | 'high' | 'maxres';
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

export function YouTubeThumbnail({
  videoId,
  quality = 'high',
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onClick,
}: YouTubeThumbnailProps) {
  const imageProps = getYouTubeImageProps({
    videoId,
    quality,
    optimizedProps: {
      priority,
      sizes,
      quality: IMAGE_QUALITY.HIGH
    }
  });

  return (
    <div 
      className={cn('relative overflow-hidden rounded-lg cursor-pointer group', className)}
      onClick={onClick}
    >
      <OptimizedImage
        src={imageProps.src as string}
        alt={alt}
        width={typeof imageProps.width === 'number' ? imageProps.width : undefined}
        height={typeof imageProps.height === 'number' ? imageProps.height : undefined}
        priority={imageProps.priority}
        quality={typeof imageProps.quality === 'number' ? imageProps.quality : IMAGE_QUALITY.HIGH}
        placeholder="blur"
        blurDataURL={imageProps.blurDataURL}
        sizes={imageProps.sizes}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* YouTube Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
          <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
        </div>
      </div>
      
      {/* Video Duration Badge (if needed) */}
      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
        HD
      </div>
    </div>
  );
}

/**
 * Responsive Avatar component for user profiles
 */
interface AvatarImageProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarImage({
  src,
  alt,
  fallback,
  size = 'md',
  className
}: AvatarImageProps) {
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 }
  };

  const { width, height } = sizeMap[size];

  if (!src) {
    return (
      <div 
        className={cn(
          'rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-orange-600 font-semibold',
          className
        )}
        style={{ width, height }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        placeholder="blur"
        className="rounded-full"
        objectFit="cover"
      />
    </div>
  );
}
