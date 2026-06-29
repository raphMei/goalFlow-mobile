import type { GoalCategory } from '@/domain/goals/goal.types';
import type { TaskDetail, TaskStatus } from '@/domain/tasks/task.types';

/** Mode de journée — présentiel, télétravail, libre ou repos. */
export type WorkMode = 'office' | 'remote' | 'free' | 'rest';

export type Weekday =
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/** Origine d'une tâche dans le plan du jour. */
export type DailyPlanItemSource = 'template' | 'manual' | 'generated' | 'adjusted';

/** Préférences de planning utilisateur. */
export type UserSchedule = {
  workModeByWeekday: Record<Weekday, WorkMode>;
  shabbatEnabled: boolean;
  /** Préparé pour une contrainte alimentaire future. */
  kosherEnabled?: boolean;
  dailyCapacityMinutes?: number;
};

/** Contexte d'un jour donné — entrée future de `generateDailyPlan`. */
export type DayContext = {
  /** Format YYYY-MM-DD */
  date: string;
  workMode: WorkMode;
  isShabbat: boolean;
  isRestDay: boolean;
  availableMinutes?: number;
  kosherRequired?: boolean;
  activeGoalIds: string[];
};

/** Tâche planifiée affichée dans l'écran Aujourd'hui. */
export type DailyPlanItem = {
  id: string;
  /** Format YYYY-MM-DD */
  date: string;
  /** Format HH:mm */
  scheduledAt?: string;
  title: string;
  goalId: string;
  goalCategory: GoalCategory;
  status: TaskStatus;
  durationMinutes: number;
  source: DailyPlanItemSource;
  recommendedActionId?: string;
  detail: TaskDetail;
  hasShortVersion: boolean;
  sortOrder?: number;
};
