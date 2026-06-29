# `domain/planning/`

Types et moteur de **planification quotidienne**.

## Fichiers

- `planning.types.ts` — `WorkMode`, `Weekday`, `RestReason`, `UserSchedule`, `DayContext`, `DailyPlan`, `DailyPlanItem`
- `generateDailyPlan.ts` — moteur V1 de génération du plan du jour

Le modèle de repos repose sur des **jours de repos planifiés** (`restDays`), des **jours légers** (`lightDays`) et la protection optionnelle des streaks — pas sur une règle religieuse codée en dur.

## `generateDailyPlan` V1

Fonction pure : transforme objectifs actifs + templates + `DayContext` + `UserSchedule` en un `DailyPlan`.

### Règle weekly temporaire

Les actions `frequency: 'weekly'` ne sont éligibles qu'un jour fixe par semaine :

```
hash(action.id) % 7 === weekdayIndex   (monday = 0 … sunday = 6)
```

Cette règle V1 est **provisoire**. Elle sera remplacée par une modélisation explicite :

- `preferredWeekdays`
- `timesPerWeek`
- `recurrenceRule`

### Constantes

- `DEFAULT_CAPACITY_MINUTES = 60`
- `LONG_TASK_MINUTES = 30` (filtre bureau)
- `LIGHT_DAY_MAX_TASK_MINUTES = 20` (filtre jour léger)

### Hors scope V1

- `scheduledAt` / tri horaire
- `buildDayContext`
- stockage, UI, Supabase
