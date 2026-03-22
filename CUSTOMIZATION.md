# Guide de Personnalisation

Ce guide vous aidera à personnaliser facilement votre portfolio.

## 🎨 Personnalisation des composants

### 1. Header (Navigation)

**Fichier :** `components/Header.tsx`

**À modifier :**
- **Logo** : Ligne 38 - Changez "RG" par vos initiales
- **Liens Instagram** : Ligne 68 - Remplacez l'URL
- **Sections de navigation** : Lignes 54-75 - Personnalisez les liens

```typescript
// Exemple de modification du logo
<Link href="/" className="...">
  VOS_INITIALES<span className="text-blue-600">.</span>
</Link>
```

### 2. Hero (Section d'accueil)

**Fichier :** `components/Hero.tsx`

**À modifier :**
- **Image de fond** : Ligne 28 - Changez le chemin de l'image
- **Titre principal** : Ligne 38-40 - Personnalisez votre accroche
- **Description** : Ligne 44-48 - Décrivez votre activité

```typescript
<h1 className="..." data-aos="fade-up">
  Votre Titre Principal Ici
</h1>
```

**Astuce :** Utilisez une image haute résolution (1920x1080px minimum) pour le fond.

### 3. Présentation (À propos)

**Fichier :** `components/Presentation.tsx`

**À modifier :**
- **Nom** : Ligne 31-33 - Votre nom complet
- **Poste** : Ligne 34-36 - Votre titre professionnel
- **Description** : Lignes 37-48 - Votre présentation
- **Photo** : Ligne 25 - Chemin vers votre photo

```typescript
<h2 className="...">
  Votre Nom Complet
</h2>
<p className="...">
  Votre Titre Professionnel
</p>
```

**Astuce :** Utilisez une photo professionnelle de haute qualité (800x1000px).

### 4. Projects (Projets)

**Fichier :** `components/Projects.tsx`

**À modifier :** Les données des projets (lignes 16-54)

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Nom du projet',
    description: 'Description détaillée...',
    image: '/images/project1.jpg',
    tags: ['Tech1', 'Tech2', 'Tech3'],
  },
  // Ajoutez jusqu'à 4 projets
];
```

**Astuce :** 
- Utilisez des images de 800x600px
- Limitez-vous à 4-5 tags par projet
- Écrivez des descriptions concises (2-3 phrases)

### 5. Gallery (Galerie)

**Fichier :** `components/Gallery.tsx`

**À modifier :** Les images de la galerie (lignes 6-15)

```typescript
const images = [
  { id: 1, src: '/images/gallery1.jpg', alt: 'Description' },
  // Ajoutez autant d'images que vous voulez
];
```

**Options :**
- Modifier le nombre de colonnes : Ligne 38 `grid-cols-2 md:grid-cols-4`
- Changer la hauteur des images : Ligne 44 `h-64`

### 6. Testimonials (Témoignages)

**Fichier :** `components/Testimonials.tsx`

**À modifier :** Les témoignages (lignes 24-64)

```typescript
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nom du client',
    role: 'Poste',
    company: 'Entreprise',
    image: '/images/client1.jpg',
    text: 'Le témoignage complet...',
    rating: 5,
  },
  // Ajoutez autant de témoignages que nécessaire
];
```

**Paramètres du slider (lignes 81-95) :**
- `delay: 5000` - Temps entre chaque slide (en ms)
- `slidesPerView: 1` - Nombre de slides visibles
- `spaceBetween: 30` - Espace entre les slides

### 7. Footer (Pied de page)

**Fichier :** `components/Footer.tsx`

**À modifier :**
- **Logo** : Ligne 26 - Vos initiales
- **Description** : Lignes 29-33
- **Réseaux sociaux** : Lignes 35-73 - Vos liens
- **Informations de contact** : Lignes 107-109

```typescript
<div className="...">
  <ul className="...">
    <li>Votre Ville, Pays</li>
    <li>votre@email.com</li>
    <li>+33 X XX XX XX XX</li>
  </ul>
</div>
```

## 🎨 Personnalisation des couleurs

### Couleur principale (Bleu)

Recherchez et remplacez toutes les occurrences de :
- `blue-600` → `votre-couleur-600`
- `blue-700` → `votre-couleur-700`
- `blue-100` → `votre-couleur-100`

**Couleurs Tailwind disponibles :**
- `red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`

### Couleur d'overlay Hero

**Fichier :** `components/Hero.tsx`, Ligne 33

```typescript
<div className="absolute inset-0 bg-black/60" />
// Changez /60 pour ajuster l'opacité (0-100)
```

## ⚡ Personnalisation des animations

Les animations utilisent AOS (Animate On Scroll).

### Modifier les animations existantes

**Attributs disponibles :**
- `data-aos="fade-up"` - Apparition depuis le bas
- `data-aos="fade-down"` - Apparition depuis le haut
- `data-aos="fade-right"` - Apparition depuis la droite
- `data-aos="fade-left"` - Apparition depuis la gauche
- `data-aos="zoom-in"` - Zoom avant
- `data-aos="flip-left"` - Rotation

### Délai d'animation

```typescript
data-aos-delay="200" // Délai en millisecondes
```

### Durée d'animation

Modifiez dans chaque composant :
```typescript
AOS.init({
  duration: 1000, // Durée en ms (défaut: 1000)
  once: true,     // Animation une seule fois (true/false)
});
```

## 📱 Responsive Design

Le portfolio est entièrement responsive. Les breakpoints Tailwind :

- `sm:` - ≥ 640px (téléphones en paysage)
- `md:` - ≥ 768px (tablettes)
- `lg:` - ≥ 1024px (ordinateurs portables)
- `xl:` - ≥ 1280px (grands écrans)

### Exemple de modification responsive

```typescript
<div className="text-xl md:text-3xl lg:text-5xl">
  // text-xl sur mobile
  // text-3xl sur tablette
  // text-5xl sur desktop
</div>
```

## 🖼️ Optimisation des images

### Format recommandé
- Format : **WebP** ou **JPG** (PNG pour la transparence)
- Compression : Utilisez [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app)

### Tailles recommandées
- **Hero background :** 1920x1080px
- **Profile :** 800x1000px
- **Projects :** 800x600px
- **Gallery :** 600x600px
- **Clients :** 200x200px (carré)

## 🔗 Liens et URLs

Tous les liens externes devraient avoir :
```typescript
target="_blank"           // Ouvre dans un nouvel onglet
rel="noopener noreferrer" // Sécurité
```

## 🚀 Conseils de performance

1. **Optimisez toutes vos images** avant de les ajouter
2. **Limitez le nombre d'images** dans la galerie (8-12 max)
3. **Utilisez des images WebP** quand c'est possible
4. **Testez sur mobile** régulièrement

## 📝 Checklist finale

Avant de déployer :

- [ ] Remplacer toutes les images placeholder
- [ ] Modifier tous les textes par vos informations
- [ ] Vérifier tous les liens (Instagram, GitHub, etc.)
- [ ] Tester sur mobile et desktop
- [ ] Optimiser toutes les images
- [ ] Vérifier les fautes d'orthographe
- [ ] Tester le temps de chargement
- [ ] Vérifier le responsive design

## 💡 Besoin d'aide ?

Consultez la documentation des technologies utilisées :
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [AOS](https://michalsnik.github.io/aos/)
- [Swiper](https://swiperjs.com/react)
