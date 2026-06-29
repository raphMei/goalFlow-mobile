import type { TaskKind } from '@/domain/tasks/task.types';

/**
 * Source de vérité métier pour les catégories d'objectif.
 * Les clés visuelles (`GoalColorKey` dans `shared/theme`) devront
 * être alignées ou mappées depuis ce type dans une feature ultérieure.
 */
export type GoalCategory =
  'sport' | 'mobility' | 'nutrition' | 'learning' | 'project' | 'spirituality' | 'sleep';

export type GoalLevel = 'beginner' | 'intermediate' | 'advanced';

export type ActionDifficulty = 'easy' | 'medium' | 'hard';

export type EnergyRequired = 'low' | 'medium' | 'high';

export type ActionFrequency = 'daily' | 'weekly' | 'as_needed';

/** Objectif utilisateur actif (instance). */
export type Goal = {
  id: string;
  category: GoalCategory;
  title: string;
  templateId?: string;
  priority: number;
  level?: GoalLevel;
  isActive: boolean;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  archivedAt?: string;
};

/** Action recommandée par un template ou le moteur — pas encore planifiée. */
export type RecommendedAction = {
  id: string;
  goalCategory: GoalCategory;
  title: string;
  description?: string;
  taskKind: TaskKind;
  defaultDurationMinutes: number;
  frequency?: ActionFrequency;
  difficulty?: ActionDifficulty;
  energyRequired?: EnergyRequired;
  tags?: string[];
};

/** Blueprint d'objectif — données remplies en Phase 5 (templates). */
export type GoalTemplate = {
  id: string;
  category: GoalCategory;
  title: string;
  description: string;
  defaultActions: RecommendedAction[];
  suggestedLevel?: GoalLevel;
  icon?: string;
};
