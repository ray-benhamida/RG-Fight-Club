import Image from 'next/image'
import Button from '@/components/Button'
import { resolveNavLinkHref, type NavLinkInput } from '@/lib/navLink'
import type { Media } from '@/payload-types'

type ButtonColor = 'primary' | 'white'

interface CommunicationBannerButton {
	id?: string | null
	color: ButtonColor
	label: string
	link?: NavLinkInput | null
}

interface CommunicationBannerProps {
	icon?: Media | string | null
	title: string
	description?: string | null
	buttons?: CommunicationBannerButton[] | null
	sectionClassName?: string
}

function resolveMedia(icon?: Media | string | null): Media | null {
	if (!icon || typeof icon === 'string') {
		return null
	}

	return icon.url ? icon : null
}

export default function CommunicationBanner({
	icon,
	title,
	description,
	buttons,
	sectionClassName = 'bg-white py-12',
}: CommunicationBannerProps) {
	const media = resolveMedia(icon)
	const descriptionText = description?.trim() || null
	const resolvedButtons = (buttons ?? [])
		.map((button) => {
			const href = resolveNavLinkHref(button.link)
			const label = button.label?.trim() || null
			if (!href || !label) return null
			return {
				id: button.id,
				label,
				href,
				variant: button.color === 'white' ? ('outline' as const) : ('primary' as const),
			}
		})
		.filter((button): button is NonNullable<typeof button> => button !== null)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="communication-banner relative overflow-hidden rounded-2xl border border-primary bg-white px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
					<div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
						{media?.url ? (
							<div className="flex shrink-0 items-center justify-center self-start md:self-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary p-3 sm:h-20 sm:w-20">
									<Image
										src={media.url}
										alt={media.alt}
										width={56}
										height={56}
										className="h-full w-full object-contain"
									/>
								</div>
							</div>
						) : null}

						<div className="min-w-0 flex-1">
							<h2 className="font-page-header-title text-2xl uppercase leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
								{title}
							</h2>
							{descriptionText ? (
								<p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
									{descriptionText}
								</p>
							) : null}
						</div>

						{resolvedButtons.length > 0 ? (
							<div className="flex shrink-0 flex-col gap-3 self-stretch md:self-center">
								{resolvedButtons.map((button, index) => (
									<Button
										key={button.id ?? index}
										label={button.label}
										href={button.href}
										variant={button.variant}
										className="justify-center text-center"
									/>
								))}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</section>
	)
}
