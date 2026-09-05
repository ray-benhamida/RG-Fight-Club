'use client'

import { useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FaPlus } from 'react-icons/fa'
import Button from '@/components/Button'
import { resolveNavLinkHref, type NavLinkInput } from '@/lib/navLink'

interface FAQItem {
	id?: string | null
	question: string
	answer: SerializedEditorState
	enableButton?: boolean | null
	buttonLabel?: string | null
	buttonLink?: NavLinkInput | string | null
}

interface FAQProps {
	items: FAQItem[]
	sectionClassName?: string
}

export default function FAQ({ items, sectionClassName = 'bg-white py-12' }: FAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<section className={sectionClassName}>
			<div className="container mx-auto px-8">
				<div className="border-t border-gray-200">
					{items.map((item, index) => {
						const isOpen = openIndex === index
						const buttonHref = item.enableButton
							? resolveNavLinkHref(item.buttonLink)
							: null
						const buttonLabel = item.buttonLabel?.trim() || null
						const showButton = Boolean(buttonHref && buttonLabel)

						return (
							<div key={item.id ?? index} className="border-b border-gray-200">
								<button
									type="button"
									onClick={() => setOpenIndex(isOpen ? null : index)}
									className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
									aria-expanded={isOpen}
								>
									<span className="font-display text-lg font-bold text-darkgray">
										{item.question}
									</span>
									<FaPlus
										className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
										aria-hidden
									/>
								</button>
								<div
									className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
								>
									<div className="min-h-0 overflow-hidden">
										<div className={isOpen ? 'pb-6' : undefined}>
											<div className="rich-text text-gray-700">
												<RichText data={item.answer} />
											</div>
											{showButton && buttonLabel && buttonHref ? (
												<Button
													label={buttonLabel}
													href={buttonHref}
													className="mt-4"
												/>
											) : null}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
