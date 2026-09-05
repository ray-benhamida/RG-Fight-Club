import { Resend } from 'resend'
import { siteConfig } from '@/lib/site-config'
import { getContactEmailProvider } from '@/lib/contactEmailConfig'

export type ContactFormPayload = {
	lastName: string
	firstName: string
	email: string
	subject: string
	message: string
	/** Honeypot — ne pas utiliser le nom `website` (autofill navigateur). */
	fax?: string
}

export type ContactMessage = Omit<ContactFormPayload, 'fax'>

export type ContactSendResult = { ok: true } | { ok: false; error: string }

const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_SUBJECT = 200
const MAX_MESSAGE = 5000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimField(value: unknown): string {
	return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

export type ContactValidationResult =
	| { ok: true; data: ContactMessage; isHoneypot: false }
	| { ok: true; data: null; isHoneypot: true }
	| { ok: false; error: string }

export function parseContactPayload(body: unknown): ContactValidationResult {
	if (!body || typeof body !== 'object') {
		return { ok: false, error: 'Requête invalide.' }
	}

	const raw = body as Record<string, unknown>
	const fax = trimField(raw.fax)

	if (fax) {
		return { ok: true, data: null, isHoneypot: true }
	}

	const lastName = trimField(raw.lastName)
	const firstName = trimField(raw.firstName)
	const email = trimField(raw.email)
	const subject = trimField(raw.subject)
	const message = trimField(raw.message)

	if (!lastName || !firstName || !email || !subject || !message) {
		return { ok: false, error: 'Tous les champs sont obligatoires.' }
	}

	if (
		lastName.length > MAX_NAME ||
		firstName.length > MAX_NAME ||
		email.length > MAX_EMAIL ||
		subject.length > MAX_SUBJECT ||
		message.length > MAX_MESSAGE
	) {
		return { ok: false, error: 'Un ou plusieurs champs sont trop longs.' }
	}

	if (!EMAIL_RE.test(email)) {
		return { ok: false, error: 'Adresse e-mail invalide.' }
	}

	return {
		ok: true,
		isHoneypot: false,
		data: { lastName, firstName, email, subject, message },
	}
}

function buildEmailContent(data: ContactMessage) {
	const { lastName, firstName, email, subject, message } = data
	const fullName = `${firstName} ${lastName}`

	const text = [
		`Nouveau message depuis le formulaire de contact ${siteConfig.name}`,
		'',
		`Nom : ${lastName}`,
		`Prénom : ${firstName}`,
		`E-mail : ${email}`,
		`Sujet : ${subject}`,
		'',
		'Message :',
		message,
	].join('\n')

	const html = `
		<div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
			<p>Nouveau message depuis le formulaire de contact <strong>${escapeHtml(siteConfig.name)}</strong>.</p>
			<table style="border-collapse: collapse; margin: 16px 0;">
				<tr>
					<td style="padding: 4px 12px 4px 0; font-weight: 600;">Nom</td>
					<td style="padding: 4px 0;">${escapeHtml(lastName)}</td>
				</tr>
				<tr>
					<td style="padding: 4px 12px 4px 0; font-weight: 600;">Prénom</td>
					<td style="padding: 4px 0;">${escapeHtml(firstName)}</td>
				</tr>
				<tr>
					<td style="padding: 4px 12px 4px 0; font-weight: 600;">E-mail</td>
					<td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
				</tr>
				<tr>
					<td style="padding: 4px 12px 4px 0; font-weight: 600;">Sujet</td>
					<td style="padding: 4px 0;">${escapeHtml(subject)}</td>
				</tr>
			</table>
			<p style="font-weight: 600; margin-bottom: 8px;">Message</p>
			<p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
			<hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e5e5;" />
			<p style="font-size: 12px; color: #666;">Répondez directement à cet e-mail pour contacter ${escapeHtml(fullName)}.</p>
		</div>
	`.trim()

	return { text, html, replyName: fullName }
}

async function sendViaResend(options: {
	to: string
	data: ContactMessage
}): Promise<ContactSendResult> {
	const apiKey = process.env.RESEND_API_KEY?.trim()
	const fromEmail = process.env.RESEND_FROM_EMAIL?.trim()

	if (!apiKey || !fromEmail) {
		console.error('[contact] RESEND_API_KEY or RESEND_FROM_EMAIL is missing')
		return { ok: false, error: 'Le service d’envoi n’est pas configuré.' }
	}

	const { text, html, replyName } = buildEmailContent(options.data)
	const resend = new Resend(apiKey)

	const { error } = await resend.emails.send({
		from: `${siteConfig.name} <${fromEmail}>`,
		to: [options.to],
		replyTo: `${replyName} <${options.data.email}>`,
		subject: `[Contact] ${options.data.subject}`,
		text,
		html,
	})

	if (error) {
		console.error('[contact] Resend error:', error)
		return { ok: false, error: 'Impossible d’envoyer le message. Réessayez plus tard.' }
	}

	return { ok: true }
}

/**
 * Envoi serveur — Resend uniquement.
 * Web3Forms free doit être appelé depuis le navigateur (voir ContactFormFields).
 */
export async function sendContactEmail(options: {
	to: string
	data: ContactMessage
}): Promise<ContactSendResult> {
	const provider = getContactEmailProvider()

	if (provider !== 'resend') {
		console.error('[contact] Server send called while provider is not resend')
		return {
			ok: false,
			error: 'Configuration d’envoi invalide. Réessayez plus tard.',
		}
	}

	return sendViaResend(options)
}

export { buildEmailContent }
