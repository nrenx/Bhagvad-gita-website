'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Web Vitals monitoring for Core Web Vitals
 * Tracks LCP, FID, CLS, FCP, TTFB
 */
export function useWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import web-vitals dynamically (optional dependency)
    // To use: npm install web-vitals
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS((metric: any) => trackEvent('web_vital', { name: 'CLS', value: metric.value }));
      onFID((metric: any) => trackEvent('web_vital', { name: 'FID', value: metric.value }));
      onFCP((metric: any) => trackEvent('web_vital', { name: 'FCP', value: metric.value }));
      onLCP((metric: any) => trackEvent('web_vital', { name: 'LCP', value: metric.value }));
      onTTFB((metric: any) => trackEvent('web_vital', { name: 'TTFB', value: metric.value }));
    }).catch(() => {
      // web-vitals not installed, skip tracking
      console.log('Web Vitals tracking disabled (package not installed)');
    });
  }, []);
}

/**
 * Page view tracking hook
 * Integrates with analytics services (GA, Plausible, etc.)
 */
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track page view
    trackPageView(pathname);
  }, [pathname]);
}

function trackPageView(url: string) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }

  // Plausible Analytics (privacy-friendly alternative)
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as any).plausible('pageview');
  }

  // Custom tracking
  console.log('Page view:', url);
}

/**
 * User interaction tracking
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if ('gtag' in window) {
    (window as any).gtag('event', eventName, properties);
  }

  // Plausible Analytics
  if ('plausible' in window) {
    (window as any).plausible(eventName, { props: properties });
  }

  console.log('Event tracked:', eventName, properties);
}

/**
 * Scroll depth tracking
 */
export function useScrollDepthTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const thresholds = [25, 50, 75, 90, 100];
    const triggered = new Set<number>();

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !triggered.has(threshold)) {
          triggered.add(threshold);
          trackEvent('scroll_depth', {
            depth: threshold,
            page: window.location.pathname,
          });
        }
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Reading time tracking for verses
 */
export function useReadingTime(contentLength: number) {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); // seconds

      if (timeSpent > 5) {
        // Only track if spent more than 5 seconds
        trackEvent('content_engagement', {
          time_spent: timeSpent,
          content_length: contentLength,
          page: window.location.pathname,
        });
      }
    };
  }, [contentLength]);
}
