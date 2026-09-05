type TitleType = 'titre' | 'sous-titre'

interface TitleProps {
	title: string
	type?: TitleType | null
	eyebrow?: string | null
	description?: string | null
	sectionClassName?: string
}

const titleStyles: Record<TitleType, string> = {
	titre: 'font-page-header-title text-3xl uppercase leading-none tracking-tight text-foreground sm:text-4xl md:text-5xl',
	'sous-titre':
		'font-page-header-title text-xl uppercase leading-none tracking-tight text-foreground sm:text-2xl md:text-3xl',
}

export default function Title({
	title,
	type = 'titre',
	eyebrow,
	description,
	sectionClassName = 'bg-white py-12',
}: TitleProps) {
	const variant = type ?? 'titre'
	const isTitre = variant === 'titre'
	const eyebrowText = isTitre ? eyebrow?.trim() : undefined
	const descriptionText = isTitre ? description?.trim() : undefined
	const Heading = isTitre ? 'h2' : 'h3'

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				{eyebrowText ? (
					<div className="mb-2 flex items-center gap-3">
						<span className="font-display font-page-header-title text-ms font-bold uppercase tracking-widest text-primary">
							{eyebrowText}
						</span>
						<div className="h-px w-8 shrink-0 bg-primary" aria-hidden />
					</div>
				) : null}

				<Heading className={titleStyles[variant]}>{title}</Heading>

				{descriptionText ? (
					<p className="mt-4 text-base leading-relaxed text-gray-600">
						{descriptionText}
					</p>
				) : null}
			</div>
		</section>
	)
}
