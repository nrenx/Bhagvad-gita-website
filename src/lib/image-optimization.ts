/**
 * Image optimization utilities for performance and SEO
 */

import { ImageProps } from 'next/image';

// Image quality presets for different use cases
export const IMAGE_QUALITY = {
  LOW: 30,      // For thumbnails and small previews
  MEDIUM: 60,   // For regular content images
  HIGH: 75,     // For hero images and important visuals
  ULTRA: 90,    // For photography and detailed imagery
  LOSSLESS: 100 // For logos and graphics
} as const;

// Common image sizes for responsive design
export const IMAGE_SIZES = {
  THUMBNAIL: '(max-width: 150px) 100vw, 150px',
  CARD: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  HERO: '100vw',
  AVATAR: '(max-width: 96px) 100vw, 96px',
  FULL_WIDTH: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
} as const;

// Standard dimensions for common image types
export const IMAGE_DIMENSIONS = {
  THUMBNAIL: { width: 150, height: 150 },
  CARD_IMAGE: { width: 400, height: 300 },
  HERO_IMAGE: { width: 1920, height: 1080 },
  AVATAR_SM: { width: 32, height: 32 },
  AVATAR_MD: { width: 48, height: 48 },
  AVATAR_LG: { width: 64, height: 64 },
  YOUTUBE_THUMBNAIL: { width: 480, height: 360 },
  LOGO_SM: { width: 120, height: 40 },
  LOGO_MD: { width: 180, height: 60 },
  LOGO_LG: { width: 240, height: 80 }
} as const;

/**
 * Generate blur placeholder data URL for images
 */
export function generateBlurDataURL(width: number = 400, height: number = 300): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e2e8f0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate optimized image props based on use case
 */
export interface OptimizedImageConfig {
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function getOptimizedImageProps(
  type: keyof typeof IMAGE_DIMENSIONS,
  config: OptimizedImageConfig = {}
): Partial<ImageProps> {
  const dimensions = IMAGE_DIMENSIONS[type];
  const {
    quality = IMAGE_QUALITY.HIGH,
    priority = false,
    placeholder = 'blur',
    sizes,
    loading = priority ? 'eager' : 'lazy'
  } = config;

  const props: Partial<ImageProps> = {
    width: dimensions.width,
    height: dimensions.height,
    quality,
    priority,
    placeholder,
    loading,
  };

  // Add blur placeholder if enabled
  if (placeholder === 'blur') {
    props.blurDataURL = generateBlurDataURL(dimensions.width, dimensions.height);
  }

  // Add responsive sizes if provided
  if (sizes) {
    props.sizes = sizes;
  } else {
    // Default sizes based on image type
    switch (type) {
      case 'THUMBNAIL':
        props.sizes = IMAGE_SIZES.THUMBNAIL;
        break;
      case 'CARD_IMAGE':
        props.sizes = IMAGE_SIZES.CARD;
        break;
      case 'HERO_IMAGE':
        props.sizes = IMAGE_SIZES.HERO;
        break;
      case 'AVATAR_SM':
      case 'AVATAR_MD':
      case 'AVATAR_LG':
        props.sizes = IMAGE_SIZES.AVATAR;
        break;
      default:
        props.sizes = IMAGE_SIZES.FULL_WIDTH;
    }
  }

  return props;
}

/**
 * YouTube thumbnail optimization
 */
export interface YouTubeImageConfig {
  videoId: string;
  quality?: 'default' | 'medium' | 'high' | 'maxres';
  optimizedProps?: OptimizedImageConfig;
}

export function getYouTubeImageProps({
  videoId,
  quality = 'high',
  optimizedProps = {}
}: YouTubeImageConfig) {
  const qualityMap = {
    default: { suffix: 'default', ...IMAGE_DIMENSIONS.THUMBNAIL },
    medium: { suffix: 'mqdefault', width: 320, height: 180 },
    high: { suffix: 'hqdefault', ...IMAGE_DIMENSIONS.YOUTUBE_THUMBNAIL },
    maxres: { suffix: 'maxresdefault', width: 1280, height: 720 }
  };

  const config = qualityMap[quality];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${config.suffix}.jpg`;

  return {
    src: thumbnailUrl,
    width: config.width,
    height: config.height,
    ...getOptimizedImageProps('YOUTUBE_THUMBNAIL', {
      quality: IMAGE_QUALITY.HIGH,
      ...optimizedProps
    })
  };
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    document.head.appendChild(link);
  }
}

/**
 * Lazy load images with intersection observer
 */
export function useLazyImageObserver() {
  if (typeof window === 'undefined') return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1
    }
  );

  return observer;
}

/**
 * Image format detection and optimization
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

/**
 * Generate responsive image srcSet
 */
export function generateSrcSet(baseUrl: string, sizes: number[]): string {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Image compression utility for client-side optimization
 */
export function compressImage(
  file: File, 
  quality: number = 0.8, 
  maxWidth: number = 1920
): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
}

export type ImageOptimizationType = keyof typeof IMAGE_DIMENSIONS;
export type ImageQualityType = keyof typeof IMAGE_QUALITY;
