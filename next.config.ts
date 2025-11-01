import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    
    // Allowed external domains for images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Minimize the number of requests by optimizing static images
    minimumCacheTTL: 86400, // 24 hours cache
    
    // Disable static optimization for dynamic images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable static exports when building for production (required for GitHub Pages)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
};

export default nextConfig;
