import type { GlobalConfig } from 'payload'

export const HomepageGlobal: GlobalConfig = {
	slug: 'homepage',
	label: "Page d'accueil",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'quickLinks',
			type: 'array',
			label: 'Raccourcis',
			labels: {
				singular: 'Raccourci',
				plural: 'Raccourcis',
			},
			minRows: 2,
			maxRows: 4,
			admin: {
				description:
					'2 à 4 liens affichés à cheval entre le Hero et la Présentation. Seuls les items complets sont rendus.',
			},
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
					required: true,
				},
				{
					name: 'page',
					type: 'relationship',
					relationTo: 'pages',
					label: 'Page',
					required: true,
				},
			],
		},
	],
}
