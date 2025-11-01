'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Menu, X, Home, Book, Heart, Phone } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            aria-label="Return to homepage - Bhagavad Gita"
          >
            <div 
              className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              aria-hidden="true"
            >
              ॐ
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Bhagavad Gita
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex" role="navigation" aria-label="Primary navigation">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  href="/"
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActivePath('/') ? 'bg-slate-100/50' : 'bg-white'
                  }`}
                  aria-label="Navigate to home page"
                  aria-current={isActivePath('/') ? 'page' : undefined}
                >
                  <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link 
                  href="/chapters"
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActivePath('/chapters') ? 'bg-slate-100/50' : 'bg-white'
                  }`}
                  aria-label="Navigate to chapters overview"
                  aria-current={isActivePath('/chapters') ? 'page' : undefined}
                >
                  <Book className="mr-2 h-4 w-4" aria-hidden="true" />
                  Chapters
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  href="/about"
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActivePath('/about') ? 'bg-slate-100/50' : 'bg-white'
                  }`}
                  aria-label="Navigate to about page"
                  aria-current={isActivePath('/about') ? 'page' : undefined}
                >
                  About
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  href="/donate"
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActivePath('/donate') ? 'bg-slate-100/50' : 'bg-white'
                  }`}
                  aria-label="Navigate to donation page"
                  aria-current={isActivePath('/donate') ? 'page' : undefined}
                >
                  <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
                  Donate
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  href="/contact"
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActivePath('/contact') ? 'bg-slate-100/50' : 'bg-white'
                  }`}
                  aria-label="Navigate to contact page"
                  aria-current={isActivePath('/contact') ? 'page' : undefined}
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-navigation"
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActivePath('/') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Navigate to home page"
                aria-current={isActivePath('/') ? 'page' : undefined}
              >
                <Home className="inline mr-2 h-4 w-4" aria-hidden="true" />
                Home
              </Link>
              <Link
                href="/chapters"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActivePath('/chapters') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Navigate to chapters overview"
                aria-current={isActivePath('/chapters') ? 'page' : undefined}
              >
                <Book className="inline mr-2 h-4 w-4" aria-hidden="true" />
                Chapters
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActivePath('/about') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Navigate to about page"
                aria-current={isActivePath('/about') ? 'page' : undefined}
              >
                About
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActivePath('/donate') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Navigate to donation page"
                aria-current={isActivePath('/donate') ? 'page' : undefined}
              >
                <Heart className="inline mr-2 h-4 w-4" aria-hidden="true" />
                Donate
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActivePath('/contact') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Navigate to contact page"
                aria-current={isActivePath('/contact') ? 'page' : undefined}
              >
                <Phone className="inline mr-2 h-4 w-4" aria-hidden="true" />
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
