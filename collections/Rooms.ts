import type { CollectionConfig } from 'payload'

export const Rooms: CollectionConfig = {
	slug: 'rooms',
	labels: {
		singular: 'Salle',
		plural: 'Salles',
	},
	admin: {
		hidden: true,
		useAsTitle: 'nom',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'nom',
			type: 'text',
			label: 'Nom de la salle',
			required: true,
		},
		{
			name: 'label',
			type: 'text',
			label: 'Label',
			required: true,
			admin: {
				description: 'Libellé court affiché sur les cards (ex. Balagny)',
			},
		},
		{
			name: 'adresse',
			type: 'textarea',
			label: 'Adresse',
			required: true,
		},
		{
			name: 'mapsUrl',
			type: 'text',
			label: 'Lien Google Maps',
			required: true,
			admin: {
				description: 'URL complète vers Google Maps',
			},
		},
	],
}
