import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Vidéo',
    plural: 'Vidéos',
  },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'type', 'niveau', 'duree', 'createdAt'],
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
      required: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL YouTube',
      required: true,
      admin: {
        description:
          'URL complète (ex. https://www.youtube.com/watch?v=... ou https://youtu.be/...)',
      },
    },
    {
      name: 'duree',
      type: 'number',
      label: 'Durée',
      required: true,
      min: 1,
      admin: {
        description: 'Durée en minutes',
        step: 1,
      },
      validate: (value: number | null | undefined) => {
        if (value != null && !Number.isInteger(value)) {
          return 'La durée doit être un nombre entier'
        }
        return true
      },
    },
    {
      name: 'niveau',
      type: 'select',
      label: 'Niveau',
      required: true,
      options: [
        { label: 'Débutant', value: 'Débutant' },
        { label: 'Intermédiaire', value: 'Intermédiaire' },
        { label: 'Avancé', value: 'Avancé' },
      ],
    },
    {
      name: 'type',
      type: 'relationship',
      label: 'Type',
      relationTo: 'video-types',
      required: true,
      admin: {
        allowCreate: true,
      },
    },
  ],
}
