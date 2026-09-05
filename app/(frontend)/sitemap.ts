import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getSiteUrl } from '@/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const payload = await getPayloadClient()
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
  })

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${base}/page/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...pageEntries,
  ]
}
