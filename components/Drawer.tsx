'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { FaTimes } from 'react-icons/fa'

export interface DrawerProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	title?: string
	titleId?: string
	className?: string
	bodyClassName?: string
}

export default function Drawer({
	isOpen,
	onClose,
	children,
	title,
	titleId,
	className = '',
	bodyClassName = '',
}: DrawerProps) {
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = previousOverflow
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex justify-end" role="presentation">
			<button
				type="button"
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-label="Fermer le panneau"
			/>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className={`relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-lg ${className}`}
			>
				<div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5">
					{title ? (
						<h2 id={titleId} className="font-page-header-title text-3xl uppercase tracking-tight text-darkgray">
							{title}
						</h2>
					) : (
						<span />
					)}
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary"
						aria-label="Fermer"
					>
						<FaTimes className="text-xl" />
					</button>
				</div>
				<div className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 ${bodyClassName}`}>
					{children}
				</div>
			</div>
		</div>
	)
}
