/**
 * URL canonique du site (production).
 * Définir NEXT_PUBLIC_SITE_URL dans .env.local après déploiement (ex. https://rgfightclub.fr).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://rg-fight-club.vercel.app";
}

export const siteConfig = {
  name: "RG Fight Club",
  shortName: "RG Fight Club",
  titleTemplate: "%s | RG Fight Club",
  defaultTitle: "RG Fight Club – Boxe et coaching sportif en Seine-Saint-Denis",
  description:
    "Cours de boxe et coaching sportif avec Btisam Rguibi. Cours collectifs et individuels, association RG Fight Club. Zone 93 : Aulnay-sous-Bois, Bobigny, Île-de-France.",
  locale: "fr_FR",
  themeColor: "#FF6B00",
  /** Instagram @rg_fight_club */
  instagramUrl: "https://www.instagram.com/rg_fight_club",
  coachName: "Btisam Rguibi",
  coachJobTitle: "Coach sportif – boxe",
  /** Référencement local (à affiner avec adresse précise quand disponible) */
  geo: {
    region: "Île-de-France",
    department: "Seine-Saint-Denis",
    cities: ["Aulnay-sous-Bois", "Bobigny"],
    country: "FR",
    /** Centre approximatif du 93 (à remplacer par coordonnées exactes du lieu) */
    latitude: 48.91,
    longitude: 2.38,
  },
  /** Renseigner quand l’adresse / le téléphone sont connus (SEO + JSON-LD) */
  contact: {
    streetAddress: undefined as string | undefined,
    postalCode: undefined as string | undefined,
    addressLocality: undefined as string | undefined,
    telephone: undefined as string | undefined,
    email: undefined as string | undefined,
  },
};
