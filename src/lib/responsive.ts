'use client';

/**
 * Responsive design testing and validation utilities
 * Ensures consistent behavior across all device sizes
 */

import { useEffect, useState } from 'react';

// Standard device breakpoints
export const BREAKPOINTS = {
  xs: 320,    // iPhone SE
  sm: 375,    // iPhone 12 mini
  md: 768,    // iPad portrait
  lg: 1024,   // iPad landscape / small laptop
  xl: 1280,   // Desktop
  xxl: 1536,  // Large desktop
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Hook to get current breakpoint and screen size
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>('md');
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });

      if (width >= BREAKPOINTS.xxl) {
        setBreakpoint('xxl');
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint('xl');
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint('lg');
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint('md');
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    }

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return { breakpoint, screenSize };
}

/**
 * Hook to detect mobile devices
 */
export function useIsMobile() {
  const { breakpoint } = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm';
}

/**
 * Hook to detect tablet devices
 */
export function useIsTablet() {
  const { breakpoint } = useBreakpoint();
  return breakpoint === 'md';
}

/**
 * Hook to detect desktop devices
 */
export function useIsDesktop() {
  const { breakpoint } = useBreakpoint();
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === 'xxl';
}

/**
 * Responsive image sizes generator
 */
export function generateResponsiveSizes({
  mobile = '100vw',
  tablet = '50vw',
  desktop = '33vw',
}: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
} = {}) {
  return `(max-width: ${BREAKPOINTS.sm}px) ${mobile}, (max-width: ${BREAKPOINTS.md}px) ${tablet}, ${desktop}`;
}

/**
 * Touch target validation for mobile accessibility
 */
export function validateTouchTargets(): void {
  if (process.env.NODE_ENV === 'development') {
    const MIN_TOUCH_TARGET = 44; // WCAG recommended minimum
    
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      
      const width = rect.width + parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight);
      const height = rect.height + parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);

      if (width < MIN_TOUCH_TARGET || height < MIN_TOUCH_TARGET) {
        console.warn(
          `Touch target too small: ${width}x${height}px. Minimum recommended: ${MIN_TOUCH_TARGET}x${MIN_TOUCH_TARGET}px`,
          element
        );
      }
    });
  }
}

/**
 * Layout shift detection for performance monitoring
 */
export function detectLayoutShifts(): void {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.warn('Layout shift detected:', {
            value: (entry as any).value,
            sources: (entry as any).sources,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }
}

/**
 * Viewport testing utility for different screen sizes
 */
export const VIEWPORT_TESTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop Small', width: 1280, height: 720 },
  { name: 'Desktop Large', width: 1920, height: 1080 },
  { name: 'Ultra Wide', width: 2560, height: 1440 },
] as const;

/**
 * Responsive text utility - adjusts text based on screen size
 */
export function getResponsiveTextSize(baseSize: string, breakpoint: BreakpointKey): string {
  const sizeMap: Record<BreakpointKey, string> = {
    xs: `calc(${baseSize} * 0.8)`,
    sm: `calc(${baseSize} * 0.9)`,
    md: baseSize,
    lg: `calc(${baseSize} * 1.1)`,
    xl: `calc(${baseSize} * 1.2)`,
    xxl: `calc(${baseSize} * 1.3)`,
  };

  return sizeMap[breakpoint] || baseSize;
}

/**
 * Container width utility for responsive layouts
 */
export function getContainerWidth(breakpoint: BreakpointKey): string {
  const widthMap: Record<BreakpointKey, string> = {
    xs: '100%',
    sm: '100%',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  };

  return widthMap[breakpoint];
}

/**
 * Grid columns utility for responsive grids
 */
export function getResponsiveGridCols(breakpoint: BreakpointKey): number {
  const colsMap: Record<BreakpointKey, number> = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 5,
  };

  return colsMap[breakpoint];
}

/**
 * Performance monitoring for responsive components
 */
export function monitorResponsivePerformance(): void {
  if (typeof window !== 'undefined') {
    let resizeTimeout: NodeJS.Timeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        validateTouchTargets();
        console.log('Responsive layout updated for viewport:', {
          width: window.innerWidth,
          height: window.innerHeight,
          timestamp: new Date().toISOString(),
        });
      }, 250);
    });

    // Initial validation
    window.addEventListener('load', () => {
      validateTouchTargets();
      detectLayoutShifts();
    });
  }
}

/**
 * Initialize responsive testing utilities
 */
export function initializeResponsiveTesting(): void {
  if (process.env.NODE_ENV === 'development') {
    monitorResponsivePerformance();
    
    // Add viewport testing helper to window for debugging
    (window as any).__responsiveDebug = {
      VIEWPORT_TESTS,
      validateTouchTargets,
      detectLayoutShifts,
    };
  }
}
