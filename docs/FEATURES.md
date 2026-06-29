# GoalFlow Mobile — Features Roadmap

Règles :

- [ ] à faire
- [~] en cours
- [x] terminé, testé et validé
- Ne jamais cocher une feature sans test.
- Une feature doit être petite et relisible.
- **Chaque feature commence sur une branche Git dédiée** (`feature/<nom>`) — jamais sur `main`. Voir [SETUP.md](./SETUP.md#git-workflow-obligatoire).

---

## Phase 0 — Setup projet

- [x] Initialiser Expo + React Native + TypeScript
- [x] Configurer Expo Router
- [ ] Vérifier le lancement sur iPhone / Android avec Expo Go
- [x] Configurer ESLint / Prettier
- [x] Créer la structure src
- [x] Créer le thème visuel
- [x] Créer les composants UI de base

---

## Phase 1 — Navigation

- [x] Créer la bottom navigation
- [x] Créer l’onglet Aujourd’hui
- [x] Créer l’onglet Objectifs
- [x] Créer l’onglet Progression
- [x] Créer l’onglet Profil
- [x] Créer les écrans vides correspondants

---

## Phase 2 — UI de base

- [x] Créer ScreenContainer
- [x] Créer AppText
- [x] Créer Button
- [x] Créer Card
- [x] Créer Badge
- [x] Créer ProgressBar
- [ ] Créer TaskCard
- [ ] Créer GoalCard

---

## Phase 3 — Onboarding

- [ ] Écran bienvenue
- [ ] Choix des objectifs
- [ ] Choix priorité
- [ ] Niveau actuel
- [ ] Temps disponible
- [ ] Planning semaine
- [ ] Contraintes
- [ ] Moments préférés
- [ ] Style de programme
- [ ] Résumé avant génération
- [ ] Programme généré

---

## Phase 4 — Modèle métier

- [x] Créer Goal
- [x] Créer GoalCategory
- [x] Créer GoalTemplate
- [x] Créer RecommendedAction
- [x] Créer DailyPlanItem
- [x] Créer UserSchedule
- [x] Créer LogEntry
- [x] Créer LogType
- [x] Créer DayContext
- [x] Créer TaskStatus
- [x] Créer TaskDetail
- [x] Créer TaskStep

---

## Phase 5 — Templates

- [x] Template “Devenir plus athlétique”
- [x] Template “Améliorer mobilité”
- [x] Template “Mieux manger”
- [x] Template “Progresser en développement”
- [x] Template “Routine spirituelle”
- [x] Template “Avancer sur projet personnel”
- [x] Template “Améliorer sommeil”

---

## Phase 6 — Moteur de génération

- [ ] Créer generateDailyPlan
- [ ] Générer les tâches depuis objectifs actifs
- [ ] Adapter selon remote / office / free / rest
- [ ] Trier les tâches par heure
- [ ] Limiter la charge quotidienne
- [ ] Gérer versions courtes
- [ ] Gérer Shabbat
- [ ] Prévoir logique kasher future

---

## Phase 7 — Aujourd’hui

- [ ] Header vivant
- [ ] Carte rythme du jour
- [ ] Capsules objectifs du jour
- [ ] Liste des tâches
- [ ] Checkbox
- [ ] Bouton commencer
- [ ] État tâche terminée
- [ ] État journée Shabbat
- [ ] État journée vide

---

## Phase 8 — Détail de tâche

- [ ] Détail tâche simple
- [ ] Détail recette
- [ ] Détail mobilité avec timer
- [ ] Détail muscu avec logs
- [ ] Détail apprentissage
- [ ] Détail routine spirituelle
- [ ] Bouton terminer
- [ ] Bouton reporter
- [ ] Bouton version courte

---

## Phase 9 — Stockage local

- [ ] Installer/configurer AsyncStorage
- [ ] Repository onboarding
- [ ] Repository objectifs
- [ ] Repository planning
- [ ] Repository tâches
- [ ] Repository logs
- [ ] Restaurer les données au lancement
- [ ] Préparer interface compatible Supabase

---

## Phase 10 — Progression

- [ ] Calcul complétion jour
- [ ] Calcul complétion semaine
- [ ] Streaks
- [ ] Shabbat protège les streaks
- [ ] Résumé semaine
- [ ] Suggestions d’ajustement simples

---

## Phase 11 — Profil

- [ ] Afficher profil utilisateur
- [ ] Modifier planning semaine
- [ ] Modifier contraintes
- [ ] Modifier préférences
- [ ] Activer/désactiver Shabbat
- [ ] Préparer kasher
- [ ] Export / reset local data

---

## Phase 12 — Qualité

- [ ] Tests generateDailyPlan
- [ ] Tests règle Shabbat
- [ ] Tests streaks
- [ ] Revue architecture
- [ ] Nettoyage imports
- [ ] Vérification TypeScript
- [ ] Documentation décisions

---

## Phase 0b — CI / Qualité

- [x] Créer workflow GitHub Actions PR Checks (`.github/workflows/pr-checks.yml`)
- [x] Ajouter scripts qualité dans `package.json` (`typecheck`, `lint`, `format`, `test`, `ci`)
- [x] Créer checklist PR (`docs/PR_CHECKLIST.md`)
- [x] Documenter CI/CD (`docs/CI_CD.md`)
- [ ] Protéger la branche `main` manuellement dans GitHub (voir `docs/CI_CD.md`)

---

## Phase 13 — Futur

- [ ] Supabase
- [ ] Auth
- [ ] Synchronisation multi-device
- [ ] Notifications
- [ ] IA de suggestions
- [ ] Publication App Store
- [ ] Publication Play Store
