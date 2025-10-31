'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Youtube, Facebook, Heart, Mail, ExternalLink } from 'lucide-react';
import { SOCIAL_MEDIA_LINKS } from '@/lib/content-utils';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      role="contentinfo"
      aria-label="Site footer with links and information"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold"
                aria-hidden="true"
              >
                ॐ
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Bhagavad Gita
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Discover the timeless wisdom of the Bhagavad Gita with complete Sanskrit verses, 
              English translations, and spiritual commentary.
            </p>
            <div className="flex space-x-4" role="group" aria-label="Social media links">
              <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700" asChild>
                <a 
                  href={SOCIAL_MEDIA_LINKS.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit our YouTube channel (opens in new tab)"
                >
                  <Youtube className="h-4 w-4 mr-1" aria-hidden="true" />
                  YouTube
                  <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />
                </a>
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700" asChild>
                <a 
                  href={SOCIAL_MEDIA_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram (opens in new tab)"
                >
                  <Instagram className="h-4 w-4 mr-1" aria-hidden="true" />
                  Instagram
                  <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-orange-300 transition-colors flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chapters" className="text-slate-300 hover:text-orange-300 transition-colors flex items-center">
                  All Chapters
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-orange-300 transition-colors flex items-center">
                  About
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-slate-300 hover:text-orange-300 transition-colors flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-orange-300 transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Chapters */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Popular Chapters</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/chapters/1" className="text-slate-300 hover:text-orange-300 transition-colors">
                  Chapter 1: Arjuna's Dilemma
                </Link>
              </li>
              <li>
                <Link href="/chapters/2" className="text-slate-300 hover:text-orange-300 transition-colors">
                  Chapter 2: Sankhya Yoga
                </Link>
              </li>
              <li>
                <Link href="/chapters/11" className="text-slate-300 hover:text-orange-300 transition-colors">
                  Chapter 11: Universal Form
                </Link>
              </li>
              <li>
                <Link href="/chapters/18" className="text-slate-300 hover:text-orange-300 transition-colors">
                  Chapter 18: Liberation
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href={SOCIAL_MEDIA_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-300 hover:text-red-400 transition-colors"
              >
                <Youtube className="h-5 w-5 mr-2" />
                Gita Gyanaam
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" />
                @gita_gyanaam
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5 mr-2" />
                Gita Gyanaam
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-300 mb-2">Support Our Mission</p>
              <Link
                href="/donate"
                className="inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors text-sm"
              >
                <Heart className="h-4 w-4 mr-1" />
                Make a Donation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} Bhagavad Gita Wisdom. Spreading timeless spiritual knowledge.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-orange-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-orange-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-orange-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-xs italic">
              "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।" - You have the right to perform your actions, but never to the fruits of action.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
