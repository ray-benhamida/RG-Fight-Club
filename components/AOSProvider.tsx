'use client';

import { useEffect } from 'react';
import AOS from 'aos';

/**
 * Initialise AOS une seule fois après l'hydratation pour éviter les mismatches
 * serveur/client (AOS ajoute des styles inline sur les éléments data-aos).
 */
export default function AOSProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			AOS.init({
				duration: 800,
				once: true,
				offset: 50,
			});
		});

		return () => cancelAnimationFrame(frame);
	}, []);

	return children;
}
