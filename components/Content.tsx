import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Button from '@/components/Button'
import { resolveNavLinkHref, type NavLinkInput } from '@/lib/navLink'

interface ContentProps {
	content: SerializedEditorState
	enableButton?: boolean | null
	buttonLabel?: string | null
	buttonLink?: NavLinkInput | null
	sectionClassName?: string
}

export default function Content({
	content,
	enableButton,
	buttonLabel,
	buttonLink,
	sectionClassName = 'bg-white py-12',
}: ContentProps) {
	const buttonHref = enableButton ? resolveNavLinkHref(buttonLink) : null
	const resolvedLabel = buttonLabel?.trim() || null
	const showButton = Boolean(buttonHref && resolvedLabel)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="rich-text">
					<RichText data={content} />
				</div>
				{showButton && resolvedLabel && buttonHref ? (
					<div className="mt-8">
						<Button label={resolvedLabel} href={buttonHref} />
					</div>
				) : null}
			</div>
		</section>
	)
}
