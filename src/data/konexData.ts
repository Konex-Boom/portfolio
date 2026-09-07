import {
  TechSkill,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  SoftSkill,
  LanguageItem,
} from '../types';

import heroPortraitImg from '../assets/images/hero_konex.webp';
import jiramaDashboardImg from '../assets/images/jirama_dashboard.png';
import jiramaDemandeImg from '../assets/images/jirama_demande.png';
import jiramaAttenteImg from '../assets/images/jirama_attente.png';
import cvbuilderCoverImg from '../assets/images/cvbuilder_cover.png';
import mathstoolsCap1Img from '../assets/images/mathstools_cap1.png';
import mathstoolsCap2Img from '../assets/images/mathstools_cap2.png';
import mathstoolsCap3Img from '../assets/images/mathstools_cap3.png';
import mathstoolsCap4Img from '../assets/images/mathstools_cap4.png';
import mathstoolsCap5Img from '../assets/images/mathstools_cap5.png';
import mathstoolsCap6Img from '../assets/images/mathstools_cap6.png';
import konexmoneyCap1Img from '../assets/images/konexmoney_cap1.jpg';
import konexmoneyCap2Img from '../assets/images/konexmoney_cap2.jpg';
import konexmoneyCap3Img from '../assets/images/konexmoney_cap3.jpg';
import konexmoneyCap4Img from '../assets/images/konexmoney_cap4.jpg';
import sakafomarketCap1Img from '../assets/images/sakafomarket_cap1.png';
import sakafomarketCap2Img from '../assets/images/sakafomarket_cap2.png';
import sakafomarketCap3Img from '../assets/images/sakafomarket_cap3.png';
import sakafomarketCap4Img from '../assets/images/sakafomarket_cap4.png';
import sakafomarketCap5Img from '../assets/images/sakafomarket_cap5.png';
import lunahygieneCap1Img from '../assets/images/lunahygiene_cap1.jpg';
import lunahygieneCap2Img from '../assets/images/lunahygiene_cap2.jpg';
import lunahygieneCap3Img from '../assets/images/lunahygiene_cap3.jpg';
import lunahygieneCap4Img from '../assets/images/lunahygiene_cap4.jpg';

export const portfolioImages = {
  heroPortrait: heroPortraitImg,
};

export const heroData = {
  brand: "KONEX DEV",
  avatar: heroPortraitImg,
  tagline: "FULL-STACK DEVELOPER",
  title: "Développeur Web & Full-Stack",
  subtitle: "Créer des solutions modernes, performantes et centrées sur l'expérience utilisateur.",
  status: "DISPONIBLE POUR PROJETS & MISSIONS",
  systemStatus: {
    state: "OPERATIONAL",
    latency: "8ms",
    stackVersion: "v4.2.0",
    uptime: "99.98%",
  },
  metrics: [
    { value: "Full-Stack", label: "Architecture\n& Développement" },
    { value: "3+", label: "Années\nd'expérience" },
    { value: "20+", label: "Projets livrés\navec succès" },
    { value: "100%", label: "Code propre\n& optimisé" },
  ],
};

export const aboutData = {
  name: "KONEX DEV",
  title: "Développeur Full-Stack & Concepteur d'Expériences Web",
  location: "Disponible en Télétravail & International",
  profile: "Développeur passionné par l'architecture logicielle, les interfaces utilisateur réactives et les technologies web modernes. Je combine rigueur d'ingénierie backend et sensibilité créative frontend pour livrer des produits robustes, véloces et intuitifs.",
  specialization: "Architecture Web Full-Stack, API REST / GraphQL, Applications Web Réactives, Intégration Cloud & Optimisation des Performances.",
  objective: "Accompagner des startups innovantes et des entreprises ambitieuses dans la conception et la mise en production de solutions numériques pérennes à fort impact.",
  stats: [
    { label: "Spécialité Principale", value: "React • TypeScript • Node • PHP/Laravel" },
    { label: "Méthodologie", value: "Agile / Scrum, Clean Code, CI/CD" },
    { label: "Disponibilité", value: "Immédiate pour missions & CDI" },
  ],
};

export const techSkillsData: TechSkill[] = [
  // Frontend
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "Expert",
    experienceYears: "3+ ans",
    icon: "Atom",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#00f2fe",
    description: "Hooks avancés, Context, SSR/SSG, state management et performance.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: "Expert",
    experienceYears: "4+ ans",
    icon: "FileCode2",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#f7df1e",
    description: "ES6+, Async/Await, Web APIs, programmation fonctionnelle.",
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "frontend",
    level: "Avancé",
    experienceYears: "2+ ans",
    icon: "Layout",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#42b883",
    description: "Composition API, Vuex/Pinia, Single-File Components réactifs.",
  },
  {
    id: "css-tailwind",
    name: "CSS / Tailwind",
    category: "frontend",
    level: "Expert",
    experienceYears: "4+ ans",
    icon: "Palette",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#38bdf8",
    description: "Animations 3D, Flexbox/Grid, CSS Modules, Responsive Design.",
  },

  // Backend
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    level: "Avancé",
    experienceYears: "3+ ans",
    icon: "Layers",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    color: "#ff2d20",
    description: "Architecture MVC, Eloquent ORM, Blade, Micro-services & Queues.",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    level: "Avancé",
    experienceYears: "3+ ans",
    icon: "Server",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777bb4",
    description: "Programmation Orientée Objet, API REST sécurisées, PSR standards.",
  },
  {
    id: "express",
    name: "Express / Node",
    category: "backend",
    level: "Expert",
    experienceYears: "3+ ans",
    icon: "Cpu",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#68a063",
    description: "Serveurs Node.js haute performance, middlewares, JWT, WebSockets.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    level: "Avancé",
    experienceYears: "3+ ans",
    icon: "Database",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    description: "Modélisation relationnelle, indexation avancée, requêtes optimisées.",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    level: "Avancé",
    experienceYears: "3+ ans",
    icon: "HardDrive",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#00758f",
    description: "Schémas relationnels, transactions ACID, gestion des triggers.",
  },

  // Languages & Core
  {
    id: "python",
    name: "Python",
    category: "languages",
    level: "Intermédiaire",
    experienceYears: "2+ ans",
    icon: "Terminal",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776ab",
    description: "Scripts d'automatisation, traitement de données, FastAPI & IA.",
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    level: "Académique",
    experienceYears: "2 ans",
    icon: "Binary",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "#00599c",
    description: "Algorithmique approfondie, gestion mémoire, structures de données.",
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    level: "Intermédiaire",
    experienceYears: "2 ans",
    icon: "Coffee",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#f89820",
    description: "POO rigoureuse, design patterns, architecture logicielle et Android.",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "languages",
    level: "Avancé",
    experienceYears: "2+ ans",
    icon: "Code",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    color: "#7f52ff",
    description: "Développement moderne Android, Coroutines, Jetpack Compose & JVM.",
  },
  {
    id: "csharp",
    name: "C#",
    category: "languages",
    level: "Intermédiaire",
    experienceYears: "2 ans",
    icon: "Code",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    color: "#9b4993",
    description: "Framework .NET, développement d'applications logicielles.",
  },

  // Mobile, AI & Modern Tools
  {
    id: "android-studio",
    name: "Android Studio",
    category: "tools",
    level: "Avancé",
    experienceYears: "2+ ans",
    icon: "Layers",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
    color: "#3ddc84",
    description: "Développement mobile natif Android, émulation, profiling & déploiement APK.",
  },
  {
    id: "openai",
    name: "OpenAI / LLMs",
    category: "tools",
    level: "Avancé",
    experienceYears: "2+ ans",
    icon: "Sparkles",
    logoUrl: "/icons/openai-brand.svg",
    color: "#00f2fe",
    description: "Intégration d'APIs IA, modèles GPT-4o, assistants intelligents & RAG.",
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    level: "Avancé",
    experienceYears: "3+ ans",
    icon: "Palette",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#f24e1e",
    description: "Prototypage UI/UX, Design Systems, maquettage haute fidélité & wireframes.",
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "tools",
    level: "Expert",
    experienceYears: "4+ ans",
    icon: "GitBranch",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#f05032",
    description: "Gestion de version collaborative, GitFlow, Pull Requests & CI/CD.",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "jirama-conges",
    number: "01",
    title: "GESTION DES CONGÉS",
    subtitle: "Application Web de Gestion des Congés du Personnel (JIRAMA)",
    category: "APPLICATION WEB • RH",
    description: "Conception et développement d'une application web destinée à gérer les demandes de congés du personnel.",
    image: jiramaDashboardImg,
    screenshots: [jiramaDashboardImg, jiramaDemandeImg, jiramaAttenteImg],
    year: "2024",
    role: "Full-Stack Developer",
    technologies: ["ReactJS", "Laravel"],
    metrics: "Gestion complète des demandes • Workflow d'approbation",
    caseStudy: {
      overview: "Application web complète permettant aux employés de soumettre, suivre et gérer leurs demandes de congés, avec validation par la hiérarchie.",
      architecture: "Frontend réactif en ReactJS connecté à une API RESTful Laravel avec base de données relationnelle et authentification.",
      keyFeatures: [
        "Soumission et suivi en temps réel des demandes de congés",
        "Workflow d'approbation hiérarchique avec notifications",
        "Solde de congés calculé automatiquement par employé",
        "Tableau de bord RH de validation et d'export"
      ],
      results: [
        "Centralisation complète du processus de congés du personnel",
        "Réduction du temps de traitement des demandes",
        "Historique et reporting fiables des absences"
      ]
    }
  },
  {
    id: "maths-tools",
    number: "02",
    title: "MATHS-TOOLS",
    subtitle: "Boîte à Outils Mathématiques Interactive",
    category: "APPLICATION WEB • OUTILS MATHÉMATIQUES",
    description: "Application web interactive de calcul mathématique : algèbre, arithmétique, calculatrice scientifique, statistiques, conversions et outils bonus.",
    image: mathstoolsCap1Img,
    screenshots: [mathstoolsCap1Img, mathstoolsCap2Img, mathstoolsCap3Img, mathstoolsCap4Img, mathstoolsCap5Img, mathstoolsCap6Img],
    year: "2024",
    role: "Frontend Developer",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "lucide-react"],
    metrics: "+50 outils mathématiques réunis • Interface réactive et moderne",
    githubUrl: "https://github.com/Konex-Boom/Maths-Tools",
    caseStudy: {
      overview: "Boîte à outils mathématiques tout-en-un offrant des outils de calcul variés dans une interface web moderne et intuitive.",
      architecture: "Application frontend éditée avec Vite, React 18 et TypeScript, stylée avec Tailwind CSS et dotée des icônes lucide-react.",
      keyFeatures: [
        "Algèbre : résolution d'équations, factorisation, développement d'expressions",
        "Arithmétique : PGCD, PPCM, nombres premiers, fractions",
        "Calculatrice scientifique intégrée",
        "Statistiques : moyenne, médiane, écart-type, variance",
        "Conversions : unités de mesure, bases numériques, devises",
        "Bonus : outils supplémentaires"
      ],
      results: [
        "Tous les calculs courants centralisés dans un seul outil",
        "Expérience utilisateur fluide et réactive (React + Vite)",
        "Typage strict TypeScript garantissant la fiabilité des calculs"
      ]
    }
  },
  {
    id: "konex-cv-builder",
    number: "03",
    title: "KONEX CV BUILDER",
    subtitle: "Créateur de CV Professionnels — 22 Templates & Export PDF",
    category: "APPLICATION WEB • OUTILS CV",
    description: "Application React de création de CV professionnels avec 22 templates, aperçu A4 en temps réel et export PDF.",
    image: cvbuilderCoverImg,
    year: "2025",
    role: "Frontend Developer",
    technologies: ["React 19", "Redux Toolkit", "MUI v6", "Framer Motion", "JavaScript", "Vite"],
    metrics: "22 templates • Aperçu A4 temps réel • Export PDF",
    githubUrl: "https://github.com/Konex-Boom/konex-cv-builder",
    liveUrl: "https://cv-builder-pro-liard.vercel.app/",
    caseStudy: {
      overview: "Générateur de CV professionnels offrant 22 templates personnalisables, un aperçu A4 en temps réel et un export PDF prêt à partager.",
      architecture: "Application React 19 propulsée par Vite, avec état global Redux Toolkit, interface MUI v6, transitions Framer Motion et export PDF via react-to-print. Sauvegarde automatique dans le localStorage (debounce 500ms).",
      keyFeatures: [
        "Galerie de 22 templates aux thèmes variés (Modern, Classic, Corporate, Dark Premium, Neon, Bento Glass, Noctua...)",
        "Éditeur à 6 onglets : Infos, Expérience, Formation, Compétences, Projets, Style",
        "Aperçu A4 en temps réel avec zoom molette et export PDF",
        "Couleurs propres à chaque template, mode 2 pages, police et taille (12-18px), marges (16-56px), coins arrondis document & photo",
        "Sauvegarde automatique dans le localStorage (debounce 500ms)"
      ],
      results: [
        "Création de CV soignés en quelques minutes sans perte de données",
        "Personnalisation poussée (couleurs, mise en page, photo) par template",
        "Export A4 prêt pour l'impression et le partage"
      ]
    }
  },
  {
    id: "konex-money",
    number: "03",
    title: "KONEXMONEY",
    subtitle: "Suivi Financier Personnel — Android (Kotlin & Jetpack Compose)",
    category: "APPLICATION MOBILE • FINANCE",
    description: "Application Android de suivi financier personnel développée avec Kotlin et Jetpack Compose. Gestion des revenus, dépenses et dettes en Ariary, avec tableau de bord intuitif, statistiques détaillées et suivi des échéances.",
    image: konexmoneyCap1Img,
    screenshots: [konexmoneyCap1Img, konexmoneyCap2Img, konexmoneyCap3Img, konexmoneyCap4Img],
    year: "2025",
    role: "Développeur Android",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "MVVM"],
    metrics: "Ariary (MGA) • Statistiques détaillées • Suivi des échéances",
    githubUrl: "https://github.com/Konex-Boom/Konexmoney",
    downloadUrl: "https://drive.google.com/file/d/1x9gvonaY8rlYpK-KsbhZihi6f8y4-y8o/view?usp=sharing",
    caseStudy: {
      overview: "KonexMoney est une application Android de suivi financier personnel permettant aux utilisateurs malgaches de gérer leurs revenus, dépenses et dettes en Ariary, avec un tableau de bord intuitif et des statistiques détaillées.",
      architecture: "Application Android moderne en Kotlin et Jetpack Compose, suivant une architecture MVVM (Model-View-ViewModel) avec Room pour la persistance locale des données. Compatible à partir d'Android 7.0.",
      keyFeatures: [
        "Gestion des revenus, dépenses et dettes en Ariary (MGA)",
        "Tableau de bord intuitif de synthèse financière",
        "Statistiques détaillées des mouvements",
        "Système de suivi des échéances",
        "Persistance locale fiable via Room"
      ],
      results: [
        "Pilotage clair de la trésorerie personnelle en Ariary",
        "Analyse fine des revenus, dépenses et dettes",
        "Application légère et réactive compatible dès Android 7.0"
      ]
    }
  },
  {
    id: "sakafo-market",
    number: "04",
    title: "SAKAFO MARKET",
    subtitle: "Gestion Complète de Restaurant — Web (React & TypeScript)",
    category: "APPLICATION WEB • RESTAURATION",
    description: "Application web complète de gestion de restaurant pour les restaurateurs malgaches : commandes (POS), réservations, facturation, menu, stocks, vue cuisine et rapports. Notifications temps réel, alertes de stock, factures PDF et paiements locaux (MVola, Orange Money, Airtel Money).",
    image: sakafomarketCap1Img,
    screenshots: [sakafomarketCap1Img, sakafomarketCap2Img, sakafomarketCap3Img, sakafomarketCap4Img, sakafomarketCap5Img],
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    metrics: "POS • Réservations • Stocks • Paiements MGA",
    githubUrl: "https://github.com/Konex-Boom/Sakafo-market",
    caseStudy: {
      overview: "Sakafo Market est une application web complète de gestion de restaurant permettant aux restaurateurs malgaches de gérer l'intégralité de leurs opérations : commandes (POS), réservations, facturation, menu, stocks, vue cuisine et rapports.",
      architecture: "Application web moderne développée avec React, TypeScript, Vite et Tailwind CSS, conçue avec une architecture modulaire et une interface entièrement responsive adaptée aux besoins réels des établissements de restauration.",
      keyFeatures: [
        "Commandes (POS) et prise de commande simplifiée",
        "Gestion des réservations et de la facturation",
        "Gestion du menu et du stock avec alertes automatiques",
        "Vue cuisine temps réel",
        "Notifications en temps réel",
        "Génération de factures PDF",
        "Paiements locaux : MVola, Orange Money, Airtel Money",
        "Rapports de gestion"
      ],
      results: [
        "Gestion centralisée de toutes les opérations du restaurant",
        "Suivi fiable des stocks et alertes proactives",
        "Factures PDF professionnelles et paiements mobiles malgaches"
      ]
    }
  },
  {
    id: "luna",
    number: "05",
    title: "LUNA",
    subtitle: "Suivi du Cycle Menstruel & Hygiène — Android (Kotlin)",
    category: "APPLICATION MOBILE • ÉDUCATIF & SANTÉ",
    description: "Application éducative Android de suivi du cycle menstruel et d'hygiène menstruelle. Calendrier interactif, modules éducatifs illustrés en français et malgache, guide des pertes vaginales, quiz avec certificat et suivi de grossesse.",
    image: lunahygieneCap1Img,
    screenshots: [lunahygieneCap1Img, lunahygieneCap2Img, lunahygieneCap3Img, lunahygieneCap4Img],
    year: "2025",
    role: "Développeur Android",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "MVVM"],
    metrics: "Français & Malagasy • Suivi de grossesse • 100% local",
    githubUrl: "https://github.com/Konex-Boom/luna-hygiene",
    downloadUrl: "https://drive.google.com/file/d/1xDGSjjfH4FDlvXtpl35-2uiCGQJcIsjT/view",
    caseStudy: {
      overview: "Luna — MazaVa Iray est une application éducative Android dédiée au suivi du cycle menstruel et à l'hygiène menstruelle, conçue pour briser les tabous et autonomiser les femmes grâce à une information fiable et accessible.",
      architecture: "Application Android développée avec Kotlin et Jetpack Compose. Toutes les données sont stockées localement (Room) pour garantir une confidentialité totale.",
      keyFeatures: [
        "Calendrier interactif de suivi du cycle menstruel",
        "Modules éducatifs illustrés en français et malgache",
        "Guide des pertes vaginales",
        "Quiz avec certificat",
        "Suivi de grossesse",
        "Stockage local Room pour une confidentialité totale"
      ],
      results: [
        "Autonomisation des femmes via une information fiable et accessible",
        "Briser les tabous grâce à un contenu bilingue (FR / MG)",
        "Confidentialité totale des données utilisatrices (100% local)"
      ]
    }
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 — Présent",
    role: "Développeur Web & Full-Stack Indépendant",
    company: "KONEX DEV Studio",
    location: "Télétravail / International",
    type: "Freelance / Contrats Pro",
    description: "Conception et développement d'applications web complètes, de dashboards SaaS et de plateformes sur-mesure pour des clients internationaux.",
    achievements: [
      "Développement de plus de 15 projets web de bout en bout (front-end, back-end, bases de données, déploiement).",
      "Mise en place d'architectures scalables sous React, Node.js, Express, Laravel et PostgreSQL.",
      "Optimisation poussée des performances web (Core Web Vitals, SEO, accessibilité, temps de réponse API).",
      "Intégration d'APIs tierces sécurisées (Stripe, OpenAI, WebSockets, services Cloud)."
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "Laravel", "PHP", "PostgreSQL", "Tailwind CSS", "Git"],
  },
  {
    id: "exp-2",
    period: "2022 — 2023",
    role: "Développeur Frontend & Intégrateur Web",
    company: "Digital Solutions Agency",
    location: "Antananarivo / Hybride",
    type: "Mission / Collaboration",
    description: "Développement d'interfaces utilisateurs dynamiques et intégration responsive pour des plateformes d'entreprises et d'e-commerce.",
    achievements: [
      "Création de composants UI réutilisables et mise en place de design systems cohérents.",
      "Collaboration étroite avec les designers UI/UX et les développeurs backend.",
      "Amélioration des temps de chargement des pages de 40% grâce au code splitting et lazy loading."
    ],
    technologies: ["JavaScript (ES6+)", "Vue.js", "React", "HTML5 / CSS3", "Tailwind CSS", "Git"],
  },
  {
    id: "exp-3",
    period: "2021 — 2022",
    role: "Projets Académiques & Développements Applicatifs",
    company: "Faculté des Sciences / Informatique",
    location: "Université",
    type: "Projets Universitaires & Personnels",
    description: "Conception d'applications de gestion, algorithmique avancée et projets de fin de cycle.",
    achievements: [
      "Réalisation d'une application de gestion de base de données relationnelle avec interface graphique.",
      "Implémentation d'algorithmes de tri et de recherche optimisés en C++ et Python.",
      "Développement d'un système web de gestion d'étudiants en PHP et MySQL."
    ],
    technologies: ["PHP", "MySQL", "Python", "C++", "Java", "C#", "Linux", "Git"],
  }
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    period: "2021 — 2024",
    degree: "Licence 3 Informatique",
    institution: "Université / Faculté des Sciences",
    location: "Madagascar",
    description: "Formation universitaire approfondie en génie logiciel, algorithmique avancée, architecture des ordinateurs, bases de données relationnelles et réseaux.",
    skillsAcquired: [
      "Génie Logiciel & Modélisation UML / Merise",
      "Algorithmique Avancée & Structures de Données",
      "Bases de Données Relationnelles (SQL, PostgreSQL, MySQL)",
      "Programmation Orientée Objet (Java, C++, C#, PHP)",
      "Systèmes d'Exploitation Linux & Réseaux Informatiques"
    ],
    status: "Diplôme Obtenu (Niveau Bac+3 / L3)",
  },
  {
    id: "edu-2",
    period: "2022 — 2024",
    degree: "Développeur Web & Full-Stack",
    institution: "Formation Continue & Spécialisation Professionnelle",
    location: "En Ligne & Certifications",
    description: "Parcours intensif et continu centré sur les technologies modernes du web moderne (React, TypeScript, Node.js, Laravel, Tailwind CSS, DevOps).",
    skillsAcquired: [
      "Architecture Full-Stack moderne & API RESTful",
      "Écosystème React & State Management avancé",
      "Développement Backend sécurisé (Node.js, Express, Laravel)",
      "Bonnes pratiques de sécurité (OWASP), tests & déploiement continu"
    ],
    status: "Spécialisation Complétée & Pratique Active",
  }
];

export const softSkillsData: SoftSkill[] = [
  {
    id: "soft-1",
    title: "Esprit d'analyse",
    description: "Capacité à décomposer des problèmes complexes en solutions simples, maintenables et performantes.",
    icon: "Brain",
  },
  {
    id: "soft-2",
    title: "Travail en équipe",
    description: "Excellente collaboration avec pairs, designers et chefs de projets via GitFlow et méthodologies agiles.",
    icon: "Users",
  },
  {
    id: "soft-3",
    title: "Autonomie",
    description: "Prise d'initiative, veille technologique constante et résolution proactive des blocages techniques.",
    icon: "Compass",
  },
  {
    id: "soft-4",
    title: "Organisation",
    description: "Gestion rigoureuse du temps, priorisation des tâches critiques et respect strict des délais de livraison.",
    icon: "CalendarCheck",
  },
  {
    id: "soft-5",
    title: "Communication",
    description: "Explication claire des choix techniques et reporting régulier auprès des parties prenantes.",
    icon: "MessageSquare",
  },
  {
    id: "soft-6",
    title: "Rigueur",
    description: "Attention méticuleuse aux détails, propreté du code, typage strict et robustesse des tests.",
    icon: "ShieldCheck",
  },
  {
    id: "soft-7",
    title: "Intelligence Artificielle",
    description: "Exploitation efficace des outils d'IA (LLMs, API Gemini) pour accélérer et enrichir les développements.",
    icon: "Sparkles",
  },
];

export const languagesData: LanguageItem[] = [
  {
    name: "Malagasy",
    level: "Langue maternelle",
    proficiency: 100,
    flag: "🇲🇬",
    badge: "Maternelle",
  },
  {
    name: "Français",
    level: "Courant / Bilingue",
    proficiency: 95,
    flag: "🇫🇷",
    badge: "Bilingue",
  },
  {
    name: "Anglais",
    level: "Technique & Professionnel",
    proficiency: 85,
    flag: "🇬🇧",
    badge: "Professionnel",
  },
];

export const contactInfo = {
  email: "konexdrack601@gmail.com",
  phone: "+261 34 00 000 00",
  location: "Madagascar / Disponible en Full Remote Monde Entier",
  github: "https://github.com/Konex-Boom",
  linkedin: "https://www.linkedin.com/in/mamy-kon%C3%A9-a56262406",
  portfolio: "https://konexdev.app",
};
