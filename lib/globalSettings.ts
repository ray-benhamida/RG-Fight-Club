import { getPayloadClient } from '@/lib/payload'
import { siteConfig } from '@/lib/site-config'
import type { GlobalSetting, Page } from '@/payload-types'

export type GlobalCta = {
	label: string
	url: string
}

export type GlobalSettingsData = {
	planning: GlobalCta
	registration: GlobalCta
	courses: GlobalCta
	email: string
}

const DEFAULT_PLANNING: GlobalCta = {
	label: 'Voir le Planning',
	url: '',
}

const DEFAULT_REGISTRATION: GlobalCta = {
	label: "S'inscrire",
	url: '',
}

const DEFAULT_COURSES: GlobalCta = {
	label: 'Voir les cours',
	url: '/page/cours',
}

export const DEFAULT_CONTACT_EMAIL = siteConfig.contact.email ?? 'contact@rg-fight-club.fr'

type CtaGroup =
	| GlobalSetting['planning']
	| GlobalSetting['registration']
	| GlobalSetting['courses']
	| undefined

function resolvePageSlug(page: string | Page | null | undefined): string | null {
	if (!page) return null
	if (typeof page === 'string') return null
	return page.slug ?? null
}

function resolveCtaUrl(group: CtaGroup): string {
	if (!group) return ''

	if (group.linkType === 'page') {
		const slug = resolvePageSlug(group.page)
		return slug ? `/page/${slug}` : ''
	}

	if (group.linkType === 'custom') {
		return group.url?.trim() || ''
	}

	// Rétrocompatibilité : anciennes données avec uniquement un champ url
	return group.url?.trim() || ''
}

function mapCta(group: CtaGroup, fallback: GlobalCta): GlobalCta {
	return {
		label: group?.label?.trim() || fallback.label,
		url: resolveCtaUrl(group) || fallback.url,
	}
}

export async function getGlobalSettings(): Promise<GlobalSettingsData> {
	try {
		const payload = await getPayloadClient()
		const settings = await payload.findGlobal({
			slug: 'global-settings',
			depth: 1,
		})

		return {
			planning: mapCta(settings?.planning, DEFAULT_PLANNING),
			registration: mapCta(settings?.registration, DEFAULT_REGISTRATION),
			courses: mapCta(settings?.courses, DEFAULT_COURSES),
			email: settings?.contact?.email?.trim() || DEFAULT_CONTACT_EMAIL,
		}
	} catch {
		return {
			planning: DEFAULT_PLANNING,
			registration: DEFAULT_REGISTRATION,
			courses: DEFAULT_COURSES,
			email: DEFAULT_CONTACT_EMAIL,
		}
	}
}
