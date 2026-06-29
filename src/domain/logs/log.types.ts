export type LogType = 'completion' | 'duration' | 'weight' | 'reps' | 'sets' | 'note' | 'rating';

type BaseLogEntry = {
  id: string;
  taskId: string;
  goalId: string;
  /** ISO 8601 */
  recordedAt: string;
  note?: string;
};

export type CompletionLogEntry = BaseLogEntry & {
  type: 'completion';
  payload: { completed: boolean };
};

export type DurationLogEntry = BaseLogEntry & {
  type: 'duration';
  payload: { seconds: number };
};

export type WeightLogEntry = BaseLogEntry & {
  type: 'weight';
  payload: { kg: number };
};

export type RepsLogEntry = BaseLogEntry & {
  type: 'reps';
  payload: { count: number };
};

export type SetsLogEntry = BaseLogEntry & {
  type: 'sets';
  payload: { count: number };
};

export type NoteLogEntry = BaseLogEntry & {
  type: 'note';
  payload: { text: string };
};

export type RatingLogEntry = BaseLogEntry & {
  type: 'rating';
  payload: { score: number };
};

/** Entrée de journal d'activité — union discriminée sur `type`. */
export type LogEntry =
  | CompletionLogEntry
  | DurationLogEntry
  | WeightLogEntry
  | RepsLogEntry
  | SetsLogEntry
  | NoteLogEntry
  | RatingLogEntry;
