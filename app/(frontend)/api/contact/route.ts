import { NextResponse } from 'next/server'
import { getContactEmailProvider, resolveContactRecipient } from '@/lib/contactEmailConfig'
import { getGlobalSettings } from '@/lib/globalSettings'
import { parseContactPayload, sendContactEmail } from '@/lib/sendContactEmail'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	if (getContactEmailProvider() !== 'resend') {
		return NextResponse.json(
			{ error: 'Ce mode d’envoi n’utilise pas cette route.' },
			{ status: 400 },
		)
	}

	let body: unknown

	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
	}

	const parsed = parseContactPayload(body)

	if (!parsed.ok) {
		return NextResponse.json({ error: parsed.error }, { status: 400 })
	}

	// Honeypot : répondre succès sans envoyer
	if (parsed.isHoneypot) {
		return NextResponse.json({ ok: true })
	}

	const settings = await getGlobalSettings()
	const result = await sendContactEmail({
		to: resolveContactRecipient(settings.email),
		data: parsed.data,
	})

	if (!result.ok) {
		return NextResponse.json({ error: result.error }, { status: 502 })
	}

	return NextResponse.json({ ok: true })
}
