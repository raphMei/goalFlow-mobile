import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { useTheme } from '@/shared/hooks/useTheme';
import { spacing } from '@/shared/theme/spacing';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const { colors, radius } = useTheme();

  const variantStyles = {
    neutral: {
      backgroundColor: colors.surfaceSoft,
      textColor: colors.textSecondary,
    },
    success: {
      backgroundColor: colors.surfaceSoft,
      textColor: colors.success,
    },
    warning: {
      backgroundColor: colors.surfaceSoft,
      textColor: colors.warning,
    },
    error: {
      backgroundColor: colors.surfaceSoft,
      textColor: colors.error,
    },
  }[variant];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderRadius: radius.full,
        },
      ]}
    >
      <AppText variant="caption" style={{ color: variantStyles.textColor }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
