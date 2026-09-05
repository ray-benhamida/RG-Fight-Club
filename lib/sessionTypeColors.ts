export type SessionTypeColor = 'orange' | 'noir' | 'bleu'

/** @deprecated Ancienne valeur CMS — conservée pour les données existantes */
type LegacySessionTypeColor = 'beige'

export const SESSION_TYPE_COLORS: Record<
	SessionTypeColor,
	{
		accent: string
		text: string
		dot: string
		accentBorder: string
	}
> = {
	orange: {
		accent: 'bg-primary',
		text: 'text-primary',
		dot: 'bg-primary',
		accentBorder: 'border-l-primary',
	},
	noir: {
		accent: 'bg-foreground',
		text: 'text-foreground',
		dot: 'bg-foreground',
		accentBorder: 'border-l-foreground',
	},
	bleu: {
		accent: 'bg-session-blue',
		text: 'text-session-blue',
		dot: 'bg-session-blue',
		accentBorder: 'border-l-session-blue',
	},
}

function normalizeSessionTypeColor(couleur: SessionTypeColor | LegacySessionTypeColor): SessionTypeColor {
	if (couleur === 'beige') return 'bleu'
	return couleur
}

export function getSessionTypeColorClasses(couleur: SessionTypeColor | LegacySessionTypeColor) {
	return SESSION_TYPE_COLORS[normalizeSessionTypeColor(couleur)]
}
