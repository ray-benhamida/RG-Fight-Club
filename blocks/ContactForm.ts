import type { Block } from 'payload'

export const ContactFormBlock: Block = {
	slug: 'contactForm',
	labels: {
		singular: 'Formulaire de contact',
		plural: 'Formulaires de contact',
	},
	fields: [
		{
			name: 'eyebrow',
			type: 'text',
			label: 'Label',
			defaultValue: 'Nous sommes là pour vous',
		},
		{
			name: 'title',
			type: 'text',
			label: 'Titre',
			required: true,
			defaultValue: 'Restons en contact',
		},
		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			defaultValue:
				'Une question, une demande d’information ou envie de rejoindre le club ? Notre équipe vous répond rapidement.',
		},
		{
			name: 'instagramCard',
			type: 'group',
			label: 'Carte Instagram',
			admin: {
				description: 'Le compte Instagram (URL et identifiant) est repris depuis l’En-tête.',
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: 'Instagram',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
					defaultValue:
						'Suivez-nous au quotidien sur Instagram pour découvrir nos actus, entraînements et événements.',
				},
				{
					name: 'buttonLabel',
					type: 'text',
					label: 'Label du bouton',
					defaultValue: 'Nous écrire sur Instagram',
				},
			],
		},
		{
			name: 'emailCard',
			type: 'group',
			label: 'Carte E-mail',
			admin: {
				description: 'L’adresse e-mail est reprise depuis Paramètres globaux → Contact.',
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: 'E-mail',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
					defaultValue:
						'Envoyez-nous un e-mail pour toute demande d’information, d’inscription ou partenariat.',
				},
				{
					name: 'buttonLabel',
					type: 'text',
					label: 'Label du bouton',
					defaultValue: 'Envoyer un e-mail',
				},
			],
		},
		{
			name: 'formTitle',
			type: 'text',
			label: 'Titre du formulaire',
			defaultValue: 'Formulaire de contact',
		},
		{
			name: 'submitLabel',
			type: 'text',
			label: 'Label du bouton d’envoi',
			defaultValue: 'Envoyer le message',
		},
	],
}
