'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Presentation() {
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
		<section id="presentation" className="relative py-20 overflow-hidden bg-white bg-left-primary">
			<div className="container mx-auto px-8 relative z-10">

				{/* Image à gauche avec cadre noir */}
				<div className="w-full md:w-6/12 mb-8 md:md-0" data-aos="fade-right">
					<div className="relative shadow-2xl">
						<div className="relative aspect-5/6 overflow-hidden">
							<Image
								src="/images/rgfightclub_presentation.png"
								alt="Btisam Rguibi - Coach Sportif"
								fill
								className="object-cover"
								priority
							/>
						</div>
					</div>
				</div>

				{/* Contenu à droite avec fond blanc */}
				<div className="w-full md:w-7/12 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2" data-aos="fade-left" data-aos-delay="200">
					<div className="bg-white p-8 md:px-16 md:py-20 shadow-[5px_5px_18px_0_rgba(0,0,0,0.25)]">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight font-alt italic text-darkgray">
							BTISAM <span className="text-primary">RGUIBI</span>
						</h2>

						<p className="text-xl md:text-3xl font-bold italic text-gray-700 font-alt mb-8 border-b-2 border-gray-200 pb-8">
							COACH SPORTIF
						</p>

						<div className="space-y-4 text-gray-700 leading-relaxed">
							<p className="text-base md:text-lg">
								Affirme-toi. Dépasse-toi. Ici, chaque coup porté est un pas de plus vers la confiance et la puissance.
							</p>

							<p className="text-base md:text-lg">
								La boxe n&apos;est pas qu&apos;un sport, c&apos;est une arme. Une arme pour se renforcer, pour s&apos;affirmer, pour ne plus jamais douter.
							</p>

							<p className="text-base md:text-lg">
								Ici, pas de place pour les limites. Juste toi, ta détermination et une coach qui te pousse à révéler la combattante en toi.
							</p>

							<p className="text-base md:text-lg">
								Se défendre, s&apos;imposer, gagner en force et en assurance. La boxe, c&apos;est bien plus qu&apos;un entraînement, c&apos;est une transformation.
							</p>

							<p className="text-base md:text-lg font-semibold">
								Prête à te dépasser ? Il ne reste plus qu&apos;à monter sur le ring, affronter tes peurs, repousser tes limites et découvrir la force que tu portes en toi depuis toujours.
							</p>

							<p className="text-base md:text-lg border-l-4 border-primary pl-4 text-gray-600">
								<strong className="text-darkgray">Où nous retrouver :</strong> interventions et cours en
								Seine-Saint-Denis (93), notamment autour d&apos;Aulnay-sous-Bois et Bobigny, en Île-de-France.
								Contacte-nous sur Instagram pour les lieux et horaires.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
