import type { CollectionConfig } from 'payload'

export const VideoTypes: CollectionConfig = {
  slug: 'video-types',
  labels: {
    singular: 'Type de vidéo',
    plural: 'Types de vidéo',
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
      label: 'Nom',
      required: true,
      unique: true,
    },
  ],
}
