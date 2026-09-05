import Image from 'next/image'
import { Fragment } from 'react'
import Button from '@/components/Button'
import { resolveNavLinkHref } from '@/lib/navLink'
import type { Media, Page } from '@/payload-types'

interface StepsItem {
	id?: string | null
	title: string
	description: string
	icon?: Media | string | null
}

interface StepsButtonLink {
	linkType?: ('home' | 'section' | 'page' | 'custom') | null
	sectionId?: string | null
	page?: (string | null) | Page
	url?: string | null
}

interface StepsProps {
	items: StepsItem[]
	enableButton?: boolean | null
	buttonLabel?: string | null
	buttonLink?: StepsButtonLink | null
	sectionClassName?: string
}

function formatStepNumber(index: number): string {
	return String(index + 1).padStart(2, '0')
}

function resolveMedia(icon?: Media | string | null): Media | null {
	if (!icon || typeof icon === 'string') {
		return null
	}

	return icon.url ? icon : null
}

function stripTrailingChevron(label: string): string {
	return label.replace(/\s*>+\s*$/g, '').trim()
}

function ArrowIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
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

function StepCard({ item, index }: { item: StepsItem; index: number }) {
	const number = formatStepNumber(index)
	const media = resolveMedia(item.icon)

	return (
		<article
			className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-7 lg:row-span-5 lg:grid lg:grid-rows-subgrid"
			aria-label={`Étape ${number} : ${item.title}`}
		>
			<span
				className="relative inline-block self-start font-page-header-title text-6xl leading-none text-primary sm:text-7xl lg:text-[4.75rem]"
				aria-hidden
			>
				<span
					className="block"
					style={{
						WebkitMaskImage: "url('/images/steps-brush-mask.png')",
						maskImage: "url('/images/steps-brush-mask.png')",
						WebkitMaskSize: '140%',
						maskSize: '140%',
						WebkitMaskPosition: 'center',
						maskPosition: 'center',
						WebkitMaskRepeat: 'no-repeat',
						maskRepeat: 'no-repeat',
					}}
				>
					{number}
				</span>
				<span className="pointer-events-none absolute inset-0 opacity-75">{number}</span>
			</span>

			<div className="mt-3 h-1 w-12 self-start bg-primary lg:mt-0" aria-hidden />

			<h3 className="mt-3 font-page-header-title text-2xl uppercase leading-tight tracking-tight text-darkgray sm:text-3xl lg:mt-0">
				{item.title}
			</h3>

			<div className="my-5 flex min-h-14 justify-start sm:min-h-16 lg:my-0">
				{media?.url ? (
					<Image
						src={media.url}
						alt={media.alt}
						width={72}
						height={72}
						className="h-14 w-14 object-contain sm:h-16 sm:w-16"
					/>
				) : null}
			</div>

			<p className="mt-auto whitespace-pre-wrap text-sm leading-relaxed text-gray-700 lg:mt-0">
				{item.description}
			</p>
		</article>
	)
}

const stepsGridCols: Record<number, string> = {
	2: 'lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
	3: 'lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]',
	4: 'lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]',
}

export default function Steps({
	items,
	enableButton,
	buttonLabel,
	buttonLink,
	sectionClassName = 'bg-white py-12',
}: StepsProps) {
	const buttonHref = enableButton ? resolveNavLinkHref(buttonLink) : null
	const resolvedLabel = buttonLabel ? stripTrailingChevron(buttonLabel) : null
	const showButton = Boolean(buttonHref && resolvedLabel)

	const gridCols = stepsGridCols[items.length] ?? stepsGridCols[4]

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div
					className={`flex flex-col items-stretch lg:grid lg:grid-rows-[auto_auto_auto_auto_1fr] lg:items-stretch lg:gap-x-3 lg:gap-y-3 ${gridCols}`}
				>
					{items.map((item, index) => (
						<Fragment key={item.id ?? index}>
							<StepCard item={item} index={index} />
							{index < items.length - 1 ? (
								<div
									className="flex shrink-0 items-center justify-center py-3 lg:row-span-5 lg:px-1 lg:py-0"
									aria-hidden
								>
									<ArrowIcon className="h-5 w-5 rotate-90 text-primary lg:rotate-0" />
								</div>
							) : null}
						</Fragment>
					))}
				</div>

				{showButton && resolvedLabel && buttonHref ? (
					<div className="mt-10 flex justify-center">
						<Button
							label={resolvedLabel}
							href={buttonHref}
							icon={<ArrowIcon className="h-4 w-4" />}
						/>
					</div>
				) : null}
			</div>
		</section>
	)
}
