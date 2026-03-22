# 📁 Structure du Projet

Guide complet de l'organisation des fichiers du portfolio.

## 🌳 Arborescence

```
RG Fightclub/
├── app/                          # Dossier principal Next.js (App Router)
│   ├── favicon.ico              # Icône du site
│   ├── globals.css              # Styles globaux + AOS
│   ├── layout.tsx               # Layout principal (wrapper)
│   └── page.tsx                 # Page d'accueil (assemble tous les composants)
│
├── components/                   # Composants React réutilisables
│   ├── Header.tsx               # En-tête avec navigation
│   ├── Hero.tsx                 # Section héro avec image de fond
│   ├── Presentation.tsx         # Section À propos
│   ├── Projects.tsx             # Section projets avec onglets
│   ├── Gallery.tsx              # Galerie d'images
│   ├── Testimonials.tsx         # Slider de témoignages
│   └── Footer.tsx               # Pied de page
│
├── types/                        # Définitions TypeScript
│   └── index.ts                 # Types personnalisés (Project, Testimonial, etc.)
│
├── public/                       # Fichiers statiques accessibles publiquement
│   ├── images/                  # Dossier pour vos images
│   │   ├── README.md           # Instructions pour les images
│   │   └── .gitkeep            # Garde le dossier dans Git
│   ├── file.svg                # SVG par défaut Next.js
│   ├── globe.svg               # SVG par défaut Next.js
│   ├── next.svg                # Logo Next.js
│   ├── vercel.svg              # Logo Vercel
│   └── window.svg              # SVG par défaut Next.js
│
├── node_modules/                 # Dépendances (généré par npm)
│
├── Documentation/                # Guides et documentation
│   ├── README.md               # Documentation principale
│   ├── QUICKSTART.md           # Guide de démarrage rapide
│   ├── CUSTOMIZATION.md        # Guide de personnalisation détaillé
│   ├── DEPLOYMENT.md           # Guide de déploiement
│   ├── SEO.md                  # Guide SEO et métadonnées
│   ├── FEATURES.md             # Fonctionnalités avancées
│   ├── RESOURCES.md            # Ressources et outils utiles
│   └── PROJECT_STRUCTURE.md    # Ce fichier
│
├── .gitignore                    # Fichiers ignorés par Git
├── .env.example                  # Exemple de variables d'environnement
├── eslint.config.mjs            # Configuration ESLint
├── next.config.ts               # Configuration Next.js
├── package.json                 # Dépendances et scripts npm
├── package-lock.json            # Lock des versions de dépendances
├── postcss.config.mjs           # Configuration PostCSS
└── tsconfig.json                # Configuration TypeScript
```

## 📄 Description des fichiers clés

### 🎨 Fichiers de configuration

#### `package.json`
Gère les dépendances et les scripts npm.

**Scripts disponibles :**
```json
{
  "dev": "next dev",           // Démarre le serveur de développement
  "build": "next build",       // Construit la version de production
  "start": "next start",       // Démarre le serveur de production
  "lint": "eslint"             // Vérifie le code
}
```

**Dépendances principales :**
- `next` - Framework React
- `react` - Bibliothèque React
- `react-dom` - React pour le DOM
- `tailwindcss` - Framework CSS
- `typescript` - TypeScript
- `aos` - Animations on scroll
- `swiper` - Slider
- `react-icons` - Icônes

#### `tsconfig.json`
Configuration TypeScript pour le projet.

**Points clés :**
- `strict: true` - Mode strict activé
- `paths: { "@/*": ["./*"] }` - Alias pour imports propres
- `jsx: "preserve"` - Préserve le JSX pour Next.js

#### `next.config.ts`
Configuration Next.js.

**Options possibles :**
```typescript
const nextConfig = {
  images: {
    domains: ['votre-cdn.com'], // Domaines autorisés pour les images
  },
  compress: true,               // Compression activée
};
```

#### `.gitignore`
Liste des fichiers à ne pas commiter dans Git.

**Inclut :**
- `node_modules/` - Dépendances
- `.next/` - Build Next.js
- `.env*.local` - Variables d'environnement locales

#### `.env.example`
Template pour les variables d'environnement.

**À copier en `.env.local` pour l'utiliser :**
```bash
cp .env.example .env.local
```

### 📱 App Directory (Next.js 13+)

#### `app/layout.tsx`
Layout principal qui enveloppe toutes les pages.

**Responsabilités :**
- Définit la structure HTML de base
- Import des fonts (Geist Sans, Geist Mono)
- Import des styles globaux
- Métadonnées SEO de base

#### `app/page.tsx`
Page d'accueil du portfolio.

**Contenu :**
- Importe tous les composants
- Les assemble dans l'ordre correct
- C'est le point d'entrée principal

#### `app/globals.css`
Styles CSS globaux.

**Contient :**
- Import de Tailwind CSS
- Import d'AOS CSS
- Variables CSS personnalisées
- Reset CSS de base
- Styles pour Swiper

### 🧩 Composants

#### `components/Header.tsx`
En-tête fixe avec navigation.

**Fonctionnalités :**
- Navigation sticky
- Change de style au scroll
- Liens de navigation smooth scroll
- Bouton Contact vers Instagram
- Menu burger pour mobile (à implémenter)

**Props :** Aucune

**État :**
- `isScrolled` - Booléen pour savoir si la page a scrollé

#### `components/Hero.tsx`
Section héro avec image de fond.

**Fonctionnalités :**
- Image de fond en fullscreen
- Overlay sombre
- Titre et description animés (AOS)
- Bouton "Découvrir" avec smooth scroll
- Indicateur de scroll animé

**Props :** Aucune

#### `components/Presentation.tsx`
Section "À propos" avec photo et informations.

**Fonctionnalités :**
- Layout grid responsive (image + texte)
- Photo à gauche
- Informations à droite
- Bouton Contact vers Instagram
- Animations AOS

**Props :** Aucune

#### `components/Projects.tsx`
Section projets avec système d'onglets.

**Fonctionnalités :**
- 4 onglets pour 4 projets
- Changement de contenu au clic
- Animations de transition
- Image + description pour chaque projet
- Tags de technologies
- Animations AOS

**État :**
- `activeTab` - Index du projet actif

**Données :**
- Array `projects` - Liste des projets

#### `components/Gallery.tsx`
Galerie d'images en grid.

**Fonctionnalités :**
- Grid responsive (2 cols mobile, 4 cols desktop)
- Effet hover (zoom + overlay)
- Animations AOS avec délais progressifs
- Images optimisées avec next/image

**Données :**
- Array `images` - Liste des images

#### `components/Testimonials.tsx`
Slider de témoignages clients.

**Fonctionnalités :**
- Slider Swiper
- Autoplay activé
- Navigation (flèches + pagination)
- Responsive (1 slide mobile, 2 desktop)
- Animations AOS
- Photos clients + étoiles

**Données :**
- Array `testimonials` - Liste des témoignages

**Configurations Swiper :**
- `delay: 5000` - Temps entre slides
- `slidesPerView: 1/2` - Nombre de slides visibles

#### `components/Footer.tsx`
Pied de page avec informations de contact.

**Fonctionnalités :**
- Grid responsive
- Logo et description
- Liens de navigation
- Réseaux sociaux (Instagram, GitHub, LinkedIn, Twitter)
- Informations de contact
- Copyright dynamique

**Props :** Aucune

### 📦 Types

#### `types/index.ts`
Définitions TypeScript pour le projet.

**Interfaces :**
```typescript
Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  text: string
  rating: number
}

GalleryImage {
  id: number
  src: string
  alt: string
}
```

## 🎯 Flux de données

### Page principale (app/page.tsx)
```
page.tsx
  ↓
  ├─ Header
  ├─ Hero
  ├─ Presentation
  ├─ Projects (avec state activeTab)
  ├─ Gallery
  ├─ Testimonials (avec Swiper)
  └─ Footer
```

### Styles
```
globals.css
  ├─ Tailwind CSS (base, components, utilities)
  ├─ AOS styles
  ├─ Custom Swiper styles
  └─ Autres styles globaux
```

## 🔧 Scripts npm

### Développement
```bash
npm run dev
```
- Démarre le serveur sur http://localhost:3000
- Hot reload activé
- Mode développement avec erreurs détaillées

### Build de production
```bash
npm run build
```
- Compile le projet
- Optimise les assets
- Génère le dossier `.next/`
- Vérifie les erreurs TypeScript et ESLint

### Production
```bash
npm run start
```
- Démarre le serveur de production
- Nécessite d'avoir fait `npm run build` avant

### Linting
```bash
npm run lint
```
- Vérifie le code avec ESLint
- Affiche les erreurs et warnings

## 📝 Conventions de code

### Nommage des composants
- **PascalCase** pour les composants : `Header.tsx`, `Hero.tsx`
- **camelCase** pour les fonctions : `scrollToSection`, `handleClick`
- **UPPERCASE** pour les constantes : `MAX_ITEMS`, `API_URL`

### Organisation des imports
```typescript
// 1. Imports externes
import { useState } from 'react';
import Image from 'next/image';

// 2. Imports internes
import Header from '@/components/Header';

// 3. Imports de types
import type { Project } from '@/types';

// 4. Imports de styles
import 'aos/dist/aos.css';
```

### Structure d'un composant
```typescript
'use client'; // Si nécessaire

// Imports

// Types/Interfaces

// Constantes

// Composant principal
export default function Component() {
  // Hooks
  // Fonctions
  // Return JSX
}
```

## 🎨 Conventions Tailwind

### Classes dans l'ordre
```typescript
className="
  // Layout
  flex flex-col items-center
  // Spacing
  p-4 mb-8
  // Sizing
  w-full h-screen
  // Colors
  bg-blue-600 text-white
  // Typography
  text-xl font-bold
  // Effects
  hover:bg-blue-700 transition-colors
  // Responsive
  md:flex-row lg:p-8
"
```

## 🚀 Prochaines étapes

### Ajouts possibles
1. **Dossier `lib/`** - Utilitaires et helpers
2. **Dossier `hooks/`** - Hooks personnalisés
3. **Dossier `constants/`** - Constantes globales
4. **Dossier `utils/`** - Fonctions utilitaires
5. **Dossier `api/`** - Routes API Next.js

### Exemple d'évolution
```
├── lib/
│   ├── utils.ts              # Fonctions utilitaires
│   └── constants.ts          # Constantes
├── hooks/
│   ├── useScroll.ts          # Hook de scroll
│   └── useMediaQuery.ts      # Hook responsive
└── api/
    └── contact/
        └── route.ts          # API de contact
```

## 📚 Ressources

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Components](https://react.dev/learn/your-first-component)
- [TypeScript Handbook](https://typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Note :** Cette structure est évolutive. N'hésitez pas à l'adapter selon vos besoins !
