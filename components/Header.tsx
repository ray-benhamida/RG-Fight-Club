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

const mobileNavLinkClass =
	'block py-4 text-lg font-bold text-black transition-colors hover:text-primary';

export default function Header({
	variant = 'home',
	navLinks,
	instagram,
}: HeaderProps) {
	const pathname = usePathname();
	const headerRef = useRef<HTMLElement>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const showScrolled = variant === 'solid' || isMenuOpen || (mounted && isScrolled);

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

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		const handleChange = (event: MediaQueryListEvent) => {
			if (event.matches) {
				setIsMenuOpen(false);
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	const isHomepage = variant === 'home';
	const navAosProps = isHomepage ? { 'data-aos': 'fade-down' as const } : {};
	const instagramAosProps = isHomepage ? { 'data-aos': 'fade-left' as const } : {};

	const closeMenu = () => setIsMenuOpen(false);

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
			document.body.style.overflow = '';
			closeMenu();
			scrollToSection(sectionId);
			return;
		}

		closeMenu();
	};

	const handleNavClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		sectionId?: string,
	) => {
		if (sectionId) {
			handleSectionClick(event, sectionId);
			return;
		}

		closeMenu();
	};

	return (
		<>
			<header
				ref={headerRef}
				className={`fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-300 ${showScrolled
					? `bg-white backdrop-blur-sm text-black ${isMenuOpen ? '' : 'shadow-xl'}`
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
								onClick={closeMenu}
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

						<button
							type="button"
							className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center md:hidden hover:text-primary transition-colors"
							aria-expanded={isMenuOpen}
							aria-controls="mobile-menu"
							aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
							onClick={() => setIsMenuOpen((open) => !open)}
						>
							<span className="flex h-5 w-6 flex-col justify-between" aria-hidden="true">
								<span
									className={`block h-0.5 w-full origin-center bg-current transition-transform duration-300 ${isMenuOpen ? 'translate-y-[9px] rotate-45' : ''
										}`}
								/>
								<span
									className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''
										}`}
								/>
								<span
									className={`block h-0.5 w-full origin-center bg-current transition-transform duration-300 ${isMenuOpen ? '-translate-y-[9px] -rotate-45' : ''
										}`}
								/>
							</span>
						</button>
					</div>
				</div>
			</header>

			{isMenuOpen ? (
				<div className="fixed inset-x-0 bottom-0 z-40 md:hidden" style={{ top: 'var(--site-header-height)' }}>
					<button
						type="button"
						className="absolute inset-0 bg-black/50"
						onClick={closeMenu}
						aria-label="Fermer le menu"
					/>
					<nav
						id="mobile-menu"
						className="relative z-10 max-h-full overflow-y-auto overscroll-contain bg-white text-black shadow-xl"
						aria-label="Menu principal"
					>
						<div className="flex flex-col px-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
							{navLinks.map((link) => (
								<a
									key={`${link.href}-${link.label}`}
									href={link.href}
									onClick={(event) => handleNavClick(event, link.sectionId)}
									className={`${mobileNavLinkClass} border-b border-gray-100`}
								>
									{link.label}
								</a>
							))}
							<a
								href={instagram.url}
								target="_blank"
								rel="noopener noreferrer"
								onClick={closeMenu}
								className="gradient-border-button mt-6 w-full"
							>
								<span className="text-sm font-bold tracking-wider italic">{instagram.label}</span>
								<FaInstagram className="text-xl" />
							</a>
						</div>
					</nav>
				</div>
			) : null}
		</>
	);
}
