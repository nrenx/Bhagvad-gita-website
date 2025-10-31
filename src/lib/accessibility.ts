'use client';

/**
 * Accessibility utilities and keyboard navigation support
 * Implements WCAG 2.1 AA compliance requirements
 */

import { useEffect, useCallback, useRef } from 'react';

// Keyboard navigation utilities
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const;

/**
 * Hook for managing keyboard navigation in menus and lists
 */
export function useKeyboardNavigation<T extends HTMLElement>({
  isOpen,
  onClose,
  itemSelector = '[role="menuitem"], button, a',
  loop = true,
}: {
  isOpen: boolean;
  onClose?: () => void;
  itemSelector?: string;
  loop?: boolean;
}) {
  const containerRef = useRef<T>(null);
  const currentIndexRef = useRef(-1);

  const getFocusableItems = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll(itemSelector)
    ) as HTMLElement[];
  }, [itemSelector]);

  const focusItem = useCallback((index: number) => {
    const items = getFocusableItems();
    if (items[index]) {
      items[index].focus();
      currentIndexRef.current = index;
    }
  }, [getFocusableItems]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    const items = getFocusableItems();
    if (items.length === 0) return;

    const currentIndex = currentIndexRef.current;

    switch (event.key) {
      case KEYBOARD_KEYS.ESCAPE:
        if (onClose) {
          onClose();
          event.preventDefault();
        }
        break;

      case KEYBOARD_KEYS.ARROW_DOWN:
        event.preventDefault();
        const nextIndex = loop 
          ? (currentIndex + 1) % items.length 
          : Math.min(currentIndex + 1, items.length - 1);
        focusItem(nextIndex);
        break;

      case KEYBOARD_KEYS.ARROW_UP:
        event.preventDefault();
        const prevIndex = loop
          ? currentIndex <= 0 ? items.length - 1 : currentIndex - 1
          : Math.max(currentIndex - 1, 0);
        focusItem(prevIndex);
        break;

      case KEYBOARD_KEYS.HOME:
        event.preventDefault();
        focusItem(0);
        break;

      case KEYBOARD_KEYS.END:
        event.preventDefault();
        focusItem(items.length - 1);
        break;

      case KEYBOARD_KEYS.ENTER:
      case KEYBOARD_KEYS.SPACE:
        if (currentIndex >= 0 && items[currentIndex]) {
          event.preventDefault();
          items[currentIndex].click();
        }
        break;
    }
  }, [isOpen, onClose, loop, getFocusableItems, focusItem]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first item when menu opens
      setTimeout(() => focusItem(0), 0);
    } else {
      currentIndexRef.current = -1;
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, focusItem]);

  return { containerRef, focusItem };
}

/**
 * Hook for managing focus trap in modals and overlays
 */
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const element = elementRef.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== KEYBOARD_KEYS.TAB) return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstFocusable?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return elementRef;
}

/**
 * Screen reader announcement utility
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Utility for generating ARIA labels for dynamic content
 */
export function generateAriaLabel({
  action,
  item,
  position,
  total,
  state,
}: {
  action?: string;
  item?: string;
  position?: number;
  total?: number;
  state?: 'active' | 'selected' | 'current';
}): string {
  const parts: string[] = [];

  if (action) parts.push(action);
  if (item) parts.push(item);
  if (position && total) parts.push(`${position} of ${total}`);
  if (state) parts.push(state);

  return parts.join(', ');
}

/**
 * Accessible heading hierarchy validation
 */
export function validateHeadingHierarchy(): void {
  if (process.env.NODE_ENV === 'development') {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    let hasH1 = false;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level === 1) {
        if (hasH1) {
          console.warn(`Multiple h1 elements found. Only one h1 should exist per page.`);
        }
        hasH1 = true;
      }

      if (index > 0 && level > previousLevel + 1) {
        console.warn(
          `Heading hierarchy skip detected: ${heading.tagName} follows h${previousLevel}. Consider using h${previousLevel + 1} instead.`,
          heading
        );
      }

      previousLevel = level;
    });

    if (!hasH1) {
      console.warn('No h1 element found. Each page should have exactly one h1 element.');
    }
  }
}

/**
 * Color contrast validation utility
 */
export function validateColorContrast(): void {
  if (process.env.NODE_ENV === 'development') {
    // This is a simplified version - in production, you'd use a more comprehensive library
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a');
    
    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;
      
      // Basic check for transparent backgrounds or very light text
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        return; // Skip elements with transparent backgrounds
      }
      
      // Log elements that might have contrast issues
      if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
        console.warn('Potential color contrast issue detected:', element);
      }
    });
  }
}

/**
 * Initialize accessibility features
 */
export function initializeAccessibility(): void {
  if (typeof window !== 'undefined') {
    // Add skip link to page
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Validate heading hierarchy on page load
    window.addEventListener('load', validateHeadingHierarchy);
    
    // Validate color contrast in development
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('load', validateColorContrast);
    }
  }
}
