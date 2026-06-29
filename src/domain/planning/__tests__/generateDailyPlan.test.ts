import type { Goal, GoalTemplate } from '@/domain/goals/goal.types';
import { athleticTemplate, mobilityTemplate } from '@/domain/goals/goalTemplates';
import type { DayContext, UserSchedule } from '@/domain/planning/planning.types';

import { generateDailyPlan } from '../generateDailyPlan';

const baseUserSchedule: UserSchedule = {
  workModeByWeekday: {
    monday: 'remote',
    tuesday: 'remote',
    wednesday: 'remote',
    thursday: 'remote',
    friday: 'remote',
    saturday: 'rest',
    sunday: 'free',
  },
  protectStreaksOnRestDays: true,
  dailyCapacityMinutes: 60,
};

const mobilityGoal: Goal = {
  id: 'goal-mobility',
  category: 'mobility',
  title: 'Améliorer ma mobilité',
  templateId: mobilityTemplate.id,
  priority: 1,
  isActive: true,
  createdAt: '2026-06-29T08:00:00.000Z',
};

const athleticGoal: Goal = {
  id: 'goal-athletic',
  category: 'sport',
  title: 'Devenir plus athlétique',
  templateId: athleticTemplate.id,
  priority: 2,
  isActive: true,
  createdAt: '2026-06-29T08:00:00.000Z',
};

const inactiveGoal: Goal = {
  id: 'goal-inactive',
  category: 'sleep',
  title: 'Sommeil',
  templateId: 'template-sleep',
  priority: 3,
  isActive: false,
  createdAt: '2026-06-29T08:00:00.000Z',
};

const normalDayContext: DayContext = {
  date: '2026-06-29',
  weekday: 'monday',
  workMode: 'remote',
  isRestDay: false,
  activeGoalIds: ['goal-mobility', 'goal-athletic', 'goal-inactive'],
};

const asNeededTemplate: GoalTemplate = {
  id: 'template-as-needed-test',
  category: 'project',
  title: 'Test as_needed',
  description: 'Template de test',
  defaultActions: [
    {
      id: 'action-as-needed-only',
      goalCategory: 'project',
      title: 'Action au besoin',
      taskKind: 'simple',
      defaultDurationMinutes: 5,
      frequency: 'as_needed',
      difficulty: 'easy',
      energyRequired: 'low',
    },
    {
      id: 'action-daily-control',
      goalCategory: 'project',
      title: 'Action daily contrôle',
      taskKind: 'simple',
      defaultDurationMinutes: 5,
      frequency: 'daily',
      difficulty: 'easy',
      energyRequired: 'low',
    },
  ],
};

const asNeededGoal: Goal = {
  id: 'goal-as-needed',
  category: 'project',
  title: 'Test as_needed',
  templateId: asNeededTemplate.id,
  priority: 1,
  isActive: true,
  createdAt: '2026-06-29T08:00:00.000Z',
};

describe('generateDailyPlan', () => {
  it('génère un plan non vide avec des objectifs actifs', () => {
    const plan = generateDailyPlan({
      goals: [mobilityGoal],
      templates: [mobilityTemplate],
      dayContext: normalDayContext,
      userSchedule: baseUserSchedule,
    });

    expect(plan.items.length).toBeGreaterThan(0);
    expect(plan.isRestDay).toBe(false);
  });

  it('ne génère rien sur un jour de repos', () => {
    const restDayContext: DayContext = {
      date: '2026-07-04',
      weekday: 'saturday',
      workMode: 'rest',
      isRestDay: true,
      restReason: 'planned_rest',
      activeGoalIds: ['goal-mobility'],
    };

    const plan = generateDailyPlan({
      goals: [mobilityGoal],
      templates: [mobilityTemplate],
      dayContext: restDayContext,
      userSchedule: baseUserSchedule,
    });

    expect(plan.items).toEqual([]);
    expect(plan.isRestDay).toBe(true);
    expect(plan.restReason).toBe('planned_rest');
  });

  it('protège les streaks sur un jour de repos planifié', () => {
    const restDayContext: DayContext = {
      date: '2026-07-04',
      weekday: 'saturday',
      workMode: 'rest',
      isRestDay: true,
      restReason: 'planned_rest',
      activeGoalIds: ['goal-mobility'],
    };

    const plan = generateDailyPlan({
      goals: [mobilityGoal],
      templates: [mobilityTemplate],
      dayContext: restDayContext,
      userSchedule: { ...baseUserSchedule, protectStreaksOnRestDays: true },
    });

    expect(plan.streaksProtected).toBe(true);
  });

  it('respecte availableMinutes', () => {
    const limitedContext: DayContext = {
      ...normalDayContext,
      availableMinutes: 25,
    };

    const plan = generateDailyPlan({
      goals: [mobilityGoal],
      templates: [mobilityTemplate],
      dayContext: limitedContext,
      userSchedule: baseUserSchedule,
    });

    const totalMinutes = plan.items.reduce((sum, item) => sum + item.durationMinutes, 0);
    expect(totalMinutes).toBeLessThanOrEqual(25);
    expect(plan.items.length).toBeGreaterThan(0);
  });

  it('limite les actions high energy en jour léger', () => {
    const lightDayContext: DayContext = {
      date: '2026-07-03',
      weekday: 'friday',
      workMode: 'office',
      isRestDay: false,
      isLightDay: true,
      activeGoalIds: ['goal-athletic', 'goal-mobility'],
    };

    const plan = generateDailyPlan({
      goals: [athleticGoal, mobilityGoal],
      templates: [athleticTemplate, mobilityTemplate],
      dayContext: lightDayContext,
      userSchedule: baseUserSchedule,
    });

    for (const item of plan.items) {
      const template = item.goalCategory === 'sport' ? athleticTemplate : mobilityTemplate;
      const action = template.defaultActions.find((a) => a.id === item.recommendedActionId);
      expect(action?.energyRequired).not.toBe('high');
      expect(item.durationMinutes).toBeLessThanOrEqual(20);
    }
  });

  it('ignore les objectifs inactifs', () => {
    const plan = generateDailyPlan({
      goals: [mobilityGoal, inactiveGoal],
      templates: [mobilityTemplate],
      dayContext: normalDayContext,
      userSchedule: baseUserSchedule,
    });

    expect(plan.items.every((item) => item.goalId !== inactiveGoal.id)).toBe(true);
  });

  it('ignore les actions as_needed en V1', () => {
    const plan = generateDailyPlan({
      goals: [asNeededGoal],
      templates: [asNeededTemplate],
      dayContext: {
        ...normalDayContext,
        activeGoalIds: ['goal-as-needed'],
      },
      userSchedule: baseUserSchedule,
    });

    expect(plan.items).toHaveLength(1);
    expect(plan.items[0]?.recommendedActionId).toBe('action-daily-control');
  });

  it('trie les tâches par sortOrder croissant selon la priorité des objectifs', () => {
    const highPriorityGoal: Goal = {
      ...mobilityGoal,
      id: 'goal-priority-1',
      priority: 1,
    };

    const lowPriorityGoal: Goal = {
      ...athleticGoal,
      id: 'goal-priority-2',
      priority: 2,
    };

    const plan = generateDailyPlan({
      goals: [lowPriorityGoal, highPriorityGoal],
      templates: [athleticTemplate, mobilityTemplate],
      dayContext: {
        ...normalDayContext,
        activeGoalIds: ['goal-priority-1', 'goal-priority-2'],
      },
      userSchedule: baseUserSchedule,
    });

    const sortOrders = plan.items.map((item) => item.sortOrder);
    expect(sortOrders).toEqual([...sortOrders].sort((a, b) => (a ?? 0) - (b ?? 0)));

    const firstMobilityIndex = plan.items.findIndex((item) => item.goalId === 'goal-priority-1');
    const firstAthleticIndex = plan.items.findIndex((item) => item.goalId === 'goal-priority-2');
    expect(firstMobilityIndex).toBeGreaterThanOrEqual(0);
    expect(firstAthleticIndex).toBeGreaterThanOrEqual(0);
    expect(firstMobilityIndex).toBeLessThan(firstAthleticIndex);
  });

  it('crée des DailyPlanItem avec status todo et source generated', () => {
    const plan = generateDailyPlan({
      goals: [mobilityGoal],
      templates: [mobilityTemplate],
      dayContext: normalDayContext,
      userSchedule: baseUserSchedule,
    });

    expect(plan.items.length).toBeGreaterThan(0);
    for (const item of plan.items) {
      expect(item.status).toBe('todo');
      expect(item.source).toBe('generated');
      expect(item.id).toBe(`${item.date}:${item.goalId}:${item.recommendedActionId}`);
    }
  });
});
