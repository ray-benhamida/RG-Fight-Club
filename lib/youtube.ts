/**
 * Extrait l'ID vidéo YouTube depuis une URL (watch, youtu.be, embed, shorts).
 */
export function getYouTubeEmbedId(url: string): string | null {
  if (!url?.trim()) return null

  try {
    const parsed = new URL(url.trim())

    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/')[2]
        return id || null
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/')[2]
        return id || null
      }
      const v = parsed.searchParams.get('v')
      return v || null
    }
  } catch {
    return null
  }

  return null
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeEmbedId(url)
  if (!id) return null
  return `https://www.youtube-nocookie.com/embed/${id}`
}

export function getYouTubeThumbnailUrl(url: string): string | null {
  const id = getYouTubeEmbedId(url)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}
