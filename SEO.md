# Guide SEO et Métadonnées

Ce guide vous aide à optimiser votre portfolio pour les moteurs de recherche.

## 🎯 Métadonnées de base

Modifiez `app/layout.tsx` :

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Rayan Benhamida - Développeur Fullstack',
    template: '%s | Rayan Benhamida',
  },
  description:
    'Portfolio de Rayan Benhamida, développeur fullstack spécialisé en React, Next.js et Node.js. Création d\'applications web modernes et performantes.',
  keywords: [
    'développeur fullstack',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'portfolio développeur',
    'web developer',
  ],
  authors: [{ name: 'Rayan Benhamida' }],
  creator: 'Rayan Benhamida',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-site.com',
    title: 'Rayan Benhamida - Développeur Fullstack',
    description:
      'Portfolio de Rayan Benhamida, développeur fullstack spécialisé en React, Next.js et Node.js.',
    siteName: 'Rayan Benhamida Portfolio',
    images: [
      {
        url: 'https://votre-site.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rayan Benhamida - Développeur Fullstack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rayan Benhamida - Développeur Fullstack',
    description:
      'Portfolio de Rayan Benhamida, développeur fullstack spécialisé en React, Next.js et Node.js.',
    images: ['https://votre-site.com/og-image.jpg'],
    creator: '@votrecompte',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-google-search-console',
    yandex: 'votre-code-yandex',
  },
};
```

## 🖼️ Image Open Graph

Créez une image `public/og-image.jpg` :
- Dimensions : 1200x630px
- Format : JPG ou PNG
- Contenu : Votre nom, titre, et un visuel attractif

Outils pour créer l'image :
- [Canva](https://canva.com)
- [Figma](https://figma.com)
- [OG Image Generator](https://og-image.vercel.app)

## 🗺️ Sitemap

Créez `app/sitemap.ts` :

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://votre-site.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#presentation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

## 🤖 Robots.txt

Créez `app/robots.ts` :

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://votre-site.com/sitemap.xml',
  };
}
```

## 📊 JSON-LD Structured Data

Créez `components/StructuredData.tsx` :

```typescript
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rayan Benhamida',
    jobTitle: 'Développeur Fullstack',
    url: 'https://votre-site.com',
    sameAs: [
      'https://www.instagram.com/votrecompte',
      'https://github.com/votrecompte',
      'https://linkedin.com/in/votrecompte',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    description:
      'Développeur fullstack spécialisé en React, Next.js et Node.js',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

Ajoutez dans `app/layout.tsx` :

```typescript
import StructuredData from '@/components/StructuredData';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 🔍 Google Search Console

### Configuration

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété (site web)
3. Vérifiez votre propriété via :
   - Balise HTML (ajoutez dans `app/layout.tsx`)
   - Fichier HTML (téléchargez dans `public/`)
   - DNS

4. Soumettez votre sitemap :
   ```
   https://votre-site.com/sitemap.xml
   ```

## 📈 Google Analytics

### Google Analytics 4

1. Créez un compte sur [Google Analytics](https://analytics.google.com)

2. Installez le package :
```bash
npm install @next/third-parties
```

3. Dans `app/layout.tsx` :

```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

## 🎨 Favicon

Créez les fichiers suivants dans `app/` :

### favicon.ico
Téléchargez ou créez votre favicon (32x32px)

### apple-icon.png
Image pour iOS (180x180px)

### icon.png
Image pour Android (192x192px)

Ou utilisez `app/icon.tsx` :

```typescript
import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#2563eb',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        RG
      </div>
    ),
    {
      ...size,
    }
  );
}
```

## 🚀 Performance SEO

### 1. Optimisation des images

Next.js optimise automatiquement les images avec le composant `Image`.

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description précise de l'image"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

### 2. Lazy Loading

Les images et composants sont déjà chargés en lazy par défaut.

Pour les composants :
```typescript
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <p>Chargement...</p>,
});
```

### 3. Minification

Next.js minifie automatiquement CSS et JavaScript.

### 4. Compression

Activez la compression dans `next.config.ts` :

```typescript
const nextConfig = {
  compress: true,
};
```

## 📱 Progressive Web App (PWA)

Installez :
```bash
npm install next-pwa
```

Créez `public/manifest.json` :

```json
{
  "name": "Rayan Benhamida - Portfolio",
  "short_name": "RB Portfolio",
  "description": "Portfolio de Rayan Benhamida",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Dans `app/layout.tsx` :

```typescript
export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#2563eb',
};
```

## 🔗 Liens internes

Utilisez `next/link` pour tous les liens internes :

```typescript
import Link from 'next/link';

<Link href="/#projects">Mes Projets</Link>
```

## 📊 Outils d'analyse SEO

### Lighthouse

1. Ouvrez Chrome DevTools
2. Onglet Lighthouse
3. Générez un rapport
4. Cible : Score > 90 dans toutes les catégories

### PageSpeed Insights

Testez sur [PageSpeed Insights](https://pagespeed.web.dev/)

### GTmetrix

Testez sur [GTmetrix](https://gtmetrix.com/)

## ✅ Checklist SEO

Avant de déployer :

- [ ] Métadonnées complètes (title, description, keywords)
- [ ] Open Graph tags configurés
- [ ] Twitter Card configurée
- [ ] Image OG créée (1200x630px)
- [ ] Favicon ajouté
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] Structured Data (JSON-LD) ajouté
- [ ] Google Analytics installé
- [ ] Toutes les images ont des attributs alt
- [ ] URLs propres et descriptives
- [ ] Temps de chargement < 3 secondes
- [ ] Score Lighthouse > 90
- [ ] Responsive sur tous les appareils
- [ ] HTTPS activé
- [ ] Pas de contenu dupliqué
- [ ] Balises H1, H2, H3 correctement hiérarchisées

## 🎯 Bonnes pratiques

### Titres de page

```typescript
// Unique et descriptif (50-60 caractères)
title: 'Rayan Benhamida - Développeur Fullstack React & Node.js'
```

### Descriptions

```typescript
// Attractive et informative (150-160 caractères)
description: 'Développeur fullstack passionné. Création d\'applications web modernes avec React, Next.js et Node.js. Découvrez mon portfolio et mes projets.'
```

### Alt texte des images

```typescript
// Descriptif et contextualisé
alt: 'Tableau de bord analytics développé par Rayan Benhamida avec React et D3.js'
```

### URL structure

```
✅ Bon : https://votre-site.com/#projects
❌ Éviter : https://votre-site.com/?page=projects&id=1
```

## 📚 Ressources

- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
