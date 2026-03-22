# 🚀 Démarrage Rapide

Bienvenue dans votre nouveau portfolio ! Suivez ce guide pour le personnaliser en 15 minutes.

## ⚡ Étape 1 : Vérifier l'installation

Le projet est déjà installé et le serveur de développement est en cours d'exécution.

Ouvrez votre navigateur sur : **http://localhost:3000**

Si le serveur n'est pas lancé :
```bash
npm run dev
```

## 📸 Étape 2 : Ajouter vos images (PRIORITÉ)

Ajoutez vos images dans le dossier `public/images/` :

### Images obligatoires :

1. **hero-bg.jpg** - Image de fond pour la section Hero (1920x1080px)
2. **profile.jpg** - Votre photo (800x1000px)
3. **project1.jpg à project4.jpg** - Images de vos projets (800x600px)
4. **gallery1.jpg à gallery8.jpg** - Images pour la galerie (600x600px)
5. **client1.jpg à client4.jpg** - Photos des clients (200x200px, carrées)

> 💡 **Astuce :** Vous pouvez télécharger des images gratuites sur [Unsplash](https://unsplash.com) ou [Pexels](https://pexels.com) pour commencer.

## ✏️ Étape 3 : Personnaliser vos informations

### A. Header (`components/Header.tsx`)

Ligne 38 - Changez le logo :
```typescript
RG → VOS_INITIALES
```

Ligne 68 - Changez l'URL Instagram :
```typescript
https://www.instagram.com/votrecompte → VOTRE_URL
```

### B. Hero (`components/Hero.tsx`)

Lignes 38-48 - Modifiez le titre et la description :
```typescript
<h1>Votre Titre Principal</h1>
<p>Votre description</p>
```

### C. Présentation (`components/Presentation.tsx`)

Lignes 31-48 - Changez :
- Votre nom (ligne 31)
- Votre poste (ligne 34)
- Votre description (lignes 37-48)

### D. Projets (`components/Projects.tsx`)

Lignes 16-54 - Modifiez les 4 projets :
```typescript
{
  id: 1,
  title: 'Nom de votre projet',
  description: 'Description...',
  image: '/images/project1.jpg',
  tags: ['Tech1', 'Tech2'],
}
```

### E. Témoignages (`components/Testimonials.tsx`)

Lignes 24-64 - Modifiez les témoignages clients

### F. Footer (`components/Footer.tsx`)

Lignes 107-109 - Changez vos coordonnées :
```typescript
<li>Votre Ville, Pays</li>
<li>votre@email.com</li>
<li>+33 X XX XX XX XX</li>
```

## 🎨 Étape 4 : Personnaliser les couleurs (Optionnel)

Pour changer la couleur principale (bleu) :

Recherchez dans tous les fichiers et remplacez :
- `blue-600` → `purple-600` (ou autre couleur)
- `blue-700` → `purple-700`
- `blue-100` → `purple-100`

**Couleurs Tailwind disponibles :**
`red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`

## 🔗 Étape 5 : Configurer vos liens sociaux

Remplacez dans tous les fichiers :

```
https://www.instagram.com/votrecompte → Votre Instagram
https://github.com/votrecompte → Votre GitHub
https://linkedin.com/in/votrecompte → Votre LinkedIn
https://twitter.com/votrecompte → Votre Twitter
```

Fichiers concernés :
- `components/Header.tsx`
- `components/Presentation.tsx`
- `components/Footer.tsx`

## ✅ Étape 6 : Vérifier le résultat

1. Sauvegardez tous les fichiers
2. Le site se recharge automatiquement
3. Vérifiez chaque section sur http://localhost:3000
4. Testez sur mobile (F12 → Mode responsive dans Chrome)

## 🚀 Étape 7 : Déployer (Quand vous êtes prêt)

### Option 1 : Vercel (Recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Poussez votre code sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <votre-repo>
   git push -u origin main
   ```
3. Sur Vercel, cliquez "New Project"
4. Importez votre repo GitHub
5. Cliquez "Deploy"

Votre site sera en ligne en 2 minutes ! 🎉

### Option 2 : Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Faites "New site from Git"
3. Sélectionnez votre repo GitHub
4. Cliquez "Deploy"

## 📚 Documentation complète

Pour aller plus loin, consultez :

- **CUSTOMIZATION.md** - Guide détaillé de personnalisation
- **FEATURES.md** - Fonctionnalités avancées à ajouter
- **DEPLOYMENT.md** - Guide de déploiement complet
- **SEO.md** - Optimisation pour les moteurs de recherche
- **README.md** - Documentation technique

## 🆘 Besoin d'aide ?

### Problème : Le serveur ne démarre pas

```bash
# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problème : Les images ne s'affichent pas

1. Vérifiez que les images sont dans `public/images/`
2. Vérifiez les noms des fichiers (sensible à la casse)
3. Vérifiez l'extension (.jpg, .png)

### Problème : Erreur de build

```bash
# Vérifiez les erreurs
npm run build
```

Corrigez les erreurs affichées.

## 🎯 Checklist de base

- [ ] Serveur lancé et accessible sur localhost:3000
- [ ] Toutes les images ajoutées dans `public/images/`
- [ ] Nom et prénom changés
- [ ] Poste/titre professionnel changé
- [ ] Description personnelle modifiée
- [ ] Au moins 2 projets configurés
- [ ] Liens Instagram/réseaux sociaux modifiés
- [ ] Email et téléphone dans le footer
- [ ] Testé sur mobile
- [ ] Prêt à déployer !

## 💡 Conseils

1. **Commencez simple** - Ajoutez les informations de base d'abord
2. **Une chose à la fois** - Modifiez un composant, vérifiez, puis passez au suivant
3. **Sauvegardez souvent** - Faites des commits Git régulièrement
4. **Testez sur mobile** - 60% des visiteurs seront sur mobile
5. **Optimisez les images** - Utilisez [TinyPNG](https://tinypng.com) avant de les ajouter

## 🎨 Inspiration design

Sites pour trouver l'inspiration :
- [Awwwards](https://awwwards.com)
- [Dribbble](https://dribbble.com)
- [Behance](https://behance.net)

## 📈 Prochaines étapes

Une fois le portfolio en ligne :

1. Ajoutez Google Analytics (voir SEO.md)
2. Configurez Google Search Console
3. Ajoutez un formulaire de contact (voir FEATURES.md)
4. Optimisez le SEO (voir SEO.md)
5. Ajoutez des animations supplémentaires
6. Créez un blog (optionnel)

## 🎉 Félicitations !

Votre portfolio est prêt ! N'oubliez pas de :
- Partager sur vos réseaux sociaux
- Ajouter le lien dans votre CV
- Mettre à jour régulièrement avec vos nouveaux projets

**Bon développement ! 🚀**
