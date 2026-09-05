import type { DocumentLabel } from '@/payload-types'

type LabelColor = NonNullable<DocumentLabel['couleur']>

const LABEL_COLOR_CLASSES: Record<LabelColor, string> = {
	orange: 'border-orange-500 text-orange-600',
	bleu: 'border-session-blue text-session-blue',
	vert: 'border-green-500 text-green-600',
	rouge: 'border-red-500 text-red-600',
	violet: 'border-purple-500 text-purple-600',
}

export function getDocumentLabelColorClass(couleur: LabelColor): string {
	return LABEL_COLOR_CLASSES[couleur]
}
