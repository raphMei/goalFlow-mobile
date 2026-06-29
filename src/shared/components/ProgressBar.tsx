import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import type { GoalColorKey } from '@/shared/theme/goalColors';
import { radius } from '@/shared/theme/radius';

type ProgressBarProps = {
  value: number;
  goalKey?: GoalColorKey;
};

function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function ProgressBar({ value, goalKey }: ProgressBarProps) {
  const { colors, goalColors } = useTheme();
  const clampedValue = clampProgress(value);
  const fillColor = goalKey ? goalColors[goalKey].main : colors.primary;

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: colors.surfaceSoft,
          borderRadius: radius.full,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            backgroundColor: fillColor,
            borderRadius: radius.full,
            width: `${clampedValue}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
  },
});
