'use client';

import { getImageProps } from 'next/image';
import { preload } from 'react-dom';

interface HeroProps {
	hideScrollIndicator?: boolean
}

const heroImage = {
	alt: '',
	fill: true,
	sizes: '100vw',
	priority: true,
	className: 'object-cover',
} as const;

function HeroBackground() {
	const {
		props: { srcSet: webpSrcSet, src: webpSrc, sizes },
	} = getImageProps({
		...heroImage,
		src: '/images/rgfightclub_hero_optimised.webp',
	});
	const { props: pngProps } = getImageProps({
		...heroImage,
		src: '/images/rgfightclub_hero_optimised.png',
	});

	if (webpSrcSet) {
		preload(webpSrc, {
			as: 'image',
			type: 'image/webp',
			imageSrcSet: webpSrcSet,
			imageSizes: sizes,
			fetchPriority: 'high',
		});
	}

	return (
		<picture>
			{webpSrcSet ? (
				<source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
			) : null}
			<img {...pngProps} alt="" fetchPriority="high" />
		</picture>
	);
}

export default function Hero({ hideScrollIndicator = false }: HeroProps) {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<HeroBackground />

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

			{hideScrollIndicator ? null : (
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
			)}
		</section>
	);
}
