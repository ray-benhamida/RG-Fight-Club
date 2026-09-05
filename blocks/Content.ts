import type { Block } from 'payload'
import { navLinkFields } from '../fields/navLink'

export const ContentBlock: Block = {
	slug: 'content',
	labels: {
		singular: 'Contenu',
		plural: 'Contenus',
	},
	fields: [
		{
			name: 'content',
			type: 'richText',
			label: 'Contenu',
			required: true,
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
