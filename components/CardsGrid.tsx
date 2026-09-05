import Card from '@/components/Card'
import { resolveNavLinkHref } from '@/lib/navLink'
import type { Media, Page } from '@/payload-types'

interface CardsGridItem {
	id?: string | null
	title: string
	description: string
	icon?: Media | string | null
	buttonLabel: string
	buttonLink?: {
		linkType?: ('home' | 'section' | 'page' | 'custom') | null
		sectionId?: string | null
		page?: (string | null) | Page
		url?: string | null
	} | null
}

interface CardsGridProps {
	items: CardsGridItem[]
	sectionClassName?: string
}

export default function CardsGrid({ items, sectionClassName = 'bg-white py-12' }: CardsGridProps) {
	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item, index) => {
						const buttonHref = resolveNavLinkHref(item.buttonLink)

						return (
							<Card
								key={item.id ?? index}
								title={item.title}
								description={item.description}
								icon={item.icon}
								buttonLabel={item.buttonLabel}
								buttonLink={buttonHref}
							/>
						)
					})}
				</div>
			</div>
		</section>
	)
}
