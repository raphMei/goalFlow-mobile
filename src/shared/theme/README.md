# `shared/theme/`

Design system GoalFlow : tokens globaux, palettes par objectif, typographie, espacements et rayons.

## Point d'entrée

```ts
import { useTheme } from '@/shared/hooks/useTheme';
import { goalColors, getGoalColor, getTheme, type GoalFlowTheme } from '@/shared/theme';
```

> Le type `GoalFlowTheme` évite toute collision avec le `Theme` de React Navigation / Expo Router.

## Tokens globaux (light / dark)

| Token                           | Usage                                          |
| ------------------------------- | ---------------------------------------------- |
| `backgroundWarm`                | Fond principal chaleureux (`#FFFBF5` en light) |
| `surface`                       | Cartes, surfaces élevées                       |
| `surfaceSoft`                   | Zones secondaires, fonds discrets              |
| `textPrimary`                   | Titres et corps                                |
| `textSecondary`                 | Sous-titres, métadonnées                       |
| `border`                        | Séparateurs, contours                          |
| `success` / `warning` / `error` | États sémantiques                              |
| `primary`                       | Accent global GoalFlow (corail)                |

## Couleurs par objectif

Chaque objectif a une palette complète pour des cartes vivantes (fond soft, gradient, texte contrasté) :

```ts
const { goalColors } = useTheme();

// Accès direct
goalColors.sport.main; // #F97316
goalColors.sport.soft; // #FFF1E8 — fond de carte
goalColors.sport.text; // #9A3412 — texte sur fond soft
goalColors.sport.gradientStart; // début de dégradé
goalColors.sport.gradientEnd; // fin de dégradé

// Helper typé
getGoalColor('mobility').main;
```

Clés disponibles : `sport`, `mobility`, `nutrition`, `learning`, `project`, `spirituality`, `sleep`.

> **Note architecture** : `GoalCategory` dans `src/domain/goals/goal.types.ts` est la **source de vérité métier**.
> `GoalColorKey` dans `shared/theme` reprend les mêmes clés pour l'affichage.
> Un refactor ultérieur alignera ou remplacera `GoalColorKey` par un mapper `GoalCategory → palette` — sans coupler le domaine au thème.

## Exemple futur (carte objectif — Phase 2)

```tsx
const { goalColors, radius } = useTheme();
const palette = goalColors.sport;

<View style={{ backgroundColor: palette.soft, borderRadius: radius.lg }}>
  <AppText style={{ color: palette.text }}>Musculation</AppText>
</View>;
```

Pour un dégradé (avec `expo-linear-gradient` plus tard) :

```tsx
// gradientStart → gradientEnd
```

## Typographie

Variantes : `title`, `subtitle`, `body`, `label`, `caption`.

## Espacements & rayons

- `spacing` : xs (4) → xxxl (48)
- `radius` : sm (8), md (12), lg (16), xl (24), full

## Navigation

`createNavigationTheme(scheme)` aligne Expo Router sur les tokens GoalFlow (`_layout.tsx`).
