# Architecture Decisions

## ADR-001 — Choix React Native + Expo

Date : à compléter

Décision :
Utiliser React Native avec Expo pour construire directement une app mobile.

Pourquoi :

- développement rapide ;
- test facile sur téléphone ;
- compatible iOS / Android ;
- écosystème React ;
- Expo Router pour navigation propre.

Alternatives :

- PWA React/Vite ;
- React Native CLI.

Conséquences :

- logique mobile-first dès le départ ;
- besoin de respecter les contraintes Expo ;
- variables d’environnement côté client à gérer prudemment.

---

## ADR-002 — Architecture domain-first

Décision :
Séparer la logique métier dans src/domain.

Pourquoi :

- meilleure maintenabilité ;
- logique testable ;
- future migration plus simple ;
- composants plus simples.

Conséquences :

- plus de discipline ;
- pas de logique métier dans les écrans.

---

## ADR-003 — Modèle métier V1 (types domaine)

Date : 2026-06-29

Décision :

- regrouper les types domaine par fichier `.types.ts` en V1 (`goal`, `task`, `planning`, `log`) plutôt que de multiplier les fichiers ;
- faire de `GoalCategory` la source de vérité métier pour les catégories d’objectif ;
- différencier `RecommendedAction` (suggestion générique) et `DailyPlanItem` (tâche planifiée pour une journée) ;
- reporter l’alignement `GoalColorKey` ↔ `GoalCategory` à un mapper ou refactor ultérieur dans `shared/theme`.

Pourquoi :

- V1 lisible et évolutive sans sur-architecture ;
- séparation claire entre catalogue d’actions et plan du jour ;
- le domaine reste indépendant du thème UI.

Conséquences :

- `GoalColorKey` conserve les mêmes clés string en attendant le mapper ;
- `generateDailyPlan`, les templates réels, l’onboarding et le stockage restent hors scope de cette étape ;
- les règles métier (`isShabbat`, génération, validation) viendront dans des features ultérieures.

---

## ADR-004 — Composants UI de base (primitives)

Date : 2026-06-29

Décision :

- les composants UI de base (`ScreenContainer`, `AppText`, `Button`, `Card`, `Badge`, `ProgressBar`) sont des **primitives génériques** réutilisables dans tout l’app ;
- `TaskCard` et `GoalCard` seront créés plus tard, lorsque les types métier et l’écran Aujourd’hui seront prêts ;
- `DesignSystemShowcase` (branché temporairement sur l’onglet Aujourd’hui) sert uniquement à la validation visuelle et sera retiré une fois les écrans réels en place.

Pourquoi :

- séparer les primitives UI des composants métier évite de figer trop tôt des cartes couplées au domaine ;
- le showcase permet de valider le design system sans attendre la navigation ni les écrans fonctionnels.

Conséquences :

- `TodayScreen` affiche le showcase jusqu’à l’implémentation de la Phase 7 ;
- `TaskCard` / `GoalCard` restent hors scope de cette étape.
