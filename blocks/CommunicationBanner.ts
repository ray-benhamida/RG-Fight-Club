import type { Block } from 'payload'
import { navLinkFields } from '../fields/navLink'

export const CommunicationBannerBlock: Block = {
	slug: 'communicationBanner',
	labels: {
		singular: 'Communication Banner',
		plural: 'Communication Banners',
	},
	fields: [
		{
			name: 'icon',
			type: 'upload',
			relationTo: 'media',
			label: 'Icône',
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
		},
		{
			name: 'buttons',
			type: 'array',
			label: 'Boutons',
			labels: {
				singular: 'Bouton',
				plural: 'Boutons',
			},
			maxRows: 2,
			fields: [
				{
					name: 'color',
					type: 'select',
					label: 'Couleur',
					required: true,
					defaultValue: 'primary',
					options: [
						{ label: 'Primary', value: 'primary' },
						{ label: 'White', value: 'white' },
					],
				},
				{
					name: 'label',
					type: 'text',
					label: 'Label',
					required: true,
				},
				{
					name: 'link',
					type: 'group',
					label: 'Lien',
					fields: navLinkFields,
				},
			],
		},
	],
}
