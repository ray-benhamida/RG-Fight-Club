/**
 * Réserve l'espace du Header fixe dans le flux du document.
 * La hauteur est définie dynamiquement par Header via --site-header-height.
 */
export default function HeaderSpacer() {
  return (
    <div
      aria-hidden="true"
      className="w-full shrink-0"
      style={{ height: 'var(--site-header-height, 7.75rem)' }}
    />
  )
}
