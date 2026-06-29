import type { Goal, GoalTemplate, RecommendedAction } from '@/domain/goals/goal.types';
import type { TaskDetail } from '@/domain/tasks/task.types';

import type {
  DailyPlan,
  DailyPlanItem,
  DayContext,
  GenerateDailyPlanInput,
  UserSchedule,
  Weekday,
} from './planning.types';

const DEFAULT_CAPACITY_MINUTES = 60;
const LONG_TASK_MINUTES = 30;
const LIGHT_DAY_MAX_TASK_MINUTES = 20;

const WEEKDAY_INDEX: Record<Weekday, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

const ENERGY_SORT_ORDER = { low: 0, medium: 1, high: 2 } as const;

type ActionCandidate = {
  goal: Goal;
  action: RecommendedAction;
  templateOrder: number;
};

/**
 * Génère le plan quotidien à partir des objectifs actifs, templates et contexte du jour.
 *
 * Fonction pure — sans UI, stockage ni effet de bord.
 */
export function generateDailyPlan(input: GenerateDailyPlanInput): DailyPlan {
  const { goals, templates, dayContext, userSchedule } = input;

  if (dayContext.isRestDay) {
    return buildRestDayPlan(dayContext, userSchedule);
  }

  const templateById = new Map(templates.map((template) => [template.id, template]));
  const activeGoals = goals
    .filter((goal) => goal.isActive && dayContext.activeGoalIds.includes(goal.id))
    .sort((a, b) => a.priority - b.priority);

  const candidates = collectCandidates(activeGoals, templateById, dayContext);
  const sortedCandidates = sortCandidates(candidates, dayContext);
  const capacityMinutes = resolveCapacityMinutes(dayContext, userSchedule);
  const items = buildItemsWithinCapacity(sortedCandidates, dayContext, capacityMinutes);

  return {
    date: dayContext.date,
    weekday: dayContext.weekday,
    items,
    isRestDay: false,
    isLightDay: dayContext.isLightDay,
    restReason: dayContext.restReason,
    streaksProtected: false,
  };
}

function buildRestDayPlan(dayContext: DayContext, userSchedule: UserSchedule): DailyPlan {
  return {
    date: dayContext.date,
    weekday: dayContext.weekday,
    items: [],
    isRestDay: true,
    isLightDay: dayContext.isLightDay,
    restReason: dayContext.restReason,
    streaksProtected: userSchedule.protectStreaksOnRestDays === true,
  };
}

function collectCandidates(
  activeGoals: Goal[],
  templateById: Map<string, GoalTemplate>,
  dayContext: DayContext,
): ActionCandidate[] {
  const candidates: ActionCandidate[] = [];

  for (const goal of activeGoals) {
    if (!goal.templateId) {
      continue;
    }

    const template = templateById.get(goal.templateId);
    if (!template) {
      continue;
    }

    template.defaultActions.forEach((action, templateOrder) => {
      if (!isFrequencyEligible(action, dayContext.weekday)) {
        return;
      }

      if (!passesDayConstraints(action, dayContext)) {
        return;
      }

      candidates.push({ goal, action, templateOrder });
    });
  }

  return candidates;
}

function isFrequencyEligible(action: RecommendedAction, weekday: Weekday): boolean {
  const frequency = action.frequency ?? 'daily';

  if (frequency === 'as_needed') {
    return false;
  }

  if (frequency === 'daily') {
    return true;
  }

  // Règle V1 provisoire — remplacée plus tard par preferredWeekdays,
  // timesPerWeek ou recurrenceRule.
  return hashActionId(action.id) % 7 === WEEKDAY_INDEX[weekday];
}

function hashActionId(actionId: string): number {
  let hash = 0;
  for (let i = 0; i < actionId.length; i++) {
    hash += actionId.charCodeAt(i);
  }
  return hash;
}

function passesDayConstraints(action: RecommendedAction, dayContext: DayContext): boolean {
  const duration = action.defaultDurationMinutes;
  const energy = action.energyRequired;

  if (isReducedCapacityDay(dayContext)) {
    if (energy === 'high') {
      return false;
    }
    if (duration > LIGHT_DAY_MAX_TASK_MINUTES) {
      return false;
    }
  }

  if (dayContext.workMode === 'office') {
    if (energy === 'high') {
      return false;
    }
    if (duration > LONG_TASK_MINUTES) {
      return false;
    }
  }

  return true;
}

function isReducedCapacityDay(dayContext: DayContext): boolean {
  return dayContext.isLightDay === true || dayContext.workMode === 'rest';
}

function sortCandidates(candidates: ActionCandidate[], dayContext: DayContext): ActionCandidate[] {
  return [...candidates].sort((a, b) => {
    if (a.goal.priority !== b.goal.priority) {
      return a.goal.priority - b.goal.priority;
    }

    if (isReducedCapacityDay(dayContext)) {
      const energyDiff =
        ENERGY_SORT_ORDER[a.action.energyRequired ?? 'medium'] -
        ENERGY_SORT_ORDER[b.action.energyRequired ?? 'medium'];
      if (energyDiff !== 0) {
        return energyDiff;
      }

      const durationDiff = a.action.defaultDurationMinutes - b.action.defaultDurationMinutes;
      if (durationDiff !== 0) {
        return durationDiff;
      }
    }

    return a.templateOrder - b.templateOrder;
  });
}

function resolveCapacityMinutes(dayContext: DayContext, userSchedule: UserSchedule): number {
  return (
    dayContext.availableMinutes ?? userSchedule.dailyCapacityMinutes ?? DEFAULT_CAPACITY_MINUTES
  );
}

function buildItemsWithinCapacity(
  candidates: ActionCandidate[],
  dayContext: DayContext,
  capacityMinutes: number,
): DailyPlanItem[] {
  const items: DailyPlanItem[] = [];
  let usedMinutes = 0;

  for (const candidate of candidates) {
    const duration = candidate.action.defaultDurationMinutes;
    if (usedMinutes + duration > capacityMinutes) {
      continue;
    }

    usedMinutes += duration;
    items.push(toDailyPlanItem(candidate, dayContext.date, items.length + 1));
  }

  return items;
}

function toDailyPlanItem(
  candidate: ActionCandidate,
  date: string,
  sortOrder: number,
): DailyPlanItem {
  const { goal, action } = candidate;

  return {
    id: `${date}:${goal.id}:${action.id}`,
    date,
    title: action.title,
    goalId: goal.id,
    goalCategory: action.goalCategory,
    status: 'todo',
    durationMinutes: action.defaultDurationMinutes,
    source: 'generated',
    recommendedActionId: action.id,
    detail: buildMinimalTaskDetail(action),
    hasShortVersion: hasShortVersion(action),
    sortOrder,
  };
}

function hasShortVersion(action: RecommendedAction): boolean {
  return (
    action.defaultDurationMinutes >= LIGHT_DAY_MAX_TASK_MINUTES || action.difficulty === 'hard'
  );
}

function buildMinimalTaskDetail(action: RecommendedAction): TaskDetail {
  switch (action.taskKind) {
    case 'simple':
      return { kind: 'simple', description: action.description };
    case 'steps':
      return { kind: 'steps', steps: [] };
    case 'timer':
      return {
        kind: 'timer',
        durationSeconds: action.defaultDurationMinutes * 60,
      };
    case 'recipe':
      return { kind: 'recipe', ingredients: [], steps: [] };
    case 'strength':
      return { kind: 'strength', exercises: [] };
    case 'learning':
      return { kind: 'learning', steps: [] };
    case 'spiritual':
      return { kind: 'spiritual', steps: [] };
  }
}
