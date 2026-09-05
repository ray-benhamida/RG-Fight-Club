import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import HeaderContainer from '@/components/HeaderContainer'
import HeaderSpacer from '@/components/HeaderSpacer'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import { getPayloadClient } from '@/lib/payload'
import type { Page } from '@/payload-types'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}

function getPageTitle(page: Page): string {
  const headerBlock = page.layout?.find((block) => block.blockType === 'pageHeader')
  if (headerBlock && headerBlock.blockType === 'pageHeader') {
    return headerBlock.title
  }
  return page.title
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return { title: 'Page introuvable' }
  }

  return {
    title: getPageTitle(page),
    alternates: {
      canonical: `/page/${slug}`,
    },
  }
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <main className="page-layout min-w-0 max-w-full overflow-x-hidden">
      <HeaderContainer variant="solid" />
      <HeaderSpacer />
      <RenderBlocks blocks={page.layout ?? []} />
      <Footer />
    </main>
  )
}
