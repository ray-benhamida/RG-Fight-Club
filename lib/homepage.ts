import { getPayloadClient } from '@/lib/payload'
import type { Media, Page } from '@/payload-types'

export type HomeQuickLink = {
	id: string
	title: string
	description: string
	href: string
	icon: Media | null
}

function resolvePageHref(page: string | Page | null | undefined): string | null {
	if (!page || typeof page === 'string') return null
	return page.slug ? `/page/${page.slug}` : null
}

function resolveIcon(icon: string | Media | null | undefined): Media | null {
	if (!icon || typeof icon === 'string' || !icon.url) return null
	return icon
}

export async function getHomepageQuickLinks(): Promise<HomeQuickLink[]> {
	try {
		const payload = await getPayloadClient()
		const homepage = await payload.findGlobal({
			slug: 'homepage',
			depth: 1,
		})

		const items = homepage?.quickLinks
		if (!items?.length) return []

		return items
			.map((item, index) => {
				const title = item.title?.trim()
				const href = resolvePageHref(item.page)
				if (!title || !href) return null

				return {
					id: item.id ?? `quick-link-${index}`,
					title,
					description: item.description?.trim() || '',
					href,
					icon: resolveIcon(item.icon),
				}
			})
			.filter((item): item is HomeQuickLink => item !== null)
	} catch {
		return []
	}
}
