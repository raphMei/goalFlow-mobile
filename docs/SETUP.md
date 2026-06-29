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

| Commande | Description |
|----------|-------------|
| `npm start` | Dev server Expo |
| `npm run ios` | Simulateur iOS |
| `npm run android` | Émulateur Android |
| `npm run web` | Navigateur web |

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

## Documentation

| Fichier | Usage |
|---------|-------|
| [PRODUCT_SPEC.md](./PRODUCT_SPEC.md) | Vision produit |
| [FEATURES.md](./FEATURES.md) | Roadmap |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technique |
| [UI_UX_GUIDE.md](./UI_UX_GUIDE.md) | Design |
| [DECISIONS.md](./DECISIONS.md) | ADR |
