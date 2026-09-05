'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import type { HeaderNavData } from '@/lib/header';

interface HeaderProps {
	variant?: 'home' | 'solid';
	navLinks: HeaderNavData['navLinks'];
	instagram: HeaderNavData['instagram'];
}

const navLinkClass =
	'hover:text-primary transition-colors font-bold text-base';

export default function Header({
	variant = 'home',
	navLinks,
	instagram,
}: HeaderProps) {
	const pathname = usePathname();
	const headerRef = useRef<HTMLElement>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const showScrolled = variant === 'solid' || (mounted && isScrolled);

	useEffect(() => {
		setMounted(true);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const el = headerRef.current;
		if (!el) return;

		const syncHeaderHeight = () => {
			document.documentElement.style.setProperty(
				'--site-header-height',
				`${el.offsetHeight}px`,
			);
		};

		syncHeaderHeight();
		const observer = new ResizeObserver(syncHeaderHeight);
		observer.observe(el);
		return () => observer.disconnect();
	}, [showScrolled, mounted]);

	const isHomepage = variant === 'home';
	const navAosProps = isHomepage ? { 'data-aos': 'fade-down' as const } : {};
	const instagramAosProps = isHomepage ? { 'data-aos': 'fade-left' as const } : {};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			window.history.pushState(null, '', `#${sectionId}`);
		}
	};

	const handleSectionClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string,
	) => {
		if (pathname === '/') {
			event.preventDefault();
			scrollToSection(sectionId);
		}
	};

	return (
		<header
			ref={headerRef}
			className={`fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-300 ${showScrolled
				? 'bg-white backdrop-blur-sm shadow-xl text-black'
				: 'bg-transparent text-white'
				}`}
		>
			<div className="mx-auto box-border flex w-full min-w-0 max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-5 sm:px-6 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]">
				<div className="flex min-w-0 flex-1 items-center justify-between gap-3">
					{/* Logo — pas de data-aos ici : les transforms AOS peuvent provoquer du débordement */}
					<div className="flex shrink-0 items-center">
						<Link
							href="/"
							className="block shrink-0 hover:opacity-80 transition-opacity"
						>
							{showScrolled ? (
								<Image
									src="/images/rgfightclub_logo_black.svg"
									alt="RG Fight Club"
									width={80}
									height={80}
									className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
									sizes="(max-width: 768px) 56px, 80px"
								/>
							) : (
								<Image
									src="/images/rgfightclub_logo_white.svg"
									alt="RG Fight Club"
									width={80}
									height={80}
									className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
									sizes="(max-width: 768px) 56px, 80px"
								/>
							)}
						</Link>
					</div>

					{/* Navigation centrée */}
					<nav
						className="hidden md:flex items-center justify-center flex-1 space-x-10"
						{...navAosProps}
					>
						{navLinks.map((link) => (
							<a
								key={`${link.href}-${link.label}`}
								href={link.href}
								onClick={
									link.sectionId
										? (event) => handleSectionClick(event, link.sectionId!)
										: undefined
								}
								className={navLinkClass}
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* Bouton Instagram à droite */}
					<div className="hidden md:flex items-center" {...instagramAosProps}>
						<a
							href={instagram.url}
							target="_blank"
							rel="noopener noreferrer"
							className="gradient-border-button"
						>
							<span className="text-sm font-bold tracking-wider italic">{instagram.label}</span>
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
