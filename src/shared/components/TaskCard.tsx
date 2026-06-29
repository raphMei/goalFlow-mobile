import { Pressable, StyleSheet, View } from 'react-native';

import type { GoalCategory } from '@/domain/goals/goal.types';
import type { TaskKind, TaskStatus } from '@/domain/tasks/task.types';
import { AppText } from '@/shared/components/AppText';
import { Badge } from '@/shared/components/Badge';
import { Card } from '@/shared/components/Card';
import { GoalPill } from '@/shared/components/GoalPill';
import { useTheme } from '@/shared/hooks/useTheme';
import type { GoalColorKey } from '@/shared/theme/goalColors';
import { spacing } from '@/shared/theme/spacing';

export type TaskCardProps = {
  title: string;
  description?: string;
  timeLabel?: string;
  durationMinutes?: number;
  goalCategory: GoalCategory;
  goalLabel?: string;
  status?: TaskStatus;
  taskKind?: TaskKind;
  hasShortVersion?: boolean;
  onPress?: () => void;
  onToggleDone?: () => void;
};

const TASK_KIND_LABELS: Record<TaskKind, string> = {
  simple: 'Simple',
  steps: 'Étapes',
  timer: 'Timer',
  recipe: 'Recette',
  strength: 'Muscu',
  learning: 'Apprentissage',
  spiritual: 'Spiritualité',
};

function formatDurationMeta(durationMinutes?: number): string | undefined {
  return durationMinutes != null ? `${durationMinutes} min` : undefined;
}

function toGoalColorKey(category: GoalCategory): GoalColorKey {
  return category;
}

type TaskCheckboxProps = {
  checked: boolean;
  onToggle?: () => void;
  borderColor: string;
  fillColor: string;
};

function TaskCheckbox({ checked, onToggle, borderColor, fillColor }: TaskCheckboxProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      disabled={!onToggle}
      hitSlop={8}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.checkbox,
        {
          borderColor: checked ? fillColor : borderColor,
          backgroundColor: checked ? fillColor : colors.surface,
          borderRadius: radius.full,
          opacity: onToggle && pressed ? 0.75 : 1,
        },
      ]}
    >
      {checked ? (
        <View style={[styles.checkboxInner, { backgroundColor: colors.onPrimary }]} />
      ) : null}
    </Pressable>
  );
}

type TaskCardCtaProps = {
  label: string;
  backgroundColor: string;
  onPress?: () => void;
};

function TaskCardCta({ label, backgroundColor, onPress }: TaskCardCtaProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cta,
        {
          backgroundColor,
          borderRadius: radius.lg,
          opacity: !onPress ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <AppText variant="label" style={{ color: colors.onPrimary, textAlign: 'center' }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function TaskCard({
  title,
  description,
  timeLabel,
  durationMinutes,
  goalCategory,
  goalLabel,
  status = 'todo',
  taskKind,
  hasShortVersion = false,
  onPress,
  onToggleDone,
}: TaskCardProps) {
  const { scheme, colors, radius, goalColors } = useTheme();
  const palette = goalColors[toGoalColorKey(goalCategory)];
  const isCompleted = status === 'completed';
  const durationMeta = formatDurationMeta(durationMinutes);
  const goalColorKey = toGoalColorKey(goalCategory);

  const cardBackgroundColor = scheme === 'light' ? palette.soft : colors.surface;

  const cardContent = (
    <Card
      padded={false}
      style={[
        styles.card,
        {
          backgroundColor: cardBackgroundColor,
          borderColor: colors.border,
          borderLeftColor: palette.main,
          borderRadius: radius.lg,
          opacity: isCompleted ? 0.75 : 1,
        },
      ]}
    >
      <View style={styles.inner}>
        <View style={styles.main}>
          {timeLabel ? (
            <AppText variant="caption" style={{ color: palette.text }}>
              {timeLabel}
            </AppText>
          ) : null}

          <AppText
            variant="label"
            style={[
              isCompleted ? styles.completedTitle : undefined,
              { color: isCompleted ? colors.textSecondary : colors.textPrimary },
            ]}
          >
            {title}
          </AppText>

          {description ? (
            <AppText variant="caption" tone="muted" numberOfLines={2}>
              {description}
            </AppText>
          ) : null}

          {durationMeta || goalLabel ? (
            <View style={styles.metaRow}>
              {durationMeta ? (
                <AppText variant="caption" tone="muted">
                  {durationMeta}
                </AppText>
              ) : null}
              {goalLabel ? <GoalPill goalKey={goalColorKey} label={goalLabel} /> : null}
            </View>
          ) : null}

          <View style={styles.badgesRow}>
            {isCompleted ? <Badge label="Terminée" variant="success" /> : null}
            {taskKind ? <Badge label={TASK_KIND_LABELS[taskKind]} variant="neutral" /> : null}
            {hasShortVersion ? <Badge label="Version courte" variant="neutral" /> : null}
          </View>

          {!isCompleted ? (
            <TaskCardCta label="Commencer" backgroundColor={palette.main} onPress={onPress} />
          ) : null}
        </View>

        <TaskCheckbox
          checked={isCompleted}
          onToggle={onToggleDone}
          borderColor={colors.border}
          fillColor={colors.success}
        />
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  inner: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  main: {
    flex: 1,
    gap: spacing.sm,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  cta: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  checkbox: {
    alignItems: 'center',
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginTop: spacing.xs,
    width: 24,
  },
  checkboxInner: {
    borderRadius: 999,
    height: 8,
    width: 8,
  },
});
