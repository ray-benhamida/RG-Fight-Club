import type { Block } from 'payload'

export const CourseSectionBlock: Block = {
	slug: 'courseSection',
	labels: {
		singular: 'Course Section',
		plural: 'Course Sections',
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
			type: 'text',
			label: 'Sous-titre',
			required: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: 'Description',
			required: true,
		},
		{
			name: 'target',
			type: 'select',
			label: 'Cible',
			required: true,
			defaultValue: 'women',
			options: [
				{ label: 'Femmes uniquement', value: 'women' },
				{ label: 'Mixte', value: 'mixed' },
			],
		},
		{
			name: 'icon',
			type: 'upload',
			relationTo: 'media',
			label: 'Icône',
			required: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			label: "Visuel d'immersion",
			required: true,
		},
		{
			name: 'imagePosition',
			type: 'select',
			label: "Position du visuel",
			required: true,
			defaultValue: 'right',
			options: [
				{ label: 'À droite', value: 'right' },
				{ label: 'À gauche', value: 'left' },
			],
		},
		{
			name: 'variants',
			type: 'array',
			label: 'Variantes',
			maxRows: 2,
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					required: true,
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
				},
				{
					name: 'icon',
					type: 'upload',
					relationTo: 'media',
					label: 'Icône',
					required: true,
				},
				{
					name: 'description',
					type: 'richText',
					label: 'Description',
					required: true,
				},
			],
		},
	],
}
