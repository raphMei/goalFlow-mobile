/**
 * Palettes par objectif — identité visuelle vivante de GoalFlow.
 *
 * Note : `GoalCategory` (`src/domain/goals/goal.types.ts`) est la source de vérité métier.
 * `GoalColorKey` reprend les mêmes clés ; un mapper propre viendra dans une feature ultérieure.
 */
export type GoalColorPalette = {
  main: string;
  soft: string;
  text: string;
  gradientStart: string;
  gradientEnd: string;
};

export type GoalColorKey =
  'sport' | 'mobility' | 'nutrition' | 'learning' | 'project' | 'spirituality' | 'sleep';

export const goalColors: Record<GoalColorKey, GoalColorPalette> = {
  sport: {
    main: '#F97316',
    soft: '#FFF1E8',
    text: '#9A3412',
    gradientStart: '#FB7185',
    gradientEnd: '#F97316',
  },
  mobility: {
    main: '#10B981',
    soft: '#ECFDF5',
    text: '#065F46',
    gradientStart: '#14B8A6',
    gradientEnd: '#10B981',
  },
  nutrition: {
    main: '#F59E0B',
    soft: '#FFFBEB',
    text: '#92400E',
    gradientStart: '#FBBF24',
    gradientEnd: '#F59E0B',
  },
  learning: {
    main: '#3B82F6',
    soft: '#EFF6FF',
    text: '#1E40AF',
    gradientStart: '#60A5FA',
    gradientEnd: '#2563EB',
  },
  project: {
    main: '#8B5CF6',
    soft: '#F5F3FF',
    text: '#5B21B6',
    gradientStart: '#A78BFA',
    gradientEnd: '#7C3AED',
  },
  spirituality: {
    main: '#6366F1',
    soft: '#EEF2FF',
    text: '#3730A3',
    gradientStart: '#818CF8',
    gradientEnd: '#4F46E5',
  },
  sleep: {
    main: '#A78BFA',
    soft: '#F5F3FF',
    text: '#6D28D9',
    gradientStart: '#C4B5FD',
    gradientEnd: '#60A5FA',
  },
};

export function getGoalColor(key: GoalColorKey): GoalColorPalette {
  return goalColors[key];
}
