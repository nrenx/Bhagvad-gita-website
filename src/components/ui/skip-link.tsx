'use client';

import React from 'react';

/**
 * Skip link component for keyboard users
 * Provides accessible navigation bypass for screen readers
 */
interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  const handleFocus = () => {
    // Announce to screen reader without using external function
    console.log('Skip to main content link focused');
  };

  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:underline"
      onFocus={handleFocus}
    >
      {children}
    </a>
  );
};

export default SkipLink;
