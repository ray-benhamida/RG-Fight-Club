import type { ReactNode } from 'react'
import { FaEnvelope, FaInstagram } from 'react-icons/fa'
import Button from '@/components/Button'
import ContactFormFields from '@/components/ContactFormFields'
import type { ContactInfo } from '@/lib/contact'
import type { ContactEmailClientConfig } from '@/lib/contactEmailConfig'

interface ContactCardCopy {
	title?: string | null
	description?: string | null
	buttonLabel?: string | null
}

export interface ContactFormProps {
	eyebrow?: string | null
	title: string
	description?: string | null
	instagramCard?: ContactCardCopy | null
	emailCard?: ContactCardCopy | null
	formTitle?: string | null
	submitLabel?: string | null
	contact: ContactInfo
	emailConfig: ContactEmailClientConfig
	sectionClassName?: string
}

const DEFAULT_EYEBROW = 'Nous sommes là pour vous'
const DEFAULT_DESCRIPTION =
	'Une question, une demande d’information ou envie de rejoindre le club ? Notre équipe vous répond rapidement.'
const DEFAULT_INSTAGRAM_CARD = {
	title: 'Instagram',
	description:
		'Suivez-nous au quotidien sur Instagram pour découvrir nos actus, entraînements et événements.',
	buttonLabel: 'Nous écrire sur Instagram',
}
const DEFAULT_EMAIL_CARD = {
	title: 'E-mail',
	description:
		'Envoyez-nous un e-mail pour toute demande d’information, d’inscription ou partenariat.',
	buttonLabel: 'Envoyer un e-mail',
}
const DEFAULT_FORM_TITLE = 'Formulaire de contact'
const DEFAULT_SUBMIT_LABEL = 'Envoyer le message'

const cardShadow = 'shadow-[0_4px_15px_rgba(0,0,0,0.05)]'

function stripTrailingChevron(label: string): string {
	return label.replace(/\s*>+\s*$/g, '').trim()
}

function resolveCopy(copy: ContactCardCopy | null | undefined, fallback: typeof DEFAULT_INSTAGRAM_CARD) {
	return {
		title: copy?.title?.trim() || fallback.title,
		description: copy?.description?.trim() || fallback.description,
		buttonLabel: stripTrailingChevron(copy?.buttonLabel?.trim() || fallback.buttonLabel),
	}
}

function ArrowIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4"
			aria-hidden
		>
			<path
				d="M5 12h14M13 6l6 6-6 6"
				stroke="currentColor"
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function ContactCard({
	icon,
	title,
	highlight,
	description,
	buttonLabel,
	href,
}: {
	icon: ReactNode
	title: string
	highlight: string
	description: string
	buttonLabel: string
	href: string
}) {
	return (
		<article className={`flex gap-5 rounded-2xl bg-white p-6 sm:p-8 ${cardShadow}`}>
			<div className="flex shrink-0 items-center">
				<div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white sm:h-16 sm:w-16">
					{icon}
				</div>
			</div>
			<div className="w-px shrink-0 bg-primary" aria-hidden />
			<div className="flex min-w-0 flex-1 flex-col">
				<h3 className="font-page-header-title text-xl uppercase tracking-tight text-foreground sm:text-2xl">
					{title}
				</h3>
				<p className="mt-1 font-bold text-primary">{highlight}</p>
				<p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
				<div className="mt-5">
					<Button
						label={buttonLabel}
						href={href}
						variant="outline"
						className="self-start"
						icon={<ArrowIcon />}
					/>
				</div>
			</div>
		</article>
	)
}

export default function ContactForm({
	eyebrow,
	title,
	description,
	instagramCard,
	emailCard,
	formTitle,
	submitLabel,
	contact,
	emailConfig,
	sectionClassName = 'bg-[#F7F7F7] py-12',
}: ContactFormProps) {
	const instagramCopy = resolveCopy(instagramCard, DEFAULT_INSTAGRAM_CARD)
	const emailCopy = resolveCopy(emailCard, DEFAULT_EMAIL_CARD)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
						<span className="h-px w-8 bg-primary" aria-hidden />
						{eyebrow?.trim() || DEFAULT_EYEBROW}
						<span className="h-px w-8 bg-primary" aria-hidden />
					</p>
					<h2 className="font-page-header-title mt-4 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
						{title}
					</h2>
					<p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
						{description?.trim() || DEFAULT_DESCRIPTION}
					</p>
				</div>

				<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
					<div className="flex flex-col gap-6 lg:col-span-2">
						<ContactCard
							icon={<FaInstagram className="text-2xl" aria-hidden />}
							title={instagramCopy.title}
							highlight={contact.instagram.handle}
							description={instagramCopy.description}
							buttonLabel={instagramCopy.buttonLabel}
							href={contact.instagram.url}
						/>
						<ContactCard
							icon={<FaEnvelope className="text-2xl" aria-hidden />}
							title={emailCopy.title}
							highlight={contact.email}
							description={emailCopy.description}
							buttonLabel={emailCopy.buttonLabel}
							href={`mailto:${contact.email}`}
						/>
					</div>

					<div className={`rounded-2xl bg-white p-6 sm:p-8 lg:col-span-3 lg:p-10 ${cardShadow}`}>
						<h3 className="font-page-header-title text-2xl uppercase tracking-tight text-foreground sm:text-3xl">
							{formTitle?.trim() || DEFAULT_FORM_TITLE}
						</h3>
						<div className="mt-3 h-1 w-14 bg-primary" aria-hidden />
						<ContactFormFields
							submitLabel={submitLabel?.trim() || DEFAULT_SUBMIT_LABEL}
							emailConfig={emailConfig}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
