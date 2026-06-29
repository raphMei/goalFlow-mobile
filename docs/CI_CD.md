# CI/CD — GoalFlow Mobile

## Git workflow obligatoire

Chaque feature suit un cycle Git strict. Voir aussi [SETUP.md](./SETUP.md#git-workflow-obligatoire) et [PR_CHECKLIST.md](./PR_CHECKLIST.md).

### Une branche par feature

- **Interdit** de coder directement sur `main`.
- **Interdit** de mélanger plusieurs features dans une même branche.
- Avant de commencer, vérifier :
  ```bash
  git branch --show-current
  git status
  ```
- Si on est sur `main` avec un working tree propre :
  ```bash
  git checkout -b feature/<nom-feature>
  ```
- Si des changements non commités existent, ne pas créer de branche sans accord — expliquer quels fichiers sont modifiés et proposer commit, stash ou conservation.

### Nommage des branches

| Préfixe     | Usage                          | Exemple                     |
| ----------- | ------------------------------ | --------------------------- |
| `feature/`  | Nouvelle fonctionnalité        | `feature/bottom-navigation` |
| `fix/`      | Correction de bug              | `fix/task-card-layout`      |
| `chore/`    | Maintenance, docs, CI          | `chore/update-eslint`       |
| `refactor/` | Refactoring sans changement UX | `refactor/domain-types`     |

### Création de PR

1. Terminer la feature et lancer `npm run ci` en local.
2. Résumer les fichiers modifiés et proposer un message de commit.
3. Pousser la branche : `git push -u origin HEAD`.
4. Ouvrir une PR vers `main` en suivant [PR_CHECKLIST.md](./PR_CHECKLIST.md).
5. Attendre que la CI **PR Checks** soit verte.
6. **Ne pas merger sans validation explicite.**

### CI obligatoire avant merge

- `npm run ci` doit passer en local **et** sur GitHub avant tout merge.
- Sans protection de branche, la CI tourne mais ne bloque pas le merge — configurer la protection (section ci-dessous).

## Rôle de la CI

La CI GitHub Actions vérifie automatiquement chaque Pull Request vers `main` avant merge.

Objectif : empêcher de merger du code qui ne respecte pas les critères qualité minimaux du projet.

Le workflow s'appelle **PR Checks** et le job principal **Quality checks**.

Fichier : `.github/workflows/pr-checks.yml`

## Checks exécutés

| Étape        | Commande                        | Description                                           |
| ------------ | ------------------------------- | ----------------------------------------------------- |
| Installation | `npm ci`                        | Installation reproductible depuis `package-lock.json` |
| TypeScript   | `npm run typecheck`             | Vérification des types sans compilation               |
| Lint         | `npm run lint`                  | Analyse ESLint (config Expo)                          |
| Format       | `npm run format:check`          | Vérification Prettier                                 |
| Tests        | `npm run test`                  | Tests unitaires Jest                                  |
| Expo config  | `npx expo config --type public` | Valide la configuration Expo publique                 |
| Secrets      | `git ls-files`                  | Vérifie qu'aucun `.env` n'est versionné               |

## Lancer les checks en local

```bash
# Tous les checks (équivalent CI)
npm run ci

# Individuellement
npm run typecheck
npm run lint
npm run format:check
npm run test
npx expo config --type public
```

Corriger le formatage :

```bash
npm run format
```

## Lire un échec de CI

1. Ouvrir la PR sur GitHub
2. Cliquer sur **Details** à côté du check **Quality checks**
3. Identifier l'étape en échec (TypeScript, Lint, Format, Tests, etc.)
4. Reproduire en local avec la commande correspondante
5. Corriger, committer, pousser — la CI se relance automatiquement

Les runs précédents sont annulés si un nouveau commit arrive sur la même PR (`concurrency`).

## Protéger la branche `main` sur GitHub

> **Note :** le dépôt utilise actuellement `master` comme branche par défaut. Renommer en `main` sur GitHub (Settings → Branches) ou adapter le workflow si vous gardez `master`.

Configuration manuelle dans GitHub :

1. Aller sur **Settings → Branches → Branch protection rules**
2. Cliquer **Add rule** (ou modifier la règle existante)
3. **Branch name pattern** : `main`
4. Activer :
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
5. Dans **Status checks that are required**, sélectionner :
   - **Quality checks** (job du workflow PR Checks)
6. Recommandé :
   - **Require branches to be up to date before merging**
   - **Do not allow bypassing the above settings**

Sans cette protection, la CI tourne mais ne bloque pas le merge.

## Ce qui sera ajouté plus tard

- **EAS Build** : builds iOS/Android automatisés
- **Previews** : preview builds par PR
- **Releases** : publication App Store / Play Store
- **Supabase** : migrations et tests d'intégration backend

Ces étapes ne sont pas configurées volontairement pour garder la CI simple en V1.
