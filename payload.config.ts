import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'

import { Courses } from './collections/Courses'
import { DocumentLabels } from './collections/DocumentLabels'
import { Documents } from './collections/Documents'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Rooms } from './collections/Rooms'
import { SessionTypes } from './collections/SessionTypes'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { VideoTypes } from './collections/VideoTypes'
import { GlobalSettings } from './globals/GlobalSettings'
import { HeaderGlobal } from './globals/Header'
import { HomepageGlobal } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Extensions navigateur (ex. data-atm-ext-installed) modifient <body> avant hydratation
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    VideoTypes,
    Videos,
    DocumentLabels,
    Documents,
    SessionTypes,
    Rooms,
    Courses,
    Pages,
  ],
  globals: [HeaderGlobal, HomepageGlobal, GlobalSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  i18n: {
    supportedLanguages: { en, fr },
    fallbackLanguage: 'fr',
  },
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
})
