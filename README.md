# KONEX DEV — Portfolio

Site portfolio personnel de **Daniel Khonné** (KONEX DEV), Développeur Web Full-Stack basé à Antananarivo, Madagascar.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Three.js / React Three Fiber (modèle 3D)
- Motion (animations)
- Lucide React (icônes)

## Lancer en local

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Déployer

```bash
npm run build
```

Déploiement Vercel : [konexdev-portfolio.vercel.app](https://konexdev-portfolio.vercel.app)

Pour publier depuis Windows avec la CLI Vercel connectée au projet :

```bash
npm run build:vercel
vercel deploy --prebuilt --prod --scope konexdrack601-gmailcoms-projects
```

Cette commande prépare les fichiers statiques au format [Build Output API de Vercel](https://vercel.com/docs/build-output-api/primitives#static-files), sans passer par le lancement de commande défaillant de `vercel build` sous Windows.

## Vérifier les performances

```bash
npm run lint
npm run build
npm run test:performance
```

Le test ouvre un navigateur de test sur la construction locale, en formats ordinateur et mobile. Il vérifie le chargement différé de la 3D, l'arrêt des effets au repos et hors écran, leur reprise à l'interaction, les thèmes, les images et la navigation. Les captures et mesures sont enregistrées dans le dossier temporaire indiqué à la fin. Edge/Chrome est détecté automatiquement ; `PERFORMANCE_BROWSER` permet de choisir un autre exécutable Chromium. `PERFORMANCE_URL` permet de vérifier le site déployé.

Après remplacement d'une couverture de projet, régénérer ses versions adaptées aux cartes :

```bash
node scripts/optimize-project-covers.mjs
```

Après remplacement du portrait source `src/assets/images/hero_konex.webp`, régénérer sa version d'affichage avec `node scripts/optimize-hero.mjs`.

## Structure

```
src/
├── components/     # Composants React (Hero, TechArsenal, Projects, etc.)
├── context/        # ThemeContext (dark/light)
├── data/           # Données portfolio (projets, compétences, profil)
├── assets/images/  # Images et screenshots
├── lib/            # Utilitaires
├── types.ts        # Types TypeScript
└── App.tsx         # Point d'entrée principal
```

## Contact

- GitHub: [Konex-Boom](https://github.com/Konex-Boom)
- LinkedIn: [Daniel Khonné](https://www.linkedin.com/in/mamy-koné-a56262406)
