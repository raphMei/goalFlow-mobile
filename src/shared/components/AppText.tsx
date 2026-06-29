import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import { typography } from '@/shared/theme/typography';

type AppTextVariant = 'title' | 'subtitle' | 'body';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  muted?: boolean;
};

export function AppText({ variant = 'body', muted = false, style, ...props }: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[typography[variant], { color: muted ? colors.textMuted : colors.text }, style]}
      {...props}
    />
  );
}
