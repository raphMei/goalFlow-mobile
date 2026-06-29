import type { Goal, RecommendedAction } from '@/domain/goals/goal.types';
import type { LogEntry } from '@/domain/logs/log.types';
import type { DailyPlanItem, DayContext, UserSchedule } from '@/domain/planning/planning.types';

const exampleGoal: Goal = {
  id: 'goal-1',
  category: 'sport',
  title: 'Devenir plus athlétique',
  templateId: 'template-sport-athletic',
  priority: 1,
  level: 'intermediate',
  isActive: true,
  createdAt: '2026-06-29T08:00:00.000Z',
};

const exampleRecommendedAction: RecommendedAction = {
  id: 'action-1',
  goalCategory: 'nutrition',
  title: 'Préparer un petit-déjeuner équilibré',
  description: 'Petit-déjeuner protéiné pour soutenir la journée.',
  taskKind: 'recipe',
  defaultDurationMinutes: 20,
  frequency: 'daily',
  difficulty: 'easy',
  energyRequired: 'low',
  tags: ['breakfast'],
};

const exampleRecipePlanItem: DailyPlanItem = {
  id: 'plan-1',
  date: '2026-06-29',
  scheduledAt: '07:30',
  title: 'Petit-déjeuner protéiné',
  goalId: 'goal-2',
  goalCategory: 'nutrition',
  status: 'todo',
  durationMinutes: 20,
  source: 'generated',
  recommendedActionId: 'action-1',
  hasShortVersion: true,
  sortOrder: 1,
  detail: {
    kind: 'recipe',
    servings: 1,
    ingredients: [
      { name: "Flocons d'avoine", quantity: '50 g' },
      { name: 'Yaourt grec', quantity: '150 g' },
    ],
    steps: [
      { order: 1, instruction: 'Mélanger les flocons et le yaourt.' },
      { order: 2, instruction: 'Laisser reposer 2 minutes puis servir.' },
    ],
  },
};

const exampleTimerPlanItem: DailyPlanItem = {
  id: 'plan-2',
  date: '2026-06-29',
  scheduledAt: '18:00',
  title: 'Routine mobilité hanches',
  goalId: 'goal-3',
  goalCategory: 'mobility',
  status: 'todo',
  durationMinutes: 10,
  source: 'template',
  hasShortVersion: false,
  detail: {
    kind: 'timer',
    durationSeconds: 600,
    instructions: 'Enchaîner les étirements doucement, sans douleur.',
  },
};

const exampleLogEntry: LogEntry = {
  id: 'log-1',
  taskId: 'plan-2',
  goalId: 'goal-3',
  type: 'duration',
  recordedAt: '2026-06-29T18:12:00.000Z',
  payload: { seconds: 612 },
  note: 'Séance un peu plus longue que prévu.',
};

const exampleUserSchedule: UserSchedule = {
  workModeByWeekday: {
    monday: 'office',
    tuesday: 'office',
    wednesday: 'remote',
    thursday: 'office',
    friday: 'office',
    saturday: 'rest',
    sunday: 'free',
  },
  activeDaysPerWeek: 5,
  restDays: ['saturday'],
  lightDays: ['friday'],
  protectStreaksOnRestDays: true,
  kosherEnabled: false,
  dailyCapacityMinutes: 90,
};

const exampleRestDayContext: DayContext = {
  date: '2026-07-04',
  weekday: 'saturday',
  workMode: 'rest',
  isRestDay: true,
  restReason: 'planned_rest',
  activeGoalIds: ['goal-1', 'goal-2'],
};

const exampleLightDayContext: DayContext = {
  date: '2026-07-03',
  weekday: 'friday',
  workMode: 'office',
  isRestDay: false,
  isLightDay: true,
  availableMinutes: 45,
  activeGoalIds: ['goal-1'],
};

describe('domain types smoke', () => {
  it('accepts a Goal fixture', () => {
    expect(exampleGoal.category).toBe('sport');
    expect(exampleGoal.isActive).toBe(true);
  });

  it('accepts a RecommendedAction fixture', () => {
    expect(exampleRecommendedAction.taskKind).toBe('recipe');
    expect(exampleRecommendedAction.energyRequired).toBe('low');
  });

  it('accepts DailyPlanItem fixtures with recipe and timer TaskDetail', () => {
    expect(exampleRecipePlanItem.detail.kind).toBe('recipe');
    expect(exampleRecipePlanItem.source).toBe('generated');
    expect(exampleTimerPlanItem.detail.kind).toBe('timer');
    expect(exampleTimerPlanItem.source).toBe('template');
  });

  it('accepts a LogEntry fixture', () => {
    expect(exampleLogEntry.type).toBe('duration');
    if (exampleLogEntry.type === 'duration') {
      expect(exampleLogEntry.payload.seconds).toBe(612);
    }
  });

  it('accepts UserSchedule and DayContext fixtures with rest days model', () => {
    expect(exampleUserSchedule.restDays).toContain('saturday');
    expect(exampleUserSchedule.protectStreaksOnRestDays).toBe(true);
    expect(exampleRestDayContext.isRestDay).toBe(true);
    expect(exampleRestDayContext.restReason).toBe('planned_rest');
    expect(exampleLightDayContext.isLightDay).toBe(true);
    expect(exampleLightDayContext.isRestDay).toBe(false);
  });
});
