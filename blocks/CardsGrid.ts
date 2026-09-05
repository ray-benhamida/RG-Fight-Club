import type { Block } from 'payload'
import { navLinkFields } from '../fields/navLink'

export const CardsGridBlock: Block = {
	slug: 'cardsGrid',
	labels: {
		singular: 'Cards Grid',
		plural: 'Cards Grids',
	},
	fields: [
		{
			name: 'items',
			type: 'array',
			label: 'Cartes',
			required: true,
			minRows: 1,
			fields: [
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
					required: true,
				},
				{
					name: 'icon',
					type: 'upload',
					relationTo: 'media',
					label: 'Icône',
				},
				{
					name: 'buttonLabel',
					type: 'text',
					label: 'Label du bouton',
					required: true,
				},
				{
					name: 'buttonLink',
					type: 'group',
					label: 'Lien du bouton',
					fields: navLinkFields,
				},
			],
		},
	],
}
