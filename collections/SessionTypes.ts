import type { CollectionConfig } from 'payload'

export const SessionTypes: CollectionConfig = {
	slug: 'session-types',
	labels: {
		singular: 'Type de séance',
		plural: 'Types de séance',
	},
	admin: {
		hidden: true,
		useAsTitle: 'label',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'label',
			type: 'text',
			label: 'Label',
			required: true,
			unique: true,
		},
		{
			name: 'couleur',
			type: 'select',
			label: 'Couleur',
			required: true,
			options: [
				{ label: 'Orange', value: 'orange' },
				{ label: 'Noir', value: 'noir' },
				{ label: 'Bleu', value: 'bleu' },
			],
		},
	],
}
