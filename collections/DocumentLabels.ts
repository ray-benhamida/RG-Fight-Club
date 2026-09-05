import type { CollectionConfig } from 'payload'

export const DocumentLabels: CollectionConfig = {
	slug: 'document-labels',
	labels: {
		singular: 'Label de document',
		plural: 'Labels de document',
	},
	admin: {
		hidden: true,
		useAsTitle: 'nom',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'nom',
			type: 'text',
			label: 'Nom',
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
				{ label: 'Bleu', value: 'bleu' },
				{ label: 'Vert', value: 'vert' },
				{ label: 'Rouge', value: 'rouge' },
				{ label: 'Violet', value: 'violet' },
			],
		},
	],
}
