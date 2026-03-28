'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';

interface Testimonial {
	name: string;
	text: string;
}

const testimonials: Testimonial[] = [
	{
		name: 'Sarah',
		text: "Super expérience ! Les cours de boxe sont intenses et motivants, parfaits pour progresser rapidement. Le coach est très pro, à l'écoute et pousse à se dépasser."
	},
	{
		name: 'Emma',
		text: "Ambiance exceptionnelle et coaching de qualité ! J'ai gagné en confiance et en force. Les cours collectifs sont dynamiques et l'esprit d'équipe est incroyable.",
	},
	{
		name: 'Laura',
		text: "RG Fight Club a transformé ma vision du sport. Chaque séance est un défi que je relève avec plaisir. La coach sait exactement comment motiver et faire progresser.",
	},
	{
		name: 'Marie',
		text: "Une vraie révélation ! Je me sens plus forte physiquement et mentalement. L'accompagnement personnalisé fait toute la différence. Je recommande à 100% !",
	},
];

export default function Testimonials() {
	const swiperRef = useRef<SwiperType | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const AOS = require('aos');
			AOS.init({
				duration: 1000,
				once: true,
			});
		}
	}, []);

	return (
		<section
			id="testimonials"
			className="relative overflow-x-hidden py-0 before:pointer-events-none before:absolute before:bottom-0 before:right-0 before:z-0 before:h-2/5 before:w-full before:bg-gradient-primary before:content-[''] md:before:h-full md:before:w-1/2"
		>
			<div className="container mx-auto relative z-10 flex flex-col gap-16 px-4 py-10 sm:px-6 md:flex-row md:px-8 md:py-20">
				{/* Partie gauche - Titre et Navigation */}
				<div className="flex min-w-0 flex-col items-start justify-center">
					{/* Guillemets décoratifs — éviter margin négative qui élargit le document */}
					<Image
						src="/images/quote.svg"
						alt=""
						role="presentation"
						width={120}
						height={120}
						className="mb-2 ml-auto w-20 shrink-0 sm:-mb-4 sm:w-[120px]"
					/>

					{/* Titre */}
					<div className="mb-4" data-aos="fade-right">
						<h2 className="text-4xl md:text-5xl font-medium font-alt italic leading-tight tracking-wide mb-0">
							<span className="text-black">RETOURS ET</span> <br />
							<span className="text-primary">TÉMOIGNAGES</span>
						</h2>
					</div>

					{/* Navigation arrows */}
					<div className="flex gap-4">
						<button
							onClick={() => swiperRef.current?.slidePrev()}
							className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
							aria-label="Témoignage précédent"
						>
							<FaChevronLeft className="text-3xl" />
						</button>
						<button
							onClick={() => swiperRef.current?.slideNext()}
							className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary transition-all cursor-pointer"
							aria-label="Témoignage suivant"
						>
							<FaChevronRight className="text-3xl" />
						</button>
					</div>
				</div>

				{/* Partie droite - Swiper des témoignages */}
				<div className="grow min-w-0 flex items-center justify-center px-4 py-4 overflow-hidden" data-aos="fade-left" data-aos-delay="200">
					<Swiper
						spaceBetween={32}
						slidesPerView={2}
						direction="horizontal"
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
						}}
						loop={true}
						className="testimonials-swiper w-full"
						breakpoints={{
							320: { slidesPerView: 1 },
							1024: { slidesPerView: 2 },
						}}
					>
						{testimonials.map((testimonial, index) => (
							<SwiperSlide key={index}>
								<TestimonialCard testimonial={testimonial} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<div className="bg-white rounded-lg p-6 md:p-8 transform transition-all shadow-[0px_5px_10px_0_rgba(0,0,0,0.25)]">
			<div className="flex items-center gap-6 mb-6">
				<div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl shrink-0 shadow-[0px_5px_10px_0_rgba(0,0,0,0.37)]">
					<Image
						src="/images/rgfightclub_testimonial.png"
						alt={`Avatar témoignage client RG Fight Club – ${testimonial.name}`}
						width={56}
						height={56}
					/>
				</div>
				<div>
					<h3 className="font-semibold text-xl text-black">
						{testimonial.name}
					</h3>
				</div>
			</div>
			<p className="text-gray-700 leading-relaxed text-base">
				{testimonial.text}
			</p>
		</div>
	);
}