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
- les règles métier (dérivation `DayContext`, génération, validation, streaks) viendront dans des features ultérieures.

---

## ADR-004 — Composants UI de base (primitives)

Date : 2026-06-29

Décision :

- les composants UI de base (`ScreenContainer`, `AppText`, `Button`, `Card`, `Badge`, `ProgressBar`) sont des **primitives génériques** réutilisables dans tout l’app ;
- `TaskCard` et `GoalCard` seront créés plus tard, lorsque les types métier et l’écran Aujourd’hui seront prêts ;
- `DesignSystemShowcase` est une **route temporaire de développement** (`/dev/design-system`), protégée par `__DEV__`, hors bottom navigation ;
- la route dev doit être **supprimée ou masquée avant une release production**.

Pourquoi :

- séparer les primitives UI des composants métier évite de figer trop tôt des cartes couplées au domaine ;
- le showcase permet de valider le design system sans polluer l’onglet Aujourd’hui.

Conséquences :

- `TodayScreen` affiche un placeholder stylé jusqu’à l’implémentation de la Phase 7 ;
- en production (`!__DEV__`), `/dev/design-system` redirige vers l’accueil ;
- `TaskCard` / `GoalCard` restent hors scope de cette étape.

---

## ADR-005 — Bottom navigation GoalFlow

Date : 2026-06-29

Décision :

- bottom navigation Expo Router avec 4 onglets : Aujourd’hui, Objectifs, Progression, Profil ;
- routes fines dans `src/app/(tabs)/`, écrans dans `src/features/` ;
- thème GoalFlow appliqué à la tab bar via `useTheme()` ;
- icônes via `expo-symbols` (SF Symbols / Material selon plateforme).

Pourquoi :

- alignement avec `docs/UI_UX_GUIDE.md` ;
- séparation navigation (`app/`) / UI feature (`features/`) ;
- V1 sans logique métier ni stockage.

Conséquences :

- chaque onglet affiche un placeholder stylé en attendant les phases fonctionnelles ;
- le showcase design system est déplacé vers `/dev/design-system` (voir ADR-004).

---

## ADR-006 — Modèle générique de jours de repos

Date : 2026-06-29

Décision :

- remplacer la logique Shabbat (`shabbatEnabled`, `isShabbat`) par un modèle universel basé sur le rythme hebdomadaire choisi par l’utilisateur ;
- `UserSchedule` expose `activeDaysPerWeek`, `restDays`, `lightDays`, `protectStreaksOnRestDays` ;
- `DayContext` expose `weekday`, `isRestDay`, `isLightDay`, `restReason` ;
- conserver `kosherEnabled` uniquement comme préférence alimentaire future, séparée du calendrier.

Pourquoi :

- GoalFlow doit être une app universelle, pas limitée à un profil religieux ;
- un utilisateur peut choisir le samedi comme jour de repos sans que ce soit une règle codée en dur ;
- le futur moteur `generateDailyPlan` a besoin de `weekday` pour appliquer repos, jours légers et actions weekly.

Conséquences :

- suppression directe de `shabbatEnabled` et `isShabbat` (aucun consommateur en production) ;
- la validation (`activeDaysPerWeek` vs `restDays`), la dérivation `DayContext` et la protection des streaks restent hors scope de cette étape ;
- les contraintes personnelles spécifiques pourront être ajoutées plus tard comme préférences utilisateur.

---

## ADR-007 — Moteur `generateDailyPlan` V1

Date : 2026-06-29

Décision :

- implémenter `generateDailyPlan` comme **fonction pure** dans `src/domain/planning/generateDailyPlan.ts` ;
- retourner un objet riche `DailyPlan` (date, weekday, items, flags repos/léger, `streaksProtected`) ;
- appliquer en V1 des filtres simples sur l’énergie, la durée, le `workMode` et une capacité quotidienne en minutes ;
- générer des `TaskDetail` **minimaux** selon `taskKind` (contenu guidé complet reporté à la Phase 8) ;
- exposer `hasShortVersion` comme flag métier sans logique de version courte ;
- utiliser une règle **temporaire** pour les actions `weekly` : `hash(action.id) % 7 === weekdayIndex` ;
- laisser hors scope V1 : `scheduledAt`, tri horaire, `buildDayContext`, stockage, UI, Supabase et filtre kasher.

Pourquoi :

- livrer un moteur testable et consommable par l’écran Aujourd’hui sans sur-architecturer ;
- garder le domaine indépendant de React Native et de toute persistance ;
- documenter explicitement les raccourcis V1 pour faciliter les itérations ultérieures.

Conséquences :

- la règle weekly sera remplacée par `preferredWeekdays`, `timesPerWeek` ou `recurrenceRule` ;
- les écrans détail de tâche devront enrichir ou remplacer les `TaskDetail` minimaux ;
- `buildDayContext` et l’assignation horaire (`scheduledAt`) restent des features séparées ;
- la logique kasher (`kosherRequired`) n’est pas appliquée par le moteur en V1.
