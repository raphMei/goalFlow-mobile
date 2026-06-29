/** Statut d'une tâche planifiée dans le jour. */
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'skipped' | 'postponed';

/** Type de contenu guidé affiché dans le détail de tâche. */
export type TaskKind =
  'simple' | 'steps' | 'timer' | 'recipe' | 'strength' | 'learning' | 'spiritual';

export type TaskStep = {
  id: string;
  order: number;
  title: string;
  description?: string;
  isOptional?: boolean;
};

export type RecipeIngredient = {
  name: string;
  quantity?: string;
};

export type RecipeStep = {
  order: number;
  instruction: string;
};

export type StrengthExercise = {
  name: string;
  targetSets?: number;
  targetReps?: number;
  targetWeightKg?: number;
};

export type SimpleTaskDetail = {
  kind: 'simple';
  description?: string;
  notes?: string;
};

export type StepsTaskDetail = {
  kind: 'steps';
  steps: TaskStep[];
  notes?: string;
};

export type TimerTaskDetail = {
  kind: 'timer';
  durationSeconds: number;
  instructions?: string;
};

export type RecipeTaskDetail = {
  kind: 'recipe';
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  servings?: number;
};

export type StrengthTaskDetail = {
  kind: 'strength';
  exercises: StrengthExercise[];
};

export type LearningTaskDetail = {
  kind: 'learning';
  steps: TaskStep[];
  resourceUrl?: string;
  targetMinutes?: number;
};

export type SpiritualTaskDetail = {
  kind: 'spiritual';
  steps: TaskStep[];
  intention?: string;
};

/** Contenu guidé d'une tâche — union discriminée sur `kind`. */
export type TaskDetail =
  | SimpleTaskDetail
  | StepsTaskDetail
  | TimerTaskDetail
  | RecipeTaskDetail
  | StrengthTaskDetail
  | LearningTaskDetail
  | SpiritualTaskDetail;
