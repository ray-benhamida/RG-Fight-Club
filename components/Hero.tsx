'use client';

import { useEffect } from 'react';

export default function Hero() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const AOS = require('aos');
			AOS.init({
				duration: 1000,
				once: true,
			});
		}
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: "url('/images/rgfightclub_hero.png')",
				}}
			/>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black/70" />

			{/* Content */}
			<div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
				<h1
					className="text-5xl md:text-7xl lg:text-[80px] font-bold italic mb-6 leading-tight tracking-tight text-white"
					data-aos="fade-up"
				>
					<span className="text-primary">TRANSFORME</span> TON CORPS
					<br />
					RÉVÈLE TON <span className="text-primary">POTENTIEL</span>
				</h1>
				<p
					className="text-lg md:text-3xl mb-10 text-white italic font-light max-w-4xl mx-auto"
					data-aos="fade-up"
					data-aos-delay="200"
				>
					Des entraînements sur mesure, un esprit collectif, des valeurs de partage.
					Découvre un coaching qui te ressemble.
				</p>
				<span
					className="inline-block"
					data-aos="fade-up"
					data-aos-delay="400"
				>
					<button
						type="button"
						onClick={() => scrollToSection('presentation')}
						className="hero-cta-glow px-12 py-4 bg-gradient-primary text-white rounded-full text-lg font-bold cursor-pointer italic uppercase tracking-wide"
					>
						Découvrir
					</button>
				</span>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<svg
					className="w-6 h-6 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</section>
	);
}
