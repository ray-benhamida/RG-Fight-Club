import type { Field, GlobalConfig } from 'payload'

const ctaLinkFields: Field[] = [
	{
		name: 'linkType',
		type: 'select',
		label: 'Type de lien',
		defaultValue: 'page',
		options: [
			{ label: 'Page', value: 'page' },
			{ label: 'URL personnalisée', value: 'custom' },
		],
	},
	{
		name: 'page',
		type: 'relationship',
		relationTo: 'pages',
		label: 'Page',
		admin: {
			condition: (_, siblingData) => siblingData?.linkType === 'page',
		},
	},
	{
		name: 'url',
		type: 'text',
		label: 'URL',
		admin: {
			condition: (_, siblingData) => siblingData?.linkType === 'custom',
			description: 'Chemin interne (/page/contact) ou URL externe (https://…). Laisser vide pour masquer le bouton.',
		},
	},
]

export const GlobalSettings: GlobalConfig = {
	slug: 'global-settings',
	label: 'Paramètres globaux',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'planning',
			type: 'group',
			label: 'Bouton Planning',
			fields: [
				{
					name: 'label',
					type: 'text',
					label: 'Libellé',
					defaultValue: 'Voir le Planning',
				},
				...ctaLinkFields,
			],
		},
		{
			name: 'registration',
			type: 'group',
			label: "Bouton S'inscrire",
			fields: [
				{
					name: 'label',
					type: 'text',
					label: 'Libellé',
					defaultValue: "S'inscrire",
				},
				...ctaLinkFields,
			],
		},
		{
			name: 'courses',
			type: 'group',
			label: 'Bouton Cours',
			fields: [
				{
					name: 'label',
					type: 'text',
					label: 'Libellé',
					defaultValue: 'Voir les cours',
				},
				...ctaLinkFields,
			],
		},
		{
			name: 'contact',
			type: 'group',
			label: 'Contact',
			fields: [
				{
					name: 'email',
					type: 'email',
					label: 'E-mail',
					defaultValue: 'contact@rg-fight-club.fr',
					admin: {
						description:
							'Adresse affichée sur le block Formulaire de contact, utilisée pour le lien mailto, et destinataire des messages envoyés via le formulaire.',
					},
				},
			],
		},
	],
}
