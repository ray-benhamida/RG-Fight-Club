import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
	slug: 'documents',
	labels: {
		singular: 'Document',
		plural: 'Documents',
	},
	admin: {
		useAsTitle: 'titre',
		defaultColumns: ['titre', 'label', 'createdAt'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'titre',
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
			name: 'fichierPdf',
			type: 'upload',
			label: 'Fichier PDF',
			relationTo: 'media',
			filterOptions: {
				mimeType: { contains: 'pdf' },
			},
		},
		{
			name: 'fichierWord',
			type: 'upload',
			label: 'Fichier Word',
			relationTo: 'media',
			filterOptions: {
				mimeType: {
					in: [
						'application/msword',
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					],
				},
			},
		},
		{
			name: 'label',
			type: 'relationship',
			label: 'Label',
			relationTo: 'document-labels',
			admin: {
				allowCreate: true,
			},
		},
	],
}
