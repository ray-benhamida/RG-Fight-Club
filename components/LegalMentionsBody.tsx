/**
 * Corps des mentions légales (modale footer).
 */
export default function LegalMentionsBody() {
	return (
		<div className="space-y-6">
			<section>
				<h3 className="font-display mb-2 text-xl font-bold">1. Éditeur du site</h3>
				<p>Le présent site est édité par :</p>
				<p className="mt-3">
					<strong>RG FIGHT CLUB</strong>
					<br />
					Association loi 1901
					<br />
					SIREN : 939 264 826
					<br />
					SIRET : 939 264 826 00016
					<br />
					Numéro RNA : W932011144
					<br />
					Siège social : 90 Route de Bondy, 93600 Aulnay-sous-Bois, France
					<br />
					Email :{" "}
					<a
						href="mailto:rgfightclub93@gmail.com"
						className="text-(--color-primary) underline underline-offset-2 hover:opacity-90"
					>
						rgfightclub93@gmail.com
					</a>
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">2. Directeur de la publication</h3>
				<p>Le directeur de la publication est :</p>
				<p className="mt-3">
					<strong>Btisam RGUIBI</strong>
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">3. Hébergement</h3>
				<p>Le site est hébergé par :</p>
				<p className="mt-3">
					Vercel Inc.
					<br />
					440 N Barranca Ave #4133
					<br />
					Covina, CA 91723
					<br />
					États-Unis
					<br />
					Site web :{" "}
					<a
						href="https://vercel.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-(--color-primary) underline underline-offset-2 hover:opacity-90"
					>
						https://vercel.com
					</a>
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">4. Propriété intellectuelle</h3>
				<p>
					L&apos;ensemble des contenus présents sur le site (textes, images, graphismes, logo, etc.) sont la
					propriété exclusive de RG FIGHT CLUB, sauf mention contraire.
				</p>
				<p className="mt-3">
					Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même
					partielle, de ces différents éléments est strictement interdite sans l&apos;accord écrit préalable de RG
					FIGHT CLUB.
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">5. Responsabilité</h3>
				<p>
					RG FIGHT CLUB s&apos;efforce de fournir sur le site des informations aussi précises que possible.
					Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la
					mise à jour.
				</p>
				<p className="mt-3">
					L&apos;utilisateur du site reconnaît disposer de la compétence et des moyens nécessaires pour accéder et
					utiliser ce site.
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">6. Données personnelles</h3>
				<p>Le site ne collecte aucune donnée personnelle.</p>
				<p className="mt-3">
					Aucun formulaire de contact, d&apos;inscription ou de collecte de données n&apos;est présent sur le site.
				</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">7. Cookies</h3>
				<p>Le site n&apos;utilise pas de cookies nécessitant le consentement de l&apos;utilisateur.</p>
			</section>

			<section>
				<h3 className="font-display mb-2 text-xl font-bold">8. Droit applicable</h3>
				<p>Tout litige en relation avec l&apos;utilisation du site est soumis au droit français.</p>
				<p className="mt-3">
					Les tribunaux compétents sont ceux du ressort du siège social de l&apos;association.
				</p>
			</section>
		</div>
	);
}
