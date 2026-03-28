'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Prestation {
	tab: string;
	title: string;
	paragraphs: string[];
	image: string;
	imageAlt: string;
}

const prestations: Prestation[] = [
	{
		tab: 'Cours collectifs',
		title: 'Des <span>cours collectifs</span> pour petits et grands',
		paragraphs: [
			"Se défendre, s'imposer, gagner en force et en assurance. La boxe, c'est bien plus qu'un entraînement, c'est une transformation.",
			"Prête à te dépasser ? Il ne reste plus qu'à monter sur le ring, affronter tes peurs, repousser tes limites et découvrir la force que tu portes en toi depuis toujours.",
		],
		image: '/images/gallery/roman-aguila-nfZKyKlGujs-unsplash.jpg',
		imageAlt:
			'Cours collectifs de boxe RG Fight Club – entraînement en groupe en Seine-Saint-Denis (93)',
	},
	{
		tab: 'Cours individuels',
		title: 'Des <span>cours individuels</span> personnalisés',
		paragraphs: [
			"Un coaching 100% sur-mesure pour atteindre tes objectifs personnels. Technique, cardio, force : on adapte chaque séance à ton niveau et tes ambitions.",
			"Que tu débutes ou que tu cherches à perfectionner ta technique, je t'accompagne pas à pas pour révéler ton potentiel.",
		],
		image: '/images/gallery/logan-weaver-lgnwvr-MR2vi-J-520-unsplash.jpg',
		imageAlt:
			'Coaching individuel personnalisé – cours privés de boxe avec Btisam Rguibi, Île-de-France',
	},
	{
		tab: 'Evenements',
		title: 'Des <span>événements</span> et compétitions',
		paragraphs: [
			"Participe à des événements uniques : stages intensifs, challenges entre membres, et compétitions amicales pour te mesurer et progresser.",
			"Une communauté soudée qui se retrouve régulièrement pour partager sa passion et repousser ses limites ensemble.",
		],
		image: '/images/gallery/sunday-ii-sunday-DeM9l5sHeFE-unsplash.jpg',
		imageAlt:
			'Événements et stages boxe RG Fight Club – challenges et compétitions amicales',
	},
	{
		tab: 'Association',
		title: 'L\'<span>association</span> RG Fight Club',
		paragraphs: [
			"Rejoins notre association et fais partie d'une famille de combattantes motivées et solidaires. Ensemble, nous créons un espace bienveillant où chacune peut s'épanouir.",
			"Au-delà du sport, c'est un véritable état d'esprit : entraide, dépassement de soi et valorisation de chaque membre.",
		],
		image: '/images/gallery/lisa-marie-theck-bP1rDWiCXcU-unsplash.jpg',
		imageAlt:
			'Association RG Fight Club – communauté et cours de boxe à Aulnay-sous-Bois, Bobigny et 93',
	},
];

function ProjectTabulation({
	prestations,
	activeTab,
	onTabChange,
}: {
	prestations: Prestation[];
	activeTab: number;
	onTabChange: (index: number) => void;
}) {
	return (
		<div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-10 mb-16" data-aos="fade-up">
			{prestations.map((prestation, index) => (
				<button
					key={index}
					onClick={() => onTabChange(index)}
					className={`pb-3 text-lg md:text-xl font-bold font-alt transition-colors cursor-pointer border-b-2 md:flex-1 ${
						activeTab === index
							? 'text-primary border-primary'
							: 'text-gray-400 hover:text-gray-200 border-gray-700 hover:border-gray-200'
					}`}
				>
					{prestation.tab}
				</button>
			))}
		</div>
	);
}

function ProjectContent({
	prestations,
	activeTab,
}: {
	prestations: Prestation[];
	activeTab: number;
}) {
	return (
		<div className="w-full">
			{prestations.map((prestation, index) => (
				<div
					key={index}
					className={`transition-all duration-500 ${activeTab === index
							? 'opacity-100 block'
							: 'opacity-0 hidden'
						}`}
				>
					<div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-between">
						<div className="space-y-6 mb-8 md:mb-0" data-aos="fade-right">
							<h2
								className="text-3xl md:text-4xl lg:text-3xl font-light text-white leading-tight [&_span]:text-primary font-alt italic"
								dangerouslySetInnerHTML={{ __html: prestation.title }}
							/>

							{prestation.paragraphs.map((paragraph, pIndex) => (
								<p
									key={pIndex}
									className="text-base text-white leading-relaxed"
								>
									{paragraph}
								</p>
							))}
						</div>

						<div className="relative w-full shrink-0 p-3 md:w-5/12" data-aos="fade-left" data-aos-delay="200">
							<div className="relative aspect-[4/3] shadow-2xl before:pointer-events-none before:absolute before:top-3 before:left-3 before:z-10 before:h-full before:w-full before:bg-primary before:content-['']">
								<Image
									src={prestation.image}
									alt={prestation.imageAlt}
									fill
									className="object-cover relative z-20"
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default function Projects() {
	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const AOS = require('aos');
			AOS.init({
				duration: 800,
				once: true,
			});
		}
	}, []);

	return (
		<section id="projects" className="py-20 bg-gradient-dark">
			<div className="container mx-auto px-8">
				<ProjectTabulation
					prestations={prestations}
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
				<ProjectContent prestations={prestations} activeTab={activeTab} />
			</div>
		</section>
	);
}
