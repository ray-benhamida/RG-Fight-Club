'use client'

import { useState, type FormEvent } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import type { ContactEmailClientConfig } from '@/lib/contactEmailConfig'
import { siteConfig } from '@/lib/site-config'

interface ContactFormFieldsProps {
	submitLabel: string
	emailConfig: ContactEmailClientConfig
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const inputClassName =
	'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-darkgray placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

const labelClassName = 'mb-2 block text-sm font-bold text-darkgray'

const SUCCESS_MESSAGE = 'Votre message a bien été envoyé. Nous vous répondrons rapidement.'
const ERROR_MESSAGE = 'Une erreur est survenue. Veuillez réessayer dans un instant.'

function buildMessageBody(fields: {
	lastName: string
	firstName: string
	email: string
	subject: string
	message: string
}): string {
	return [
		`Nouveau message depuis le formulaire de contact ${siteConfig.name}`,
		'',
		`Nom : ${fields.lastName}`,
		`Prénom : ${fields.firstName}`,
		`E-mail : ${fields.email}`,
		`Sujet : ${fields.subject}`,
		'',
		'Message :',
		fields.message,
	].join('\n')
}

export default function ContactFormFields({ submitLabel, emailConfig }: ContactFormFieldsProps) {
	const [status, setStatus] = useState<FormStatus>('idle')
	const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGE)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const form = event.currentTarget
		const formData = new FormData(form)

		const lastName = String(formData.get('lastName') ?? '').trim()
		const firstName = String(formData.get('firstName') ?? '').trim()
		const email = String(formData.get('email') ?? '').trim()
		const subject = String(formData.get('subject') ?? '').trim()
		const message = String(formData.get('message') ?? '').trim()
		const fax = String(formData.get('fax') ?? '').trim()

		// Honeypot rempli → faux succès sans appel réseau
		if (fax) {
			setStatus('success')
			form.reset()
			return
		}

		setStatus('loading')
		setErrorMessage(ERROR_MESSAGE)

		try {
			let ok = false
			let apiError: string | undefined

			if (emailConfig.provider === 'web3forms') {
				const response = await fetch(WEB3FORMS_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						access_key: emailConfig.accessKey,
						from_name: siteConfig.name,
						subject: `[Contact] ${subject}`,
						email,
						name: `${firstName} ${lastName}`,
						Nom: lastName,
						Prénom: firstName,
						Sujet: subject,
						message: buildMessageBody({ lastName, firstName, email, subject, message }),
						botcheck: false,
					}),
				})

				const data = (await response.json().catch(() => null)) as {
					success?: boolean
					message?: string
				} | null

				ok = response.ok && data?.success === true
				if (!ok) {
					apiError = data?.message?.trim() || ERROR_MESSAGE
					console.error('[contact] Web3Forms error:', data ?? response.status)
				}
			} else {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ lastName, firstName, email, subject, message, fax }),
				})

				const data = (await response.json().catch(() => null)) as { error?: string } | null
				ok = response.ok
				if (!ok) {
					apiError = data?.error?.trim() || ERROR_MESSAGE
				}
			}

			if (!ok) {
				setErrorMessage(apiError || ERROR_MESSAGE)
				setStatus('error')
				return
			}

			form.reset()
			setStatus('success')
		} catch {
			setErrorMessage(ERROR_MESSAGE)
			setStatus('error')
		}
	}

	const isLoading = status === 'loading'

	return (
		<form className="relative mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
			{/* Honeypot — nom volontairement non autofillable */}
			<input
				name="fax"
				type="text"
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0"
			/>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="contact-last-name" className={labelClassName}>
						Nom
					</label>
					<input
						id="contact-last-name"
						name="lastName"
						type="text"
						autoComplete="family-name"
						placeholder="Votre nom"
						required
						disabled={isLoading}
						className={inputClassName}
					/>
				</div>
				<div>
					<label htmlFor="contact-first-name" className={labelClassName}>
						Prénom
					</label>
					<input
						id="contact-first-name"
						name="firstName"
						type="text"
						autoComplete="given-name"
						placeholder="Votre prénom"
						required
						disabled={isLoading}
						className={inputClassName}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="contact-email" className={labelClassName}>
					E-mail
				</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					placeholder="exemple@email.com"
					required
					disabled={isLoading}
					className={inputClassName}
				/>
			</div>

			<div>
				<label htmlFor="contact-subject" className={labelClassName}>
					Sujet
				</label>
				<input
					id="contact-subject"
					name="subject"
					type="text"
					placeholder="Sujet de votre message"
					required
					disabled={isLoading}
					className={inputClassName}
				/>
			</div>

			<div>
				<label htmlFor="contact-message" className={labelClassName}>
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					rows={6}
					placeholder="Votre message..."
					required
					disabled={isLoading}
					className={`${inputClassName} resize-y`}
				/>
			</div>

			{status === 'success' ? (
				<p
					role="status"
					className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
				>
					{SUCCESS_MESSAGE}
				</p>
			) : null}

			{status === 'error' ? (
				<p
					role="alert"
					className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
				>
					{errorMessage}
				</p>
			) : null}

			<button
				type="submit"
				disabled={isLoading}
				className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-bold italic uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
			>
				<span>{isLoading ? 'Envoi…' : submitLabel}</span>
				{!isLoading ? <FaPaperPlane className="text-base" aria-hidden /> : null}
			</button>
		</form>
	)
}
