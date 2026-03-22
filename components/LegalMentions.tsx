"use client";

import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import LegalMentionsBody from "@/components/LegalMentionsBody";

interface LegalMentionsProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function LegalMentions({ isOpen, onClose }: LegalMentionsProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	/** Sync React quand le <dialog> se ferme (bouton, Escape, ou programmatique) — sans rappeler close() ici */
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const onNativeClose = () => onClose();
		dialog.addEventListener('close', onNativeClose);
		return () => dialog.removeEventListener('close', onNativeClose);
	}, [onClose]);

	const requestClose = () => {
		dialogRef.current?.close();
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			requestClose();
		}
	};

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			className="z-50 m-auto h-[85vh] max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border-0 bg-white p-0 text-(--color-foreground) shadow-2xl backdrop:bg-black/50 [&[open]]:flex [&[open]]:flex-col"
			aria-modal="true"
			aria-labelledby="legal-mentions-title"
		>
			<div
				className="flex min-h-0 flex-1 flex-col overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header fixe */}
				<div className="relative z-10 flex shrink-0 items-center justify-between border-b border-gray-200 p-6">
					<h2 id="legal-mentions-title" className="font-display text-xl font-bold">
						Mentions légales
					</h2>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							requestClose();
						}}
						className="relative z-10 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-(--color-primary)"
						aria-label="Fermer"
					>
						<FaTimes className="text-xl" />
					</button>
				</div>

				{/* Zone scrollable : hauteur fixe implicite (flex-1 + min-h-0) */}
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 font-sans text-sm leading-relaxed">
					<LegalMentionsBody />
				</div>
			</div>
		</dialog>
	);
}
