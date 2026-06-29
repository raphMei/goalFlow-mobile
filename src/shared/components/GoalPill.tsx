import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { useTheme } from '@/shared/hooks/useTheme';
import type { GoalColorKey } from '@/shared/theme/goalColors';
import { spacing } from '@/shared/theme/spacing';

type GoalPillProps = {
  goalKey: GoalColorKey;
  label: string;
};

export function GoalPill({ goalKey, label }: GoalPillProps) {
  const { goalColors, radius } = useTheme();
  const palette = goalColors[goalKey];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: palette.soft,
          borderRadius: radius.full,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: palette.main, borderRadius: radius.full }]} />
      <AppText variant="label" style={{ color: palette.text }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dot: {
    height: 8,
    width: 8,
  },
});
