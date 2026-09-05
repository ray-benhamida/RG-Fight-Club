import Image from 'next/image'
import Link from 'next/link'
import type { HomeQuickLink } from '@/lib/homepage'

interface HomeQuickLinksProps {
	items: HomeQuickLink[]
}

function ArrowIcon() {
	return (
		<svg
			className="mt-2 h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1.5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2.5}
				d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
			/>
		</svg>
	)
}

export default function HomeQuickLinks({ items }: HomeQuickLinksProps) {
	if (items.length === 0) return null

	return (
		<nav
			aria-label="Raccourcis"
			className="home-quick-links px-4 sm:px-6 lg:px-8"
			data-aos="fade-up"
		>
			<div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
				<div className="home-quick-links-track flex snap-x snap-mandatory divide-x divide-gray-200 overflow-x-auto md:snap-none md:overflow-visible">
					{items.map((item) => (
						<Link
							key={item.id}
							href={item.href}
							className="group flex min-w-[17.5rem] flex-1 snap-start items-center gap-3 px-6 py-8 no-underline md:min-w-0 md:px-4 lg:gap-4 lg:px-8"
						>
							{item.icon?.url ? (
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light lg:h-16 lg:w-16">
									<Image
										src={item.icon.url}
										alt={item.icon.alt || item.title}
										width={32}
										height={32}
										className="h-7 w-7 object-contain lg:h-8 lg:w-8"
									/>
								</div>
							) : (
								<div
									className="h-14 w-14 shrink-0 rounded-full bg-primary-light lg:h-16 lg:w-16"
									aria-hidden
								/>
							)}

							<div className="min-w-0 flex-1">
								<p className="font-display text-sm font-bold uppercase tracking-wide text-darkgray sm:text-base">
									{item.title}
								</p>
								{item.description ? (
									<p className="mt-0.5 text-sm leading-snug text-gray-800">
										{item.description}
									</p>
								) : null}
								<ArrowIcon />
							</div>
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
