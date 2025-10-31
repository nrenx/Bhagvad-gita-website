'use client';

import React from 'react';
import { OptimizedImage } from './optimized-image';
import { cn } from '@/lib/utils';

interface OptimizedIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Optimized Icon component for SVG and small images
 * Uses Next.js Image for optimization while maintaining crisp quality
 */
export function OptimizedIcon({
  src,
  alt,
  size = 24,
  className,
  priority = false
}: OptimizedIconProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      quality={100} // Maximum quality for icons
      className={cn('inline-block', className)}
      objectFit="contain"
    />
  );
}

/**
 * Optimized Logo component with responsive sizing
 */
interface OptimizedLogoProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
}

export function OptimizedLogo({
  src,
  alt,
  size = 'md',
  className,
  priority = true // Logos are typically above the fold
}: OptimizedLogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
    xl: { width: 360, height: 120 }
  };

  const { width, height } = sizeMap[size];

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={100}
      className={cn('object-contain', className)}
      sizes="(max-width: 768px) 180px, 240px"
    />
  );
}
