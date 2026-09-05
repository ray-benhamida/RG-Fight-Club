import type { Field } from 'payload'

export const navLinkFields: Field[] = [
	{
		name: 'linkType',
		type: 'select',
		label: 'Type de lien',
		required: true,
		defaultValue: 'section',
		options: [
			{ label: 'Homepage', value: 'home' },
			{ label: 'Ancre (section homepage)', value: 'section' },
			{ label: 'Page', value: 'page' },
			{ label: 'URL personnalisée', value: 'custom' },
		],
	},
	{
		name: 'sectionId',
		type: 'text',
		label: 'ID de section',
		admin: {
			condition: (_, siblingData) => siblingData?.linkType === 'section',
			description:
				'Identifiant HTML de la section (ex. presentation, projects, testimonials)',
		},
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
			description: 'Chemin interne (/page/videos) ou URL externe (https://…)',
		},
	},
]
