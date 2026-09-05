import type { GlobalConfig } from 'payload'
import { navLinkFields } from '../fields/navLink'

export const HeaderGlobal: GlobalConfig = {
	slug: 'header',
	label: 'En-tête',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'navLinks',
			type: 'array',
			label: 'Liens de navigation',
			admin: {
				description:
					'Liens affichés dans le menu principal. Les ancres de section font défiler la homepage.',
			},
			fields: [
				{
					name: 'label',
					type: 'text',
					label: 'Libellé',
					required: true,
				},
				...navLinkFields,
			],
		},
		{
			name: 'instagram',
			type: 'group',
			label: 'Bouton Instagram',
			fields: [
				{
					name: 'url',
					type: 'text',
					label: 'URL',
					defaultValue: 'https://www.instagram.com/rg_fight_club',
				},
				{
					name: 'label',
					type: 'text',
					label: 'Libellé',
					defaultValue: 'RG_FIGHT_CLUB',
				},
			],
		},
	],
}
