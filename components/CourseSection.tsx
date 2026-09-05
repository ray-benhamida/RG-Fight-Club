import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FaFemale, FaUsers } from 'react-icons/fa'
import type { Media } from '@/payload-types'

type CourseTarget = 'women' | 'mixed'
type ImagePosition = 'left' | 'right'
type CourseDescription = SerializedEditorState | string

interface CourseSectionVariant {
	id?: string | null
	title: string
	subtitle?: string | null
	icon: Media | string
	description: CourseDescription
}

export interface CourseSectionProps {
	title: string
	subtitle: string
	description: CourseDescription
	target: CourseTarget
	icon: Media | string
	image: Media | string
	imagePosition: ImagePosition
	variants?: CourseSectionVariant[] | null
	sectionClassName?: string
}

function resolveMedia(media?: Media | string | null): Media | null {
	if (!media || typeof media === 'string') {
		return null
	}

	return media.url ? media : null
}

function CourseDescriptionContent({
	description,
	className,
}: {
	description: CourseDescription
	className?: string
}) {
	if (typeof description === 'string') {
		return <p className={className}>{description}</p>
	}

	return (
		<div className={`rich-text ${className ?? ''}`.trim()}>
			<RichText data={description} />
		</div>
	)
}

function TargetBadge({ target }: { target: CourseTarget }) {
	const isWomen = target === 'women'

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
				isWomen ? 'bg-primary-light text-primary' : 'bg-blue-50 text-darkgray'
			}`}
		>
			{isWomen ? (
				<FaFemale className="h-4 w-4 shrink-0" aria-hidden />
			) : (
				<FaUsers className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
			)}
			<span>{isWomen ? 'Femmes uniquement' : 'Mixte'}</span>
		</div>
	)
}

function VariantCard({ variant }: { variant: CourseSectionVariant }) {
	const icon = resolveMedia(variant.icon)

	return (
		<article className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
			<div className="flex items-start gap-3">
				{icon?.url ? (
					<div className="flex h-10 w-10 shrink-0 items-center justify-center">
						<Image
							src={icon.url}
							alt={icon.alt}
							width={40}
							height={40}
							className="h-10 w-10 object-contain"
						/>
					</div>
				) : null}

				<div className="min-w-0 flex-1">
					<h4 className="font-page-header-title text-lg uppercase tracking-tight text-foreground sm:text-xl md:text-2xl">
						{variant.title}
					</h4>
					{variant.subtitle ? (
						<p className="mt-1 text-sm font-bold uppercase italic text-primary sm:text-base">
							{variant.subtitle}
						</p>
					) : null}
				</div>
			</div>

			<CourseDescriptionContent
				description={variant.description}
				className="mt-3 text-sm leading-relaxed text-gray-600"
			/>
		</article>
	)
}

export default function CourseSection({
	title,
	subtitle,
	description,
	target,
	icon,
	image,
	imagePosition,
	variants,
	sectionClassName = 'bg-white py-20',
}: CourseSectionProps) {
	const iconMedia = resolveMedia(icon)
	const imageMedia = resolveMedia(image)
	const hasVariants = Boolean(variants?.length)
	const imageOnLeft = imagePosition === 'left'

	const imageColumn = imageMedia?.url ? (
		<div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl md:aspect-auto md:min-h-[28rem]">
			<Image
				src={imageMedia.url}
				alt={imageMedia.alt}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 50vw"
			/>
		</div>
	) : null

	const contentColumn = (
		<div className="flex flex-col justify-center">
			{iconMedia?.url ? (
				<div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 sm:gap-x-8">
					<div className="row-start-1 self-center">
						<div className="flex h-20 w-20 shrink-0 items-center justify-center">
							<Image
								src={iconMedia.url}
								alt={iconMedia.alt}
								width={80}
								height={80}
								className="h-20 w-20 object-contain"
							/>
						</div>
					</div>

					<div className="col-start-2 row-start-1 min-w-0">
						<h2 className="font-page-header-title text-3xl uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
							{title}
						</h2>
						<p className="mt-1 font-page-header-title text-lg uppercase text-primary sm:text-xl md:text-2xl">
							{subtitle}
						</p>
					</div>

					<CourseDescriptionContent
						description={description}
						className="col-span-2 row-start-2 text-base leading-relaxed text-gray-700 sm:col-span-1 sm:col-start-2"
					/>

					<div className="col-span-2 row-start-3 sm:col-span-1 sm:col-start-2">
						<TargetBadge target={target} />
					</div>

					{hasVariants ? (
						<div className="col-span-2 mt-2 grid grid-cols-1 gap-4 sm:col-span-1 sm:col-start-2">
							{variants!.map((variant, index) => (
								<VariantCard key={variant.id ?? index} variant={variant} />
							))}
						</div>
					) : null}
				</div>
			) : (
				<>
					<h2 className="font-page-header-title text-3xl uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
						{title}
					</h2>
					<p className="mt-1 font-page-header-title text-lg uppercase text-primary sm:text-xl md:text-2xl">
						{subtitle}
					</p>
					<CourseDescriptionContent
						description={description}
						className="mt-6 text-base leading-relaxed text-gray-700"
					/>
					<div className="mt-6">
						<TargetBadge target={target} />
					</div>
					{hasVariants ? (
						<div
							className={`mt-2 grid grid-cols-1 gap-4`}
						>
							{variants!.map((variant, index) => (
								<VariantCard key={variant.id ?? index} variant={variant} />
							))}
						</div>
					) : null}
				</>
			)}
		</div>
	)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
					<div className={imageOnLeft ? undefined : 'md:order-2'}>{imageColumn}</div>
					<div className={imageOnLeft ? undefined : 'md:order-1'}>{contentColumn}</div>
				</div>
			</div>
		</section>
	)
}
