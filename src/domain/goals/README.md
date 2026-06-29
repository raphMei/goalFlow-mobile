# `domain/goals/`

Types et catalogue d'**objectifs** utilisateur.

- `goal.types.ts` — `GoalCategory`, `Goal`, `GoalTemplate`, `RecommendedAction`
- `goalTemplates.ts` — catalogue statique V1 (`GOAL_TEMPLATES`, `getGoalTemplateById`)

`ActionFrequency` reste volontairement simple en V1 (`daily` | `weekly` | `as_needed`).
Une notion du type `timesPerWeek` pourra être ajoutée plus tard pour affiner la planification.
