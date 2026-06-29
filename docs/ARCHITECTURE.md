# GoalFlow Mobile — Architecture

## Stack

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage au début
- Supabase plus tard

## Architecture

src/
app/
domain/
features/
infrastructure/
shared/

## Domain

Le domain contient la logique pure.

Exemples :

- generateDailyPlan
- isShabbat
- calculateStreak
- buildRecommendedActions
- adaptPlanToSchedule

## Features

Les features contiennent les écrans.

Exemples :

- TodayScreen
- GoalsScreen
- OnboardingScreen
- TaskDetailScreen

## Infrastructure

Infrastructure contient :

- local storage ;
- repositories ;
- Supabase plus tard.

## Shared

Shared contient :

- Button ;
- Card ;
- Badge ;
- ProgressBar ;
- theme ;
- helpers.

## Principe clé

Les composants ne doivent pas décider de la logique métier.

Ils affichent les résultats du domain.
