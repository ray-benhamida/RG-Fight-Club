import type { Block, FieldHook } from 'payload'
import { navLinkFields } from '../fields/navLink'

const migrateLegacyButtonLink: FieldHook = ({ value }) => {
	if (typeof value === 'string') {
		const url = value.trim()
		if (!url) return value
		return {
			linkType: 'custom',
			url,
		}
	}

	return value
}

export const FAQBlock: Block = {
	slug: 'faq',
	labels: {
		singular: 'FAQ',
		plural: 'FAQs',
	},
	fields: [
		{
			name: 'items',
			type: 'array',
			label: 'Questions',
			required: true,
			minRows: 1,
			fields: [
				{
					name: 'question',
					type: 'text',
					label: 'Question',
					required: true,
				},
				{
					name: 'answer',
					type: 'richText',
					label: 'Réponse',
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
					hooks: {
						afterRead: [migrateLegacyButtonLink],
						beforeChange: [migrateLegacyButtonLink],
					},
					fields: navLinkFields,
				},
			],
		},
	],
}
