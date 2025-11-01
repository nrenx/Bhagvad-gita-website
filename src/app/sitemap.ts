import type { MetadataRoute } from 'next'
import { CHAPTERS_INFO } from '@/lib/data'

export const dynamic = 'force-static'
export const revalidate = 0

const LAST_MODIFIED = new Date('2024-01-01T00:00:00Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagavad-gita.org'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/chapters`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Add chapter pages
  const chapterPages = CHAPTERS_INFO.flatMap((chapter) => {
    const chapterUrl = {
      url: `${baseUrl}/chapters/${chapter.number}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }

    // Add verse pages
    const versePages = Array.from({ length: chapter.verseCount }, (_, i) => ({
      url: `${baseUrl}/chapters/${chapter.number}/verse/${i + 1}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [chapterUrl, ...versePages]
  })

  return [...staticPages, ...chapterPages]
}
