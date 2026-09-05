import { getPayloadClient } from '@/lib/payload'
import { resolveNavLinkHref } from '@/lib/navLink'
import { siteConfig } from '@/lib/site-config'
import type { Header } from '@/payload-types'

export type HeaderNavLink = {
	label: string
	href: string
	sectionId?: string
}

export type HeaderNavData = {
	navLinks: HeaderNavLink[]
	instagram: {
		url: string
		label: string
	}
}

const DEFAULT_NAV_LINKS: HeaderNavLink[] = [
	{ label: 'Présentation', href: '/#presentation', sectionId: 'presentation' },
	{ label: 'Prestations', href: '/#projects', sectionId: 'projects' },
	{ label: 'Témoignages', href: '/#testimonials', sectionId: 'testimonials' },
]

const DEFAULT_INSTAGRAM = {
	url: siteConfig.instagramUrl,
	label: 'RG_FIGHT_CLUB',
}

function mapNavLinks(header: Header | null | undefined): HeaderNavLink[] {
	const links = header?.navLinks

	if (!links?.length) {
		return DEFAULT_NAV_LINKS
	}

	return links
		.map((link) => {
			const href = resolveNavLinkHref(link)
			if (!link.label || !href) return null

			return {
				label: link.label,
				href,
				...(link.linkType === 'section' && link.sectionId
					? { sectionId: link.sectionId }
					: {}),
			}
		})
		.filter((link): link is HeaderNavLink => link !== null)
}

export async function getHeaderNav(): Promise<HeaderNavData> {
	try {
		const payload = await getPayloadClient()
		const header = await payload.findGlobal({
			slug: 'header',
			depth: 1,
		})

		const navLinks = mapNavLinks(header)
		const instagram = header?.instagram

		return {
			navLinks: navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS,
			instagram: {
				url: instagram?.url?.trim() || DEFAULT_INSTAGRAM.url,
				label: instagram?.label?.trim() || DEFAULT_INSTAGRAM.label,
			},
		}
	} catch {
		return {
			navLinks: DEFAULT_NAV_LINKS,
			instagram: DEFAULT_INSTAGRAM,
		}
	}
}
