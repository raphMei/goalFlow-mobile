import type { TaskKind } from '@/domain/tasks/task.types';

import { GOAL_TEMPLATES, getGoalTemplateById } from '../goalTemplates';

const ALL_TASK_KINDS: TaskKind[] = [
  'simple',
  'steps',
  'timer',
  'recipe',
  'strength',
  'learning',
  'spiritual',
];

describe('goalTemplates', () => {
  it('exports 7 templates', () => {
    expect(GOAL_TEMPLATES).toHaveLength(7);
  });

  it('has unique template IDs', () => {
    const ids = GOAL_TEMPLATES.map((template) => template.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique action IDs across all templates', () => {
    const actionIds = GOAL_TEMPLATES.flatMap((template) =>
      template.defaultActions.map((action) => action.id),
    );
    expect(new Set(actionIds).size).toBe(actionIds.length);
  });

  it('each template contains at least 3 actions', () => {
    for (const template of GOAL_TEMPLATES) {
      expect(template.defaultActions.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('each action has difficulty, energyRequired and description', () => {
    for (const template of GOAL_TEMPLATES) {
      for (const action of template.defaultActions) {
        expect(action.difficulty).toBeDefined();
        expect(action.energyRequired).toBeDefined();
        expect(action.description).toBeTruthy();
      }
    }
  });

  it('each action goalCategory matches its template category', () => {
    for (const template of GOAL_TEMPLATES) {
      for (const action of template.defaultActions) {
        expect(action.goalCategory).toBe(template.category);
      }
    }
  });

  it('covers all main TaskKind values at least once', () => {
    const usedKinds = new Set(
      GOAL_TEMPLATES.flatMap((template) =>
        template.defaultActions.map((action) => action.taskKind),
      ),
    );

    for (const kind of ALL_TASK_KINDS) {
      expect(usedKinds.has(kind)).toBe(true);
    }
  });

  it('getGoalTemplateById returns the matching template', () => {
    const template = getGoalTemplateById('template-sport-athletic');
    expect(template?.title).toBe('Devenir plus athlétique');
  });

  it('getGoalTemplateById returns undefined for unknown id', () => {
    expect(getGoalTemplateById('template-unknown')).toBeUndefined();
  });
});
