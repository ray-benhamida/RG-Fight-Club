'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import LegalMentions from './LegalMentions';

export default function Footer() {
	const [isLegalOpen, setIsLegalOpen] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const AOS = require('aos');
			AOS.init({ duration: 800, once: true });
		}
	}, []);

	return (
		<footer className="bg-gradient-dark text-white py-12">
			<div className="container mx-auto px-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Logo à gauche */}
					<Link
						href="/"
						className="text-white font-black text-2xl tracking-tight hover:opacity-80 transition-opacity"
					>
						<Image src="/images/rgfightclub_logo_white.svg" alt="RG Fight Club" width={80} height={80} />
					</Link>

					{/* Mentions légales et Copyright au centre */}
					<div className="flex items-center gap-3 text-base text-white font-alt">
						<button
							type="button"
							onClick={() => setIsLegalOpen(true)}
							className="hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer text-inherit font-inherit"
						>
							Mentions légales
						</button>
						<span>-</span>
						<span>Copyright {new Date().getFullYear()}</span>
					</div>

					{/* Bouton Instagram à droite */}
					<a
						href="https://www.instagram.com/rg_fight_club"
						target="_blank"
						rel="noopener noreferrer"
						className="gradient-border-button"
					>
						<span className="text-sm font-bold tracking-wider italic">RG_FIGHT_CLUB</span>
						<FaInstagram className="text-xl" />
					</a>
				</div>
			</div>
			<LegalMentions isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
		</footer>
	);
}
