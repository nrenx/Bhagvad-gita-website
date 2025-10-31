import type { MetadataRoute } from 'next'
import { CHAPTERS_INFO } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagavad-gita.org'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/chapters`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Add chapter pages
  const chapterPages = CHAPTERS_INFO.flatMap((chapter) => {
    const chapterUrl = {
      url: `${baseUrl}/chapters/${chapter.number}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }

    // Add verse pages
    const versePages = Array.from({ length: chapter.verseCount }, (_, i) => ({
      url: `${baseUrl}/chapters/${chapter.number}/verse/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [chapterUrl, ...versePages]
  })

  return [...staticPages, ...chapterPages]
}
