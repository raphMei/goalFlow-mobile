import type { Goal, GoalCategory, GoalTemplate } from '@/domain/goals/goal.types';
import type { TaskDetail, TaskStatus } from '@/domain/tasks/task.types';

/** Mode de journée — présentiel, télétravail, libre ou repos. */
export type WorkMode = 'office' | 'remote' | 'free' | 'rest';

export type Weekday =
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/** Origine d'une tâche dans le plan du jour. */
export type DailyPlanItemSource = 'template' | 'manual' | 'generated' | 'adjusted';

/** Raison d'un jour de repos ou d'une charge réduite. */
export type RestReason = 'planned_rest' | 'low_capacity' | 'manual';

/** Préférences de planning utilisateur. */
export type UserSchedule = {
  workModeByWeekday: Record<Weekday, WorkMode>;
  /** Nombre de jours actifs souhaités par semaine (1–7). */
  activeDaysPerWeek?: number;
  /** Jours de repos planifiés (ex. saturday). */
  restDays?: Weekday[];
  /** Jours à charge réduite — versions courtes ou moins de tâches. */
  lightDays?: Weekday[];
  /** Si true, les streaks sont protégés pendant les restDays planifiés. */
  protectStreaksOnRestDays?: boolean;
  /** Préférence alimentaire future — indépendante des jours de repos. */
  kosherEnabled?: boolean;
  dailyCapacityMinutes?: number;
};

/** Contexte d'un jour donné — entrée future de `generateDailyPlan`. */
export type DayContext = {
  /** Format YYYY-MM-DD */
  date: string;
  weekday: Weekday;
  workMode: WorkMode;
  isRestDay: boolean;
  isLightDay?: boolean;
  restReason?: RestReason;
  availableMinutes?: number;
  kosherRequired?: boolean;
  activeGoalIds: string[];
};

/** Plan quotidien généré par le moteur métier. */
export type DailyPlan = {
  date: string;
  weekday: Weekday;
  items: DailyPlanItem[];
  isRestDay: boolean;
  isLightDay?: boolean;
  restReason?: RestReason;
  streaksProtected: boolean;
};

/** Entrée du moteur `generateDailyPlan`. */
export type GenerateDailyPlanInput = {
  goals: Goal[];
  templates: GoalTemplate[];
  dayContext: DayContext;
  userSchedule: UserSchedule;
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
