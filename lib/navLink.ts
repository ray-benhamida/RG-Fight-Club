import type { Page } from '@/payload-types'

export type NavLinkInput = {
	linkType?: ('home' | 'section' | 'page' | 'custom') | null
	sectionId?: string | null
	page?: (string | null) | Page
	url?: string | null
}

function resolvePageSlug(page: string | Page | null | undefined): string | null {
	if (!page) return null
	if (typeof page === 'string') return null
	return page.slug ?? null
}

export function resolveNavLinkHref(
	link: NavLinkInput | string | null | undefined,
): string | null {
	if (!link) return null

	if (typeof link === 'string') {
		return link.trim() || null
	}

	if (!link.linkType) return null

	if (link.linkType === 'home') {
		return '/'
	}

	if (link.linkType === 'section' && link.sectionId) {
		return `/#${link.sectionId}`
	}

	if (link.linkType === 'page') {
		const slug = resolvePageSlug(link.page)
		return slug ? `/page/${slug}` : null
	}

	if (link.linkType === 'custom' && link.url) {
		return link.url.trim()
	}

	return null
}

export function resolveNavLinkLabel(
	link: NavLinkInput & { label?: string | null },
	fallbackLabel?: string | null,
): string | null {
	if (link.label?.trim()) {
		return link.label.trim()
	}

	return fallbackLabel?.trim() || null
}
