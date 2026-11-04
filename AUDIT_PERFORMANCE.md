# Audit des performances du portfolio

Date : 18 octobre 2026.

**Mise à jour : les corrections sont maintenant appliquées localement.** Les observations ci-dessous décrivent la version avant correction. Les résultats après correction figurent à la fin du document.

Le principal problème de fluidité est la recréation du moteur WebGL du fond à chaque mise à jour du défilement. Le chargement initial est aussi alourdi par la scène 3D et les six couvertures de projets, téléchargées avant que ces sections soient visibles.

## Méthode et limites

- Lecture du code et construction de production réussie avec `npm run build`.
- Mesures sur la construction locale, puis sur https://konexdev-portfolio.vercel.app/ ; les noms des fichiers JavaScript servis correspondent à ceux de la construction locale.
- Microsoft Edge sans interface graphique, fenêtre de 1365 × 900 pixels, densité de pixels 1. Pas de simulation de téléphone pour ces résultats.
- Instrumentation des créations de contextes WebGL, compilations, appels de dessin, rafraîchissements du canvas 2D, tâches longues et ressources réseau.
- Test de défilement : 36 déplacements de 40 pixels, séparés par une attente demandée de 45 ms. Le temps réellement écoulé dépend des blocages du navigateur.
- Une comparaison locale stabilise uniquement la liste de couleurs dans la réponse JavaScript reçue par le navigateur. Aucun fichier source du portfolio n'a été modifié. Cette comparaison sert à valider la cause des recréations, pas à annoncer un gain de vitesse général.
- Les durées observées sont des mesures ponctuelles de laboratoire, sensibles à la machine, au réseau et à l'instrumentation. Elles ne constituent pas un score Lighthouse ni des statistiques de visiteurs réels.

## 1. Critique : le fond graphique est reconstruit pendant le défilement

Chaîne de déclenchement :

1. `src/App.tsx:51` met à jour `scrollProgress` dans le composant qui contient toute la page.
2. `src/components/HeroSection.tsx:49` construit un nouveau tableau `colors` à chaque rendu, même si les couleurs ne changent pas.
3. `src/components/Lightfall.tsx:365` inclut ce tableau dans les dépendances de son effet.
4. L'effet nettoie l'ancien rendu puis recrée un Renderer, un canvas, un programme et des shaders (`Lightfall.tsx:229`).

| Test, pour 36 déplacements | Nouveaux contextes WebGL | Compilations de shaders | Pertes de contexte observées |
| --- | ---: | ---: | ---: |
| Production locale, code actuel | 36 | 72 | 0 |
| Production locale, couleurs stabilisées dans le navigateur | 0 | 0 | 0 |
| Site en ligne, code actuel | 36 | 86 | 7 |

Le site en ligne produit aussi l'avertissement « Too many active WebGL contexts. Oldest context will be lost. ». Ce défaut explique des saccades, des pauses et un risque de disparition temporaire des effets graphiques. Le test local initial enregistre 34 tâches supérieures à 50 ms pendant le défilement ; tous ces délais ne sont pas attribuables au seul fond.

Correction prioritaire : rendre les palettes stables, dissocier la création du moteur graphique de la mise à jour de ses paramètres, puis isoler la progression du défilement pour éviter de recalculer toute la page. La prop `scrollProgress` est actuellement reçue par HeroSection mais n'est pas utilisée dans son affichage.

Le mécanisme de dépendances par identité est décrit dans la [documentation React](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies).

## 2. Élevé : des animations continuent hors écran

- `Lightfall.tsx:315` et `Lightfall.tsx:339` entretiennent une boucle continue sans observation de visibilité.
- `ParticleText.tsx:269` redessine continuellement les particules, avec des ombres floutées (`ParticleText.tsx:199`), même quand le titre est hors écran.
- `ModelViewer.tsx:63` monte le canvas 3D sans suspension liée à la visibilité ; la rotation automatique reste active (`ModelViewer.tsx:105`). Les ombres de contact n'ont pas de limite de frames ; la bibliothèque installée utilise `Infinity` par défaut.

Preuve : en restant immobile au pied de page, avec les trois canvas hors écran, le test local observe 1 116 appels de dessin WebGL et 62 rafraîchissements du canvas 2D en environ 3,5 secondes. Le test en ligne confirme une activité comparable.

Correction : arrêter effectivement les boucles quand leurs sections sont invisibles, prévoir une variante mobile plus légère et réduire les recalculs d'ombres quand la scène ne change pas. Le rendu à la demande doit rester compatible avec une rotation automatique si celle-ci est conservée ; changer seulement `frameloop` ne suffit pas à préserver le même comportement. Voir la [documentation React Three Fiber](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

## 3. Élevé : la 3D est téléchargée dès l'ouverture

- Le bloc JavaScript Three.js représente environ 980 Ko minifiés, soit 266 Ko avec le gzip de la construction locale.
- Le modèle `public/model.glb` pèse 1 877 924 octets, soit environ 1,88 Mo.
- `AboutSection.tsx:116` monte immédiatement ModelViewer. `React.lazy` découpe le code, mais ne reporte pas son montage jusqu'à la visibilité.
- `ModelViewer.tsx:116` précharge immédiatement le modèle à l'évaluation du module.
- Le fichier JavaScript principal produit contient également un import statique du bloc Three.js pour un auxiliaire de préchargement Vite : `import{_ as fs}from"./three-CJEGJcS2.js"`. Three.js reste donc dans la chaîne de chargement initiale malgré le retrait de son lien `modulepreload` par `postbuild.mjs`.

Correction : déclencher le montage à l'approche de la section, ajuster le découpage des dépendances et vérifier ensuite dans les requêtes réseau que le bloc Three.js et le modèle ne sont plus demandés à l'ouverture. Évaluer une compression du modèle après inspection de son contenu.

## 4. Élevé sur connexion lente : les images des projets arrivent trop tôt

Les six couvertures de `ProjectsHorizontalSection.tsx:103` n'ont ni `loading="lazy"` ni variantes responsives. Elles totalisent 1 631 102 octets, soit environ 1,63 Mo. Lors du test desktop, elles sont pourtant situées à environ 4 934 et 5 513 pixels du haut de la page.

Plusieurs images sont en 1920 × 1080 ou 1080 × 2400 pour des cartes beaucoup plus petites. La couverture Luna Hygiene pèse à elle seule environ 558 Ko, et CV Builder environ 403 Ko.

Correction : différer le chargement des couvertures hors écran, proposer des dimensions adaptées aux cartes et compresser en WebP/AVIF. Conserver l'image d'accueil en chargement immédiat. Celle-ci est déjà en WebP et ne pèse qu'environ 57 Ko ; elle n'est pas la première cible.

Le volume initial observé est d'environ 4,03 Mo en local et 4,01 Mo en ligne, en additionnant les tailles de corps encodés connues des ressources terminées. Les images de galerie réservées aux fenêtres de détail ne sont pas toutes téléchargées au démarrage : leur présence dans le dossier ne suffit pas à les incriminer.

## 5. Amplificateurs : densité de pixels et mises à jour trop larges

- `Lightfall.tsx:230` reprend la densité de pixels de l'appareil sans plafond et active l'anticrénelage. À surface CSS identique, une densité de 3 représente neuf fois plus de pixels qu'une densité de 1. Son shader appelle trois fois une fonction comportant jusqu'à 39 itérations par pixel (`Lightfall.tsx:96`). C'est un risque particulièrement marqué sur téléphone, déduit du code et non mesuré sur un appareil mobile pendant cet audit.
- La mise à jour globale de progression relance les composants de page non mémorisés. Stabiliser les couleurs retire le défaut le plus grave mais ne règle pas ce travail React supplémentaire.
- `ExperienceTimelineSection.tsx:23` mesure les positions et `:42` produit un nouveau tableau d'état à chaque défilement, y compris lorsque la section n'est pas visible.
- `CustomCursor.tsx:29` met à jour React à chaque mouvement de souris. Son animation tourne également en continu. Ce poste est secondaire par rapport au fond et à la 3D.
- Les grands flous, ombres et surfaces translucides peuvent ajouter un coût de rendu, mais leur contribution individuelle n'a pas été isolée : ne pas les traiter avant les défauts confirmés ci-dessus.

## Ordre de correction recommandé

1. Supprimer la recréation de Lightfall au défilement et isoler la progression globale.
2. Arrêter les animations hors écran et plafonner la résolution graphique sur les appareils moins puissants.
3. Reporter réellement le chargement et le montage de la 3D.
4. Différer et redimensionner les couvertures de projets.
5. Refaire un test de production sur desktop et sur un téléphone réel, puis mesurer le chargement sous réseau ralenti.

Aucune correction du code applicatif ni aucun déploiement n'avaient été effectués lors du diagnostic initial.

## Corrections appliquées

- La progression du défilement est isolée dans `ScrollNavigation` ; elle ne relance plus le rendu de toute la page.
- Lightfall conserve son contexte WebGL et met à jour les paramètres du shader sans le reconstruire. Sa résolution est plafonnée à 1 sur mobile et 1,5 sur ordinateur.
- Le fond, les particules, les bandeaux et la 3D se mettent en pause hors écran ou lorsque l'onglet est masqué. Le fond et les particules proposent aussi un rendu statique lorsque les animations réduites sont demandées.
- La 3D est montée à proximité de sa section et son bloc JavaScript est réellement différé. Le préchargement immédiat du modèle et le contournement `postbuild.mjs` ne sont plus utilisés.
- Les ombres de la scène fixe sont calculées une seule fois ; la rotation de la caméra reste disponible pendant l'affichage.
- Les six couvertures disposent de variantes WebP en 480 et 960 pixels, chargées progressivement. Les originaux restent utilisés dans les détails des projets.
- Le curseur déplace directement ses éléments et cesse de s'animer une fois sa position atteinte. La chronologie ne calcule sa progression que près de l'écran.

Les couvertures en 960 pixels totalisent **127 546 octets**, contre **1 631 102 octets** auparavant : environ **92 % de moins**.

Validation : `npm run lint`, `npm run build`, puis `npm run test:performance`. Le test vérifie le chargement différé, la conservation du contexte au défilement et au changement de thème, l'arrêt et la reprise des animations, les images, les fenêtres de détail et la navigation mobile. Les captures et résultats sont enregistrés dans le répertoire temporaire `portfolio-performance-check`.

Résultats sur ordinateur et en émulation mobile (390 × 844, densité 3) : **257 040 octets au démarrage**, contre environ **4 030 872 octets** lors du diagnostic local initial sur ordinateur. Le modèle 3D et les grandes images sont reportés au moment où ils deviennent utiles ; cette diminution concerne le chargement initial, pas le volume de toutes les ressources disponibles sur le site. Les deux parcours de test sont réussis, sans erreur JavaScript ni saturation WebGL ; un téléphone physique n'a pas été testé.

Le fond conserve un seul contexte pendant le défilement et les changements de thème. Après ouverture de la 3D, le total reste de deux contextes. Les compteurs de dessin WebGL et du titre en particules restent à zéro pendant la mesure hors écran.

## Complément du 19 octobre 2026 : animations visibles au repos

Les premières corrections sont présentes sur le site en ligne. Le rapport PageSpeed fourni ensuite donne **44/100 sur mobile** et **58/100 sur ordinateur**. Il mesure respectivement **9 572 ms** et **9 761 ms** de Total Blocking Time, malgré un chargement désormais beaucoup plus léger. La vérification en production confirme que les effets s'arrêtent hors écran ; elle ne couvrait pas encore leur coût lorsqu'ils restent visibles au repos.

La seconde correction porte sur ce cas :

- Lightfall affiche le même shader mais se fige au repos. Le mouvement de souris le réactive brièvement, à 24 images par seconde maximum, avec un budget de 180 000 pixels. Les appareils tactiles conservent le fond statique. Les thèmes et redimensionnements actualisent le rendu.
- Le titre configuré pour le survol apparaît directement assemblé. Les particules s'animent à l'interaction puis s'arrêtent une fois revenues à leur position. Leur halo est composé une seule fois par image, au lieu d'appliquer une ombre à chaque particule.
- Le portrait est ramené à 672 × 672 pixels (19 838 octets, contre 56 794), préchargé dans le HTML et affiché sans délai d'animation d'entrée.

Les tests de la seconde correction passent sur ordinateur et en émulation mobile : **zéro dessin WebGL et zéro image du titre pendant la mesure au repos**, retour au repos après interaction, navigation mobile, thèmes, images et affichage 3D fonctionnels, aucune erreur détectée. Les ressources initiales observées totalisent **220 262 octets** dans le test local. Cette vérification fonctionnelle ne constitue pas un nouveau score PageSpeed.

Déploiement de cette seconde correction effectué le 19 octobre 2026 : `dpl_35t92bZ8c39jRKJYzhaXUpe6sAzU`, état Vercel `READY`, alias de production `https://konexdev-portfolio.vercel.app/`.

### Nouveau rapport PageSpeed en production

Rapport du 19 octobre 2026 à 16:02 UTC+3, Lighthouse 13.5.0 : [mobile](https://pagespeed.web.dev/analysis/https-konexdev-portfolio-vercel-app/l8ekbqqigb?form_factor=mobile), [ordinateur](https://pagespeed.web.dev/analysis/https-konexdev-portfolio-vercel-app/l8ekbqqigb?form_factor=desktop).

| Mesure | Mobile avant | Mobile après | Ordinateur avant | Ordinateur après |
| --- | ---: | ---: | ---: | ---: |
| Performance | 44 | 82 | 58 | 89 |
| Total Blocking Time | 9 570 ms | 210 ms | 9 760 ms | 240 ms |
| Largest Contentful Paint | 4,0 s | 3,5 s | 1,1 s | 0,9 s |
| Speed Index | 7,3 s | 3,0 s | 5,9 s | 1,2 s |

Il s'agit d'une mesure de laboratoire, sans données d'utilisateurs réels disponibles. L'ancien rapport partait de l'URL HTTP redirigée vers HTTPS ; le nouveau utilise directement HTTPS. Les essais Lighthouse sur cet ordinateur ont signalé un processeur plus lent que prévu et donné des résultats instables ; les scores ci-dessus proviennent du service PageSpeed, pas de ces essais locaux.

Les prochaines améliorations éventuelles concernent surtout le chargement initial mobile (FCP 3,0 s), le JavaScript inutilisé au démarrage et les ajustements de mise en page. Le principal blocage lié aux animations continues est corrigé.
