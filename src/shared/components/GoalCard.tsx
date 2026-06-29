import { Pressable, StyleSheet, View } from 'react-native';

import type { GoalCategory } from '@/domain/goals/goal.types';
import { AppText } from '@/shared/components/AppText';
import { Badge } from '@/shared/components/Badge';
import { Card } from '@/shared/components/Card';
import { GoalPill } from '@/shared/components/GoalPill';
import { ProgressBar } from '@/shared/components/ProgressBar';
import { useTheme } from '@/shared/hooks/useTheme';
import type { GoalColorKey } from '@/shared/theme/goalColors';
import { spacing } from '@/shared/theme/spacing';

export type GoalCardStatus = 'active' | 'paused' | 'completed';
export type GoalCardPriority = 'low' | 'medium' | 'high';

export type GoalCardProps = {
  title: string;
  description?: string;
  category: GoalCategory;
  progressPercent?: number;
  weeklyProgressLabel?: string;
  nextActionLabel?: string;
  status?: GoalCardStatus;
  priority?: GoalCardPriority;
  onPress?: () => void;
};

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  sport: 'Muscu',
  mobility: 'Mobilité',
  nutrition: 'Alimentation',
  learning: 'Apprentissage',
  project: 'Projet',
  spirituality: 'Spiritualité',
  sleep: 'Sommeil',
};

const PRIORITY_LABELS: Record<GoalCardPriority, string> = {
  low: 'Priorité basse',
  medium: 'Priorité moyenne',
  high: 'Priorité haute',
};

const PRIORITY_VARIANTS: Record<GoalCardPriority, 'neutral' | 'warning' | 'error'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'error',
};

function toGoalColorKey(category: GoalCategory): GoalColorKey {
  return category;
}

type GoalCardCtaProps = {
  label: string;
  backgroundColor: string;
  onPress: () => void;
};

function GoalCardCta({ label, backgroundColor, onPress }: GoalCardCtaProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.cta,
        {
          backgroundColor,
          borderRadius: radius.lg,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <AppText variant="label" style={{ color: colors.onPrimary, textAlign: 'center' }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function GoalCard({
  title,
  description,
  category,
  progressPercent,
  weeklyProgressLabel,
  nextActionLabel,
  status = 'active',
  priority,
  onPress,
}: GoalCardProps) {
  const { scheme, colors, radius, goalColors } = useTheme();
  const goalColorKey = toGoalColorKey(category);
  const palette = goalColors[goalColorKey];
  const isCompleted = status === 'completed';
  const isPaused = status === 'paused';

  const cardBackgroundColor = scheme === 'light' ? palette.soft : colors.surface;
  const cardOpacity = isCompleted ? 0.75 : isPaused ? 0.85 : 1;

  return (
    <Card
      padded={false}
      style={[
        styles.card,
        {
          backgroundColor: cardBackgroundColor,
          borderColor: colors.border,
          borderLeftColor: palette.main,
          borderRadius: radius.lg,
          opacity: cardOpacity,
        },
      ]}
    >
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <GoalPill goalKey={goalColorKey} label={CATEGORY_LABELS[category]} />
          {priority ? (
            <Badge label={PRIORITY_LABELS[priority]} variant={PRIORITY_VARIANTS[priority]} />
          ) : null}
        </View>

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

        {isPaused || isCompleted ? (
          <View style={styles.badgesRow}>
            {isPaused ? <Badge label="En pause" variant="warning" /> : null}
            {isCompleted ? <Badge label="Terminé" variant="success" /> : null}
          </View>
        ) : null}

        {progressPercent != null ? (
          <ProgressBar value={progressPercent} goalKey={goalColorKey} />
        ) : null}

        {weeklyProgressLabel ? (
          <AppText variant="caption" tone="muted">
            {weeklyProgressLabel}
          </AppText>
        ) : null}

        {nextActionLabel ? (
          <AppText variant="caption" style={{ color: palette.text }}>
            Prochaine action : {nextActionLabel}
          </AppText>
        ) : null}

        {onPress && !isCompleted ? (
          <GoalCardCta label="Voir le plan" backgroundColor={palette.main} onPress={onPress} />
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  inner: {
    gap: spacing.sm,
    padding: spacing.lg,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
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
});
