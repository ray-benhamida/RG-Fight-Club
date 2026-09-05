export type ContactEmailProvider = 'web3forms' | 'resend'

export type ContactEmailClientConfig =
	| {
			provider: 'web3forms'
			accessKey: string
	  }
	| {
			provider: 'resend'
	  }

export function getContactEmailProvider(): ContactEmailProvider {
	const raw = process.env.CONTACT_EMAIL_PROVIDER?.trim().toLowerCase()
	if (raw === 'resend') return 'resend'
	return 'web3forms'
}

/** Override de test : si défini, prioritaire sur l’e-mail CMS (Resend uniquement). */
export function resolveContactRecipient(cmsEmail: string): string {
	return process.env.CONTACT_TO_EMAIL?.trim() || cmsEmail
}

/**
 * Config exposée au formulaire client.
 * Web3Forms free exige un envoi depuis le navigateur (pas depuis /api).
 */
export function getContactEmailClientConfig(): ContactEmailClientConfig | null {
	const provider = getContactEmailProvider()

	if (provider === 'resend') {
		return { provider: 'resend' }
	}

	const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim()
	if (!accessKey) return null

	return { provider: 'web3forms', accessKey }
}
