'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/Modal'
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '@/lib/youtube'

export interface VideoProps {
  titre: string
  description: string
  videoUrl: string
  duree: number
  typeName: string
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé'
}

export default function Video({
  titre,
  description,
  videoUrl,
  duree,
  typeName,
  niveau,
}: VideoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const embedUrl = getYouTubeEmbedUrl(videoUrl)
  const thumbnailUrl = getYouTubeThumbnailUrl(videoUrl)

  return (
    <>
      <article className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-lg">
        <div className="relative aspect-video w-full bg-gray-100">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={`Aperçu — ${titre}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              Aperçu indisponible
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <h2 className="font-display text-lg font-black italic tracking-tight text-darkgray sm:text-xl">
            {titre}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{duree} min</span>
            {typeName ? (
              <span className="inline-flex items-center rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
                {typeName}
              </span>
            ) : null}
            <span className="inline-flex items-center rounded-full border border-primary bg-transparent px-2.5 py-0.5 text-xs font-semibold text-primary">
              {niveau}
            </span>
          </div>

          <p className="line-clamp-4 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {description}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={!embedUrl}
            className="mt-2 w-full cursor-pointer rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold italic uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Voir la vidéo
          </button>
        </div>
      </article>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hideHeader
        className="max-w-4xl border-0 bg-black p-0 shadow-2xl"
        bodyClassName="w-full"
        closeButtonClassName="rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
      >
        {isOpen && embedUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={titre}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>
        ) : null}
      </Modal>
    </>
  )
}
