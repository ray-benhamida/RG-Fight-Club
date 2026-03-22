# Guide de Déploiement

Ce guide vous accompagne dans le déploiement de votre portfolio sur différentes plateformes.

## 🚀 Déploiement sur Vercel (Recommandé)

Vercel est la plateforme officielle de Next.js et offre le meilleur support.

### Étapes :

1. **Créer un compte sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Inscrivez-vous avec GitHub, GitLab ou Bitbucket

2. **Pousser votre code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <votre-repo-github>
   git push -u origin main
   ```

3. **Importer le projet sur Vercel**
   - Cliquez sur "New Project"
   - Sélectionnez votre dépôt GitHub
   - Vercel détectera automatiquement Next.js

4. **Configuration**
   - Framework Preset : **Next.js** (détecté automatiquement)
   - Build Command : `npm run build`
   - Output Directory : `.next`

5. **Variables d'environnement** (optionnel)
   - Ajoutez vos variables d'environnement dans l'interface Vercel
   - Exemple : `NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/...`

6. **Déployer**
   - Cliquez sur "Deploy"
   - Vercel construit et déploie votre site
   - Vous obtenez une URL : `votre-projet.vercel.app`

### Domaine personnalisé

1. Allez dans Project Settings → Domains
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer vos DNS

### Déploiement automatique

- Chaque push sur `main` déclenche un déploiement automatique
- Les pull requests créent des previews automatiques

## 🌐 Déploiement sur Netlify

### Étapes :

1. **Créer un compte sur Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Inscrivez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "New site from Git"
   - Sélectionnez votre dépôt GitHub

3. **Configuration du build**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Créer le fichier netlify.toml**
   
   Créez ce fichier à la racine :
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

5. **Installer le plugin Next.js**
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```

6. **Déployer**
   - Cliquez sur "Deploy site"
   - Votre site sera accessible sur une URL Netlify

## ☁️ Déploiement sur Railway

### Étapes :

1. **Créer un compte sur Railway**
   - Allez sur [railway.app](https://railway.app)
   - Inscrivez-vous avec GitHub

2. **Nouveau projet**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"

3. **Configuration**
   - Railway détecte automatiquement Next.js
   - Ajoutez vos variables d'environnement si nécessaire

4. **Déployer**
   - Le déploiement démarre automatiquement
   - Vous obtenez une URL publique

## 🐳 Déploiement avec Docker

### Créer le Dockerfile

Créez un fichier `Dockerfile` à la racine :

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Créer .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
.env*.local
```

### Modifier next.config.ts

Ajoutez cette ligne :

```typescript
const nextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### Build et Run

```bash
# Build l'image
docker build -t portfolio .

# Run le container
docker run -p 3000:3000 portfolio
```

## 📊 Optimisations avant déploiement

### 1. Optimiser les images

```bash
# Installer sharp pour l'optimisation d'images
npm install sharp
```

### 2. Activer la compression

Next.js compresse automatiquement les fichiers statiques.

### 3. Configurer les en-têtes de cache

Dans `next.config.ts` :

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 4. Activer le mode production

Vérifiez que `NODE_ENV=production` est défini.

## 🔍 Analytics et Monitoring

### Google Analytics

1. Installez le package :
   ```bash
   npm install @next/third-parties
   ```

2. Ajoutez dans `app/layout.tsx` :
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

### Vercel Analytics

Si vous déployez sur Vercel :

```bash
npm install @vercel/analytics
```

Dans `app/layout.tsx` :
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Toutes les images sont optimisées
- [ ] Les variables d'environnement sont configurées
- [ ] Tester le build en local : `npm run build && npm start`
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console
- [ ] Tester sur différents navigateurs
- [ ] Tester le responsive design
- [ ] Vérifier les performances avec Lighthouse
- [ ] Configurer un domaine personnalisé (optionnel)
- [ ] Configurer les analytics (optionnel)
- [ ] Tester tous les liens externes
- [ ] Vérifier le SEO (balises meta, etc.)

## 🛠️ Troubleshooting

### Build échoue sur Vercel

**Problème :** Erreur de build liée aux images manquantes

**Solution :** Assurez-vous que toutes les images existent dans `public/images/`

### Performance lente

**Problème :** Site lent au chargement

**Solutions :**
- Optimisez toutes les images (WebP, compression)
- Utilisez le composant `next/image` (déjà implémenté)
- Vérifiez avec Lighthouse

### Erreur de types TypeScript

**Problème :** Erreurs TypeScript lors du build

**Solution :**
```bash
npm run lint
npm run build
```

Corrigez les erreurs remontées.

## 📈 Surveillance post-déploiement

1. **Uptime Monitoring**
   - Utilisez [UptimeRobot](https://uptimerobot.com) (gratuit)
   - Configure un ping toutes les 5 minutes

2. **Error Tracking**
   - Intégrez [Sentry](https://sentry.io) pour tracker les erreurs

3. **Performance Monitoring**
   - Utilisez Google PageSpeed Insights
   - Vercel Analytics (si sur Vercel)

## 🔄 Mises à jour

Pour déployer des mises à jour :

```bash
git add .
git commit -m "Description de la mise à jour"
git push origin main
```

Vercel/Netlify déploiera automatiquement.

## 🆘 Support

- **Vercel :** [vercel.com/docs](https://vercel.com/docs)
- **Netlify :** [docs.netlify.com](https://docs.netlify.com)
- **Next.js :** [nextjs.org/docs](https://nextjs.org/docs)
