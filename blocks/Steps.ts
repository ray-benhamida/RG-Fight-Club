import type { Block } from 'payload'
import { navLinkFields } from '../fields/navLink'

export const StepsBlock: Block = {
	slug: 'steps',
	labels: {
		singular: 'Steps',
		plural: 'Steps',
	},
	fields: [
		{
			name: 'items',
			type: 'array',
			label: 'Étapes',
			labels: {
				singular: 'Étape',
				plural: 'Étapes',
			},
			required: true,
			minRows: 2,
			maxRows: 4,
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
			],
		},
		{
			name: 'enableButton',
			type: 'checkbox',
			label: 'Afficher un bouton',
			defaultValue: false,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: 'Label du bouton',
			admin: {
				condition: (_, siblingData) => Boolean(siblingData?.enableButton),
			},
		},
		{
			name: 'buttonLink',
			type: 'group',
			label: 'Lien du bouton',
			admin: {
				condition: (_, siblingData) => Boolean(siblingData?.enableButton),
			},
			fields: navLinkFields,
		},
	],
}
