'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (window.scrollY > 20) {
			setIsScrolled(true);
		}

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const AOS = require('aos');
			AOS.init({ duration: 600, once: true });
		}
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
				? 'bg-white backdrop-blur-sm shadow-xl text-black'
				: 'bg-transparent text-white'
				}`}
		>
			<div className="container mx-auto px-6 py-5">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center" data-aos="fade-right">
						<Link
							href="/"
							className="font-black text-3xl tracking-tight hover:opacity-80 transition-opacity"
						>
							{isScrolled ? (
								<Image src="/images/rgfightclub_logo_black.svg" alt="RG Fight Club" width={80} height={80} />
							) : (
								<Image src="/images/rgfightclub_logo_white.svg" alt="RG Fight Club" width={80} height={80} />
							)}
						</Link>
					</div>

					{/* Navigation centrée */}
					<nav className="hidden md:flex items-center justify-center flex-1 space-x-10" data-aos="fade-down">
						<button
							onClick={() => scrollToSection('presentation')}
							className="hover:text-primary transition-colors font-bold text-base cursor-pointer"
						>
							Présentation
						</button>
						<button
							onClick={() => scrollToSection('projects')}
							className="hover:text-primary transition-colors font-bold text-base cursor-pointer"
						>
							Prestations
						</button>
						<button
							onClick={() => scrollToSection('testimonials')}
							className="hover:text-primary transition-colors font-bold text-base cursor-pointer"
						>
							Témoignages
						</button>
					</nav>

					{/* Bouton Instagram à droite */}
					<div className="hidden md:flex items-center" data-aos="fade-left">
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

					{/* Mobile menu button */}
					{/* <button
						className="md:hidden text-white hover:text-primary transition-colors"
					>
						<svg
							className="w-7 h-7"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button> */}
				</div>
			</div>
		</header>
	);
}
