import type { CollectionConfig } from 'payload'

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

const WEEKDAY_OPTIONS = [
	{ label: 'Lundi', value: 'lundi' },
	{ label: 'Mardi', value: 'mardi' },
	{ label: 'Mercredi', value: 'mercredi' },
	{ label: 'Jeudi', value: 'jeudi' },
	{ label: 'Vendredi', value: 'vendredi' },
	{ label: 'Samedi', value: 'samedi' },
	{ label: 'Dimanche', value: 'dimanche' },
]

function parseTimeToMinutes(value: string): number {
	const [hours, minutes] = value.split(':').map(Number)
	return hours * 60 + minutes
}

function validateTime(value: string | null | undefined): true | string {
	if (!value) return 'Ce champ est requis'
	if (!TIME_REGEX.test(value)) return 'Format attendu : HH:mm (ex. 09:00)'
	return true
}

export const Courses: CollectionConfig = {
	slug: 'courses',
	labels: {
		singular: 'Cours',
		plural: 'Cours',
	},
	admin: {
		useAsTitle: 'titre',
		defaultColumns: ['titre', 'type', 'jour', 'heureDebut', 'salle', 'actif'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'titre',
			type: 'text',
			label: 'Titre',
			required: true,
		},
		{
			name: 'sousTitre',
			type: 'text',
			label: 'Sous-titre',
		},
		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			required: true,
		},
		{
			name: 'type',
			type: 'relationship',
			label: 'Type de séance',
			relationTo: 'session-types',
			required: true,
			admin: {
				allowCreate: true,
			},
		},
		{
			name: 'heureDebut',
			type: 'text',
			label: 'Heure de début',
			required: true,
			admin: {
				description: 'Format HH:mm (ex. 09:00)',
			},
			validate: validateTime,
		},
		{
			name: 'heureFin',
			type: 'text',
			label: 'Heure de fin',
			required: true,
			admin: {
				description: 'Format HH:mm (ex. 10:00)',
			},
			validate: (
				value: string | null | undefined,
				{ siblingData }: { siblingData?: Record<string, unknown> },
			) => {
				const timeValidation = validateTime(value)
				if (timeValidation !== true) return timeValidation

				const start = siblingData?.heureDebut
				if (typeof start === 'string' && TIME_REGEX.test(start) && typeof value === 'string') {
					if (parseTimeToMinutes(value) <= parseTimeToMinutes(start)) {
						return "L'heure de fin doit être après l'heure de début"
					}
				}

				return true
			},
		},
		{
			name: 'jour',
			type: 'select',
			label: 'Jour de la semaine',
			required: true,
			options: WEEKDAY_OPTIONS,
		},
		{
			name: 'salle',
			type: 'relationship',
			label: 'Salle',
			relationTo: 'rooms',
			required: true,
			admin: {
				allowCreate: true,
			},
		},
		{
			name: 'actif',
			type: 'checkbox',
			label: 'Actif',
			defaultValue: true,
			admin: {
				description: 'Décochez pour retirer le cours du planning',
			},
		},
	],
}
