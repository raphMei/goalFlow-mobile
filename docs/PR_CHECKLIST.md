# Checklist avant merge d'une Pull Request

Utiliser cette checklist avant de demander la review ou de merger vers `main`.

## Git workflow obligatoire

- [ ] La feature a été développée sur une branche dédiée (`feature/`, `fix/`, `chore/` ou `refactor/`) — **pas sur `main`**
- [ ] La branche porte un nom clair en kebab-case (`feature/bottom-navigation`)
- [ ] Une seule intention par branche (pas de mélange de features)
- [ ] `npm run ci` passe en local avant push
- [ ] La branche a été poussée sur le remote (`git push -u origin HEAD`)
- [ ] La PR est ouverte vers `main` (pas de merge direct)
- [ ] **Ne pas merger sans validation explicite**

## Feature et branche

- [ ] La PR est liée à une feature documentée dans [FEATURES.md](./FEATURES.md)
- [ ] La branche est dédiée à une seule intention (pas de mélange de grosses features)
- [ ] `docs/FEATURES.md` est mis à jour si la feature est terminée

## Qualité code

- [ ] `npm run typecheck` passe en local
- [ ] `npm run lint` passe en local
- [ ] `npm run format:check` passe en local
- [ ] `npm run test` passe en local
- [ ] `npm run ci` passe en local (tous les checks ci-dessus)

## CI GitHub

- [ ] La CI **PR Checks** est verte sur la PR
- [ ] Les checks obligatoires de la branche `main` sont respectés (voir [CI_CD.md](./CI_CD.md))

## Sécurité

- [ ] Aucun secret, clé API ou token n'est exposé dans le code
- [ ] Aucun fichier `.env` n'est versionné (seul `.env.example` est autorisé)
- [ ] Les variables publiques Expo commencent par `EXPO_PUBLIC_`

## Architecture

- [ ] La logique métier est dans `src/domain` (pas dans les composants)
- [ ] Les composants restent simples (affichage et interactions UI)
- [ ] La séparation `domain` / `features` / `infrastructure` / `shared` est respectée

## Test manuel

- [ ] L'écran ou la feature a été testée sur téléphone (Expo Go) ou simulateur
- [ ] Aucune régression évidente sur la navigation

## Documentation

- [ ] La documentation est mise à jour si nécessaire (`docs/`, README, ADR)
- [ ] Les décisions importantes sont notées dans [DECISIONS.md](./DECISIONS.md) si besoin
