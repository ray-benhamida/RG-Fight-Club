import type { Page } from '@/payload-types'

type PageLayoutBlock = NonNullable<Page['layout']>[number]

const FLOW_BLOCKS = new Set([
	'title',
	'content',
	'faq',
	'cardsGrid',
	'communicationBanner',
	'contactForm',
	'courseSection',
	'videosGrid',
	'documentsGrid',
	'planning',
	'steps',
])

function isFlowBlock(blockType: string | undefined): boolean {
	return blockType !== undefined && FLOW_BLOCKS.has(blockType)
}

/**
 * Espacement vertical des blocks de contenu (tous sauf Page Header).
 * py-20 sur chaque section empile ~160px entre deux blocks — trop pour du contenu lié.
 * Convention CMS : py-12 (48px) aux bords de page, py-8 (32px) entre blocks consécutifs.
 */
export function getFlowBlockSectionClass(
	blockType: string,
	index: number,
	blocks: PageLayoutBlock[],
	bgClass = 'bg-white',
): string {
	if (!FLOW_BLOCKS.has(blockType)) {
		return 'py-20'
	}

	const prev = blocks[index - 1]
	const next = blocks[index + 1]
	const stackedWithPrev = isFlowBlock(prev?.blockType)
	const stackedWithNext = isFlowBlock(next?.blockType)

	const pt = stackedWithPrev ? 'pt-8' : 'pt-12'
	const pb = stackedWithNext ? 'pb-8' : 'pb-12'

	return `${bgClass} ${pt} ${pb}`
}
