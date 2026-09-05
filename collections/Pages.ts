import type { CollectionConfig } from 'payload'
import { CardsGridBlock } from '../blocks/CardsGrid'
import { CommunicationBannerBlock } from '../blocks/CommunicationBanner'
import { ContactFormBlock } from '../blocks/ContactForm'
import { ContentBlock } from '../blocks/Content'
import { CourseSectionBlock } from '../blocks/CourseSection'
import { DocumentsGridBlock } from '../blocks/DocumentsGrid'
import { FAQBlock } from '../blocks/FAQ'
import { PageHeaderBlock } from '../blocks/PageHeader'
import { PlanningBlock } from '../blocks/Planning'
import { StepsBlock } from '../blocks/Steps'
import { TitleBlock } from '../blocks/Title'
import { VideosGridBlock } from '../blocks/VideosGrid'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
      admin: {
        description: 'Libellé affiché dans l’admin uniquement',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'Segment d’URL (ex. videos → /page/videos)',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Contenu',
      required: true,
      blocks: [
        PageHeaderBlock,
        TitleBlock,
        ContentBlock,
        FAQBlock,
        CardsGridBlock,
        CommunicationBannerBlock,
        ContactFormBlock,
        CourseSectionBlock,
        VideosGridBlock,
        DocumentsGridBlock,
        PlanningBlock,
        StepsBlock,
      ],
    },
  ],
}
