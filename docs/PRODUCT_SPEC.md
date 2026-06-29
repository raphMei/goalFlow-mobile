# GoalFlow Mobile — Product Specification

## En une phrase

GoalFlow transforme les objectifs personnels de l’utilisateur en actions quotidiennes guidées, adaptées à son emploi du temps, ses contraintes et sa progression.

## Problème

Les utilisateurs veulent progresser dans plusieurs domaines, mais leurs plans sont dispersés :

- sport ;
- alimentation ;
- mobilité ;
- apprentissage ;
- spiritualité ;
- projets personnels.

Les apps classiques demandent souvent à l’utilisateur de tout préparer lui-même.

GoalFlow doit réduire cette charge mentale.

## Solution

L’utilisateur renseigne ses objectifs et contraintes.

L’app génère :

- un programme ;
- des tâches ;
- des détails guidés ;
- des logs ;
- un suivi de progression.

## Cœur produit

Objectif → recommandations → planning → tâches du jour → détail guidé → logs → progression.

## Différenciation

GoalFlow ne se limite pas à tracker.

GoalFlow propose quoi faire.

Exemples :

- petit déjeuner avec recette ;
- mobilité avec timer ;
- séance muscu avec logs ;
- apprentissage avec étapes ;
- routine spirituelle guidée ;
- projet perso découpé en actions.

## Contraintes personnelles

V1 :

- jours de repos planifiés (choisis par l’utilisateur, ex. samedi) ;
- jours légers à charge réduite ;
- nombre de jours actifs par semaine ;
- protection des streaks pendant les repos planifiés ;
- présentiel/télétravail ;
- charge quotidienne réaliste.

Plus tard :

- kasher (préférence alimentaire, indépendante du calendrier) ;
- contraintes personnelles spécifiques en préférences utilisateur ;
- Supabase ;
- IA ;
- notifications.

GoalFlow est une app universelle : aucune règle religieuse n’est codée en dur dans le cœur métier.

## Utilisateur V1

Mono-utilisateur : David.

Mais l’architecture doit pouvoir évoluer vers plusieurs utilisateurs.
