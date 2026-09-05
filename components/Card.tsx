import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export interface CardProps {
	title: string
	description: string
	icon?: Media | string | null
	buttonLabel: string
	buttonLink?: string | null
}

const buttonClassName =
	'inline-flex self-start rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold italic uppercase tracking-wide text-white no-underline transition-opacity hover:opacity-90'

function CardButton({ label, href }: { label: string; href: string }) {
	const isInternal = href.startsWith('/') && !href.startsWith('//')

	if (isInternal) {
		return (
			<Link href={href} className={buttonClassName}>
				{label}
			</Link>
		)
	}

	return (
		<a href={href} className={buttonClassName} target="_blank" rel="noopener noreferrer">
			{label}
		</a>
	)
}

function resolveMedia(icon?: Media | string | null): Media | null {
	if (!icon || typeof icon === 'string') {
		return null
	}

	return icon.url ? icon : null
}

export default function Card({ title, description, icon, buttonLabel, buttonLink }: CardProps) {
	const media = resolveMedia(icon)

	return (
		<article className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
			{media?.url ? (
				<div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center">
					<Image
						src={media.url}
						alt={media.alt}
						width={64}
						height={64}
						className="h-16 w-16 object-contain"
					/>
				</div>
			) : null}

			<h3 className="font-display text-lg font-black italic tracking-tight text-darkgray sm:text-xl">
				{title}
			</h3>

			<p className="mt-3 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
				{description}
			</p>

			<div className="mt-auto pt-6">
				{buttonLink ? (
					<CardButton label={buttonLabel} href={buttonLink} />
				) : null}
			</div>
		</article>
	)
}
