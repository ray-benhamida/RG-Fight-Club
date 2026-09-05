import { getDocumentLabelColorClass } from '@/lib/documentLabelColors'
import type { DocumentLabel, Media } from '@/payload-types'

export interface DocumentProps {
	titre: string
	description?: string | null
	label?: DocumentLabel | string | null
	fichierPdf?: Media | string | null
	fichierWord?: Media | string | null
}

const fileButtonClassName =
	'inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold italic uppercase tracking-wide text-darkgray no-underline transition-colors hover:border-primary hover:text-primary'

function DocumentIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<path
				d="M6 2h24l12 12v44H6V2z"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinejoin="round"
			/>
			<path d="M30 2v12h12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
			<path d="M12 24h24M12 32h24M12 40h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
		</svg>
	)
}

function resolveMediaUrl(file?: Media | string | null): string | null {
	if (!file || typeof file === 'string') {
		return null
	}

	return file.url ?? null
}

function resolveLabel(label?: DocumentLabel | string | null): DocumentLabel | null {
	if (!label || typeof label === 'string') {
		return null
	}

	return label
}

export default function Document({
	titre,
	description,
	label,
	fichierPdf,
	fichierWord,
}: DocumentProps) {
	const pdfUrl = resolveMediaUrl(fichierPdf)
	const wordUrl = resolveMediaUrl(fichierWord)
	const labelData = resolveLabel(label)
	const hasFiles = Boolean(pdfUrl || wordUrl)

	return (
		<article className="flex h-full flex-col overflow-hidden border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-lg">
			<div className="flex items-center gap-3 bg-gradient-primary px-5 py-5 sm:px-6 sm:py-6">
				<DocumentIcon className="h-12 w-12 shrink-0 text-white opacity-30 sm:h-14 sm:w-14" />
				<p className="font-display text-base font-black italic uppercase leading-tight tracking-wide text-white sm:text-lg">
					Document
				</p>
			</div>

			<div className="flex flex-1 flex-col gap-3 px-5 py-4 sm:px-6 sm:py-5">
				{labelData ? (
					<span
						className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${getDocumentLabelColorClass(labelData.couleur)}`}
					>
						{labelData.nom}
					</span>
				) : null}

				<h2 className="font-display text-lg font-black italic leading-snug tracking-tight text-darkgray sm:text-xl">
					{titre}
				</h2>

				{description ? (
					<p className="line-clamp-4 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
						{description}
					</p>
				) : (
					<div className="flex-1" />
				)}
			</div>

			{hasFiles ? (
				<div className="grid grid-cols-2 gap-3 bg-primary-light px-5 py-4 sm:px-6">
					<div>
						{pdfUrl ? (
							<a
								href={pdfUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={fileButtonClassName}
							>
								PDF
							</a>
						) : null}
					</div>
					<div className="flex justify-end">
						{wordUrl ? (
							<a
								href={wordUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={fileButtonClassName}
							>
								Word
							</a>
						) : null}
					</div>
				</div>
			) : null}
		</article>
	)
}
