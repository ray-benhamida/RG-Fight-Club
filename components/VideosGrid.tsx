import Video from '@/components/Video'
import { getPayloadClient } from '@/lib/payload'

interface VideosGridProps {
	sectionClassName?: string
}

export default async function VideosGrid({ sectionClassName = 'bg-white py-12' }: VideosGridProps) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'videos',
    sort: '-createdAt',
    limit: 100,
    depth: 1,
  })

  return (
    <section className={sectionClassName}>
      <div className="container mx-auto px-8">
        {docs.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Aucune vidéo pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((video) => {
              const typeName =
                video.type && typeof video.type === 'object' ? video.type.nom : ''

              return (
                <Video
                  key={video.id}
                  titre={video.titre}
                  description={video.description}
                  videoUrl={video.videoUrl}
                  duree={video.duree}
                  typeName={typeName}
                  niveau={video.niveau}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
