import type { Block } from 'payload'

export const TitleBlock: Block = {
	slug: 'title',
	labels: {
		singular: 'Titre',
		plural: 'Titres',
	},
	fields: [
		{
			name: 'type',
			type: 'select',
			label: 'Type',
			required: true,
			defaultValue: 'titre',
			options: [
				{ label: 'Titre', value: 'titre' },
				{ label: 'Sous-titre', value: 'sous-titre' },
			],
		},
		{
			name: 'eyebrow',
			type: 'text',
			label: 'Surtitre',
			admin: {
				condition: (_, siblingData) => siblingData?.type !== 'sous-titre',
			},
		},
		{
			name: 'title',
			type: 'text',
			label: 'Titre',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			admin: {
				condition: (_, siblingData) => siblingData?.type !== 'sous-titre',
			},
		},
	],
}
