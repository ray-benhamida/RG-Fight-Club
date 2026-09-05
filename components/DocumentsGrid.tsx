import Document from '@/components/Document'
import { getPayloadClient } from '@/lib/payload'

interface DocumentsGridProps {
	sectionClassName?: string
}

export default async function DocumentsGrid({ sectionClassName = 'bg-white py-12' }: DocumentsGridProps) {
	const payload = await getPayloadClient()
	const { docs } = await payload.find({
		collection: 'documents',
		sort: '-createdAt',
		limit: 100,
		depth: 1,
	})

	return (
		<section id="documents" className={sectionClassName}>
			<div className="container mx-auto px-8">
				{docs.length === 0 ? (
					<p className="text-center text-lg text-gray-600">
						Aucun document pour le moment. Revenez bientôt !
					</p>
				) : (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{docs.map((document) => (
							<Document
								key={document.id}
								titre={document.titre}
								description={document.description}
								label={document.label}
								fichierPdf={document.fichierPdf}
								fichierWord={document.fichierWord}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	)
}
