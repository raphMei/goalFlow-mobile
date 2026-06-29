# `src/features/dev/`

Outils **temporaires de développement** — ne pas utiliser en production.

## DesignSystemShowcase

Showcase visuel des composants UI GoalFlow (`AppText`, `Button`, `Card`, etc.).

### Accès

| Contexte                  | Route                | Comportement                   |
| ------------------------- | -------------------- | ------------------------------ |
| Développement (`__DEV__`) | `/dev/design-system` | Affiche le showcase            |
| Production (`!__DEV__`)   | `/dev/design-system` | Redirection vers `/` (accueil) |

### Comment y accéder dans Expo Go

1. Lancer l’app : `npx expo start`
2. Ouvrir l’app sur le téléphone ou simulateur
3. Naviguer vers `/dev/design-system` :
   - **Expo Go (dev menu)** : secouer le téléphone → entrer l’URL manuellement si besoin ;
   - **Simulateur iOS** : dans le terminal Expo, appuyer sur `m` puis utiliser « Open URL » avec le deep link du projet ;
   - **Web** : `http://localhost:8081/dev/design-system`

La route n’apparaît **pas** dans la bottom navigation.

### Avant release production

- Supprimer `src/app/dev/design-system.tsx` et `DesignSystemShowcase.tsx`, **ou**
- Conserver la protection `__DEV__` et documenter la suppression planifiée.

Fichiers concernés :

- `src/features/dev/DesignSystemShowcase.tsx` — composant showcase
- `src/app/dev/design-system.tsx` — route Expo Router
