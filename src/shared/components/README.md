# `shared/components/`

Composants UI **génériques** réutilisables par toutes les features.

Pas de dépendance vers `features/` ni `domain/`.

## Design system GoalFlow (à utiliser)

| Composant         | Usage                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| `AppText`         | Texte typé (title, subtitle, body, label, caption) + `tone` sémantique |
| `ScreenContainer` | Conteneur d'écran avec safe area, fond thème, option `scrollable`      |
| `Button`          | Bouton pressable (primary, secondary, ghost)                           |
| `Card`            | Carte arrondie (default, soft)                                         |
| `Badge`           | Badge statut (neutral, success, warning, error)                        |
| `ProgressBar`     | Barre de progression 0–100, option `goalKey`                           |
| `GoalPill`        | Capsule d'identité objectif via `goalColors`                           |

Import groupé : `import { Button, Card } from '@/shared/components'`.

Hook : `useTheme()` depuis `@/shared/hooks/useTheme`.

Showcase temporaire (dev only) : route `/dev/design-system` — voir `src/features/dev/README.md`.

## Legacy Expo (ne pas utiliser pour les nouveaux écrans)

| Fichier              | Statut                                        |
| -------------------- | --------------------------------------------- |
| `Themed.tsx`         | Deprecated — Text/View template Expo          |
| `StyledText.tsx`     | Deprecated — dépend de `Themed.tsx`           |
| `EditScreenInfo.tsx` | Deprecated — composant demo Expo, non utilisé |

Migrer vers `AppText`, `ScreenContainer` et `useTheme()` lors de la Phase 2 (composants UI de base).
