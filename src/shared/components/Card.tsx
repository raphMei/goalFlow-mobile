import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import { spacing } from '@/shared/theme/spacing';

type CardVariant = 'default' | 'soft';

type CardProps = ViewProps & {
  variant?: CardVariant;
  padded?: boolean;
};

export function Card({ children, variant = 'default', padded = true, style, ...props }: CardProps) {
  const { colors, radius } = useTheme();

  const backgroundColor = variant === 'soft' ? colors.surfaceSoft : colors.surface;

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: padded ? spacing.lg : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
