export type ContactInstagram = {
	url: string
	label: string
	handle: string
}

export type ContactInfo = {
	instagram: ContactInstagram
	email: string
}

export function getInstagramHandle(url: string, label: string): string {
	try {
		const pathname = new URL(url).pathname.replace(/\/+$/, '')
		const username = pathname.split('/').filter(Boolean)[0]

		if (username) {
			return `@${username.replace(/^@/, '').toUpperCase()}`
		}
	} catch {
		// URL invalide : on retombe sur le libellé
	}

	const trimmed = label.trim()
	if (!trimmed) return ''

	return trimmed.startsWith('@') ? trimmed : `@${trimmed}`
}

export function buildContactInfo(
	instagram: { url: string; label: string },
	email: string,
): ContactInfo {
	return {
		instagram: {
			url: instagram.url,
			label: instagram.label,
			handle: getInstagramHandle(instagram.url, instagram.label),
		},
		email,
	}
}
