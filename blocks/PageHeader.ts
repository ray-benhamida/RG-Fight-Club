import type { Block } from 'payload'

export const PageHeaderBlock: Block = {
	slug: 'pageHeader',
	labels: {
		singular: 'Page Header',
		plural: 'Page Headers',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: 'Titre',
			required: true,
		},
		{
			name: 'subtitle',
			type: 'textarea',
			label: 'Sous-titre',
		},
	],
}
