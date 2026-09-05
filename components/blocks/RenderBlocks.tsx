import CourseSection from '@/components/CourseSection'
import CardsGrid from '@/components/CardsGrid'
import CommunicationBanner from '@/components/CommunicationBanner'
import ContactForm from '@/components/ContactForm'
import Content from '@/components/Content'
import DocumentsGrid from '@/components/DocumentsGrid'
import FAQ from '@/components/FAQ'
import PageHeader from '@/components/PageHeader'
import Planning from '@/components/Planning'
import Steps from '@/components/Steps'
import Title from '@/components/Title'
import VideosGrid from '@/components/VideosGrid'
import { getFlowBlockSectionClass } from '@/lib/blockSpacing'
import { buildContactInfo } from '@/lib/contact'
import { getContactEmailClientConfig } from '@/lib/contactEmailConfig'
import { getGlobalSettings } from '@/lib/globalSettings'
import { getHeaderNav } from '@/lib/header'
import type { Page } from '@/payload-types'

type PageLayoutBlock = NonNullable<Page['layout']>[number]

interface RenderBlocksProps {
	blocks: PageLayoutBlock[]
}

export default async function RenderBlocks({ blocks }: RenderBlocksProps) {
	const hasPlanning = blocks.some((block) => block.blockType === 'planning')
	const hasContactForm = blocks.some((block) => block.blockType === 'contactForm')
	const [globalSettings, headerNav] = await Promise.all([
		hasPlanning || hasContactForm ? getGlobalSettings() : Promise.resolve(null),
		hasContactForm ? getHeaderNav() : Promise.resolve(null),
	])
	const contact = globalSettings && headerNav
		? buildContactInfo(headerNav.instagram, globalSettings.email)
		: null
	const emailConfig = hasContactForm ? getContactEmailClientConfig() : null

	return (
		<>
			{blocks.map((block, index) => {
				switch (block.blockType) {
					case 'pageHeader':
						return (
							<PageHeader
								key={block.id ?? index}
								title={block.title}
								subtitle={block.subtitle ?? undefined}
							/>
						)
					case 'title':
						return (
							<Title
								key={block.id ?? index}
								title={block.title}
								type={block.type}
								eyebrow={block.eyebrow}
								description={block.description}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'content':
						return (
							<Content
								key={block.id ?? index}
								content={block.content}
								enableButton={block.enableButton}
								buttonLabel={block.buttonLabel}
								buttonLink={block.buttonLink}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'faq':
						return (
							<FAQ
								key={block.id ?? index}
								items={block.items}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'cardsGrid':
						return (
							<CardsGrid
								key={block.id ?? index}
								items={block.items}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'communicationBanner':
						return (
							<CommunicationBanner
								key={block.id ?? index}
								icon={block.icon}
								title={block.title}
								description={block.description}
								buttons={block.buttons}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'contactForm':
						return contact && emailConfig ? (
							<ContactForm
								key={block.id ?? index}
								eyebrow={block.eyebrow}
								title={block.title}
								description={block.description}
								instagramCard={block.instagramCard}
								emailCard={block.emailCard}
								formTitle={block.formTitle}
								submitLabel={block.submitLabel}
								contact={contact}
								emailConfig={emailConfig}
								sectionClassName={getFlowBlockSectionClass(
									block.blockType,
									index,
									blocks,
									'bg-[#F7F7F7]',
								)}
							/>
						) : null
					case 'courseSection':
						return (
							<CourseSection
								key={block.id ?? index}
								title={block.title}
								subtitle={block.subtitle}
								description={block.description}
								target={block.target}
								icon={block.icon}
								image={block.image}
								imagePosition={block.imagePosition}
								variants={block.variants}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'videosGrid':
						return (
							<VideosGrid
								key={block.id ?? index}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'documentsGrid':
						return (
							<DocumentsGrid
								key={block.id ?? index}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					case 'planning':
						return globalSettings ? (
							<Planning
								key={block.id ?? index}
								globalSettings={globalSettings}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						) : null
					case 'steps':
						return (
							<Steps
								key={block.id ?? index}
								items={block.items}
								enableButton={block.enableButton}
								buttonLabel={block.buttonLabel}
								buttonLink={block.buttonLink}
								sectionClassName={getFlowBlockSectionClass(block.blockType, index, blocks)}
							/>
						)
					default:
						return null
				}
			})}
		</>
	)
}
