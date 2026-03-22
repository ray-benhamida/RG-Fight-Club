# Fonctionnalités Avancées

Ce document liste des fonctionnalités supplémentaires que vous pouvez ajouter à votre portfolio.

## 🌓 Mode Sombre

### Installation

1. Installez next-themes :
```bash
npm install next-themes
```

2. Créez un provider de thème `components/ThemeProvider.tsx` :

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

3. Modifiez `app/layout.tsx` :

```typescript
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

4. Créez un bouton toggle `components/ThemeToggle.tsx` :

```typescript
'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}
```

5. Ajoutez le bouton dans le Header :

```typescript
import { ThemeToggle } from './ThemeToggle';

// Dans le composant Header
<ThemeToggle />
```

## 📧 Formulaire de Contact

### Avec Formspree (Gratuit)

1. Inscrivez-vous sur [formspree.io](https://formspree.io)

2. Créez `components/ContactForm.tsx` :

```typescript
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/VOTRE_ID', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Votre nom"
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      <textarea
        name="message"
        placeholder="Votre message"
        required
        rows={5}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Envoyer
      </button>
      {status === 'success' && (
        <p className="text-green-600">Message envoyé avec succès !</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">Erreur lors de l'envoi.</p>
      )}
    </form>
  );
}
```

## 🎨 Curseur Personnalisé

Créez `components/CustomCursor.tsx` :

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="fixed w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-[9999] transition-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      <div
        className="fixed w-8 h-8 border-2 border-blue-600 rounded-full pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  );
}
```

Ajoutez dans `app/layout.tsx` (seulement pour desktop) :

```typescript
<CustomCursor />
```

## 🎵 Bouton de Musique

Créez `components/MusicPlayer.tsx` :

```typescript
'use client';

import { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={togglePlay}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
```

## 📊 Compteur de Statistiques

Créez `components/Stats.tsx` :

```typescript
'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 50, label: 'Projets Complétés', suffix: '+' },
  { value: 30, label: 'Clients Satisfaits', suffix: '+' },
  { value: 5, label: 'Années d\'Expérience', suffix: '+' },
  { value: 100, label: 'Tasses de Café', suffix: '+' },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 100;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(current);
                return newCounts;
              });
            }, 20);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 🔍 Barre de Progression de Lecture

Créez `components/ReadingProgress.tsx` :

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

## 🎬 Animation de Texte Dactylographié

Installez :
```bash
npm install typewriter-effect
```

Créez `components/TypewriterText.tsx` :

```typescript
'use client';

import Typewriter from 'typewriter-effect';

export default function TypewriterText() {
  return (
    <div className="text-4xl font-bold">
      <Typewriter
        options={{
          strings: [
            'Développeur Fullstack',
            'UI/UX Designer',
            'Problem Solver',
            'Creative Thinker',
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
```

## 📱 Bouton de Partage Social

Créez `components/ShareButtons.tsx` :

```typescript
'use client';

import { FaTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function ShareButtons() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'Découvrez mon portfolio !';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title} ${url}`,
  };

  return (
    <div className="flex gap-4">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500"
      >
        <FaTwitter />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800"
      >
        <FaLinkedin />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        <FaFacebook />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
```

## 🌐 Multilingue (i18n)

Installez :
```bash
npm install next-intl
```

Configuration complète disponible sur : [next-intl.dev](https://next-intl.dev)

## 🔔 Notifications Toast

Installez :
```bash
npm install react-hot-toast
```

Dans `app/layout.tsx` :

```typescript
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

Utilisation :
```typescript
import toast from 'react-hot-toast';

toast.success('Message envoyé !');
toast.error('Une erreur est survenue');
toast.loading('Envoi en cours...');
```

## 🎯 Section Compétences Animée

Créez `components/Skills.tsx` :

```typescript
'use client';

import { useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'MongoDB', level: 80 },
  { name: 'PostgreSQL', level: 85 },
];

export default function Skills() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({ duration: 1000 });
    }
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Mes Compétences
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-gray-600">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 💡 Conseils d'implémentation

1. **Testez chaque fonctionnalité individuellement** avant de tout ajouter
2. **Optimisez les performances** - N'ajoutez que ce dont vous avez vraiment besoin
3. **Maintenez la cohérence** - Assurez-vous que tout s'intègre bien au design existant
4. **Mobile-first** - Testez toujours sur mobile
5. **Accessibilité** - Ajoutez les attributs ARIA appropriés

## 🎁 Ressources supplémentaires

- [Framer Motion](https://www.framer.com/motion/) - Animations avancées
- [React Spring](https://react-spring.dev/) - Animations physiques
- [Lottie](https://lottiefiles.com/) - Animations JSON
- [GSAP](https://gsap.com/) - Animations professionnelles
- [Particles.js](https://particles.js.org/) - Effets de particules
