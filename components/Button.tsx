import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline'

export interface ButtonProps {
	label: string
	href: string
	variant?: ButtonVariant
	icon?: ReactNode
	className?: string
}

const primaryClassName =
	'inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold italic uppercase tracking-wide text-white no-underline transition-opacity hover:opacity-90'

const outlineClassName =
	'gradient-border-button text-sm font-bold italic uppercase tracking-wide no-underline'

export default function Button({
	label,
	href,
	variant = 'primary',
	icon,
	className = '',
}: ButtonProps) {
	const isInternal = href.startsWith('/') && !href.startsWith('//')
	const classNames = `${variant === 'primary' ? primaryClassName : outlineClassName} ${className}`.trim()

	const content = (
		<>
			<span>{label}</span>
			{icon}
		</>
	)

	if (isInternal) {
		return (
			<Link href={href} className={classNames}>
				{content}
			</Link>
		)
	}

	if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
		return (
			<a href={href} className={classNames}>
				{content}
			</a>
		)
	}

	return (
		<a href={href} className={classNames} target="_blank" rel="noopener noreferrer">
			{content}
		</a>
	)
}
