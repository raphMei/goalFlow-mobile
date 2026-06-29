# GoalFlow Mobile — Setup

## Prérequis

- Node.js ≥ 20 (recommandé LTS)
- npm, pnpm ou yarn
- Expo Go sur device (optionnel pour tests rapides)
- Xcode (iOS) / Android Studio (Android) pour simulateurs

## Installation

```bash
npm install
cp .env.example .env
npm start
```

## Commandes

| Commande          | Description       |
| ----------------- | ----------------- |
| `npm start`       | Dev server Expo   |
| `npm run ios`     | Simulateur iOS    |
| `npm run android` | Émulateur Android |
| `npm run web`     | Navigateur web    |

## Structure du projet

```
goalflow-mobile/
├── src/
│   ├── app/              # Expo Router (routes, layouts)
│   ├── domain/           # Logique métier pure
│   ├── features/         # Écrans par feature
│   ├── infrastructure/   # Stockage, API, Supabase (futur)
│   └── shared/           # UI générique, thème, utils
├── assets/               # Images, polices
├── docs/                 # Documentation produit & technique
└── .cursor/rules/        # Règles Cursor
```

Alias TypeScript : `@/` → `src/` (ex. `@/shared/theme/Colors`).

## Variables d'environnement

- Copier `.env.example` vers `.env` (fichier **ignoré par git**).
- Ne jamais committer `.env`.

## Vérification

```bash
npx tsc --noEmit          # TypeScript
git check-ignore -v .env  # .env doit être ignoré
```

## Git workflow obligatoire

Chaque nouvelle feature **doit** commencer par une branche Git dédiée. Ne jamais coder directement sur `main`.

### Avant de commencer une feature

```bash
git branch --show-current   # vérifier la branche courante
git status                  # vérifier qu'il n'y a pas de changements non commités
```

- Si on est sur `main` **et** que le working tree est propre :
  ```bash
  git checkout -b feature/<nom-feature>
  ```
- Si des changements non commités existent, ne pas créer de branche sans accord. Identifier les fichiers modifiés, déterminer s'ils appartiennent à la feature précédente, et choisir entre commit, stash ou conservation.

### Nommage des branches

| Préfixe     | Usage                          | Exemple                     |
| ----------- | ------------------------------ | --------------------------- |
| `feature/`  | Nouvelle fonctionnalité        | `feature/bottom-navigation` |
| `fix/`      | Correction de bug              | `fix/task-card-layout`      |
| `chore/`    | Maintenance, docs, CI          | `chore/update-eslint`       |
| `refactor/` | Refactoring sans changement UX | `refactor/domain-types`     |

Une branche = une seule intention. Ne jamais mélanger plusieurs features.

### Fin d'une feature

1. Lancer `npm run ci` en local.
2. Résumer les fichiers modifiés et proposer un message de commit.
3. Pousser la branche : `git push -u origin HEAD`.
4. Ouvrir une PR vers `main` — voir [PR_CHECKLIST.md](./PR_CHECKLIST.md).
5. Attendre la CI verte — voir [CI_CD.md](./CI_CD.md).
6. **Ne pas merger sans validation explicite.**

### Protection de `main`

La branche `main` doit être protégée sur GitHub (PR obligatoire, checks CI requis). Configuration détaillée dans [CI_CD.md](./CI_CD.md#protéger-la-branche-main-sur-github).

## Documentation

| Fichier                              | Usage          |
| ------------------------------------ | -------------- |
| [PRODUCT_SPEC.md](./PRODUCT_SPEC.md) | Vision produit |
| [FEATURES.md](./FEATURES.md)         | Roadmap        |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technique      |
| [UI_UX_GUIDE.md](./UI_UX_GUIDE.md)   | Design         |
| [DECISIONS.md](./DECISIONS.md)       | ADR            |
| [PR_CHECKLIST.md](./PR_CHECKLIST.md) | Checklist PR   |
| [CI_CD.md](./CI_CD.md)               | CI/CD & Git    |
