# Portfolio RG Fightclub

Portfolio professionnel moderne développé avec Next.js, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- **Design moderne et responsive** - Fonctionne parfaitement sur tous les appareils
- **Animations fluides** - Utilisation d'AOS (Animate On Scroll) pour des animations élégantes
- **Composants modulaires** - Architecture propre et maintenable
- **Performance optimisée** - Next.js 15 avec optimisations d'images et de fonts
- **TypeScript** - Code type-safe pour une meilleure maintenabilité

## 📦 Technologies

- [Next.js 15](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [AOS](https://michalsnik.github.io/aos/) - Animations on scroll
- [Swiper](https://swiperjs.com/) - Slider moderne
- [React Icons](https://react-icons.github.io/react-icons/) - Bibliothèque d'icônes

## 🛠️ Installation

1. Clonez le dépôt :
```bash
git clone <votre-repo>
cd rg-fightclub
```

2. Installez les dépendances :
```bash
npm install
```

3. Ajoutez vos images dans le dossier `public/images/` (voir `public/images/README.md` pour les détails)

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📂 Structure du projet

```
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   ├── Header.tsx       # En-tête avec navigation
│   ├── Hero.tsx         # Section hero
│   ├── Presentation.tsx # Section présentation
│   ├── Projects.tsx     # Section projets
│   ├── Gallery.tsx      # Galerie d'images
│   ├── Testimonials.tsx # Témoignages clients
│   └── Footer.tsx       # Pied de page
└── public/
    └── images/          # Vos images
```

## 🎨 Personnalisation

### Modifier les informations personnelles

Éditez les composants dans le dossier `components/` :

- **Header.tsx** - Logo et liens de navigation
- **Hero.tsx** - Titre et description principale
- **Presentation.tsx** - Votre nom, poste et description
- **Projects.tsx** - Vos projets
- **Testimonials.tsx** - Témoignages de clients
- **Footer.tsx** - Informations de contact

### Modifier les liens Instagram

Remplacez `https://www.instagram.com/votrecompte` par votre compte Instagram dans :
- `components/Header.tsx`
- `components/Presentation.tsx`
- `components/Footer.tsx`

### Ajouter vos images

Placez vos images dans `public/images/` en suivant les instructions dans `public/images/README.md`

### Modifier les couleurs

Les couleurs principales sont dans Tailwind. Pour changer le bleu (#2563eb), recherchez `blue-600` dans les fichiers et remplacez par votre couleur préférée.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez-vous sur [Vercel](https://vercel.com)
3. Importez votre dépôt
4. Vercel détectera automatiquement Next.js et déploiera votre site

### Netlify

1. Build le projet : `npm run build`
2. Déployez le dossier `.next` sur Netlify

## 📝 Scripts disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Crée la version de production
npm run start    # Démarre le serveur de production
npm run lint     # Vérifie le code avec ESLint
```

## 📸 Sections du portfolio

1. **Header** - Navigation fixe avec liens vers les sections
2. **Hero** - Section d'accueil avec image de fond et call-to-action
3. **Présentation** - Votre profil et compétences
4. **Projets** - Showcase de vos projets avec système d'onglets
5. **Galerie** - Grid d'images avec effet hover
6. **Témoignages** - Slider de témoignages clients
7. **Footer** - Informations de contact et liens sociaux

## 🤝 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

## 📄 Licence

Ce projet est sous licence MIT.
