import type { SessionTypeColor } from '@/lib/sessionTypeColors'

export const WEEKDAYS = [
	{ value: 'lundi', label: 'Lundi', shortLabel: 'Lun' },
	{ value: 'mardi', label: 'Mardi', shortLabel: 'Mar' },
	{ value: 'mercredi', label: 'Mercredi', shortLabel: 'Mer' },
	{ value: 'jeudi', label: 'Jeudi', shortLabel: 'Jeu' },
	{ value: 'vendredi', label: 'Vendredi', shortLabel: 'Ven' },
	{ value: 'samedi', label: 'Samedi', shortLabel: 'Sam' },
	{ value: 'dimanche', label: 'Dimanche', shortLabel: 'Dim' },
] as const

export type WeekdayValue = (typeof WEEKDAYS)[number]['value']

export const WEEKDAY_ORDER: WeekdayValue[] = WEEKDAYS.map((day) => day.value)

export function formatTimeFrench(time: string): string {
	const [hours, minutes] = time.split(':')
	return `${hours}h${minutes}`
}

export function formatTimeRange(start: string, end: string): string {
	return `${formatTimeFrench(start)} - ${formatTimeFrench(end)}`
}

export function parseTimeToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 60 + minutes
}

const JS_DAY_TO_WEEKDAY: WeekdayValue[] = [
	'dimanche',
	'lundi',
	'mardi',
	'mercredi',
	'jeudi',
	'vendredi',
	'samedi',
]

export function getTodayWeekday(): WeekdayValue {
	return JS_DAY_TO_WEEKDAY[new Date().getDay()]
}

export function getWeekdayLabel(value: WeekdayValue): string {
	return WEEKDAYS.find((day) => day.value === value)?.label ?? value
}

export function getWeekdayShortLabel(value: WeekdayValue): string {
	return WEEKDAYS.find((day) => day.value === value)?.shortLabel ?? value
}

export interface PlanningCourse {
	id: string
	titre: string
	sousTitre?: string | null
	description: string
	heureDebut: string
	heureFin: string
	jour: WeekdayValue
	sessionType: {
		id: string
		label: string
		couleur: SessionTypeColor
	}
	room: {
		nom: string
		label: string
		adresse: string
		mapsUrl: string
	}
}

export interface PlanningSessionTypeFilter {
	id: string
	label: string
	couleur: SessionTypeColor
}
