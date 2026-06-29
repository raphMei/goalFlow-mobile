import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import { typography } from '@/shared/theme/typography';

type AppTextVariant = 'title' | 'subtitle' | 'body' | 'label' | 'caption';
type AppTextTone = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  /** @deprecated Préférer tone="muted" */
  muted?: boolean;
  tone?: AppTextTone;
};

function resolveTextColor(
  tone: AppTextTone,
  muted: boolean,
  colors: ReturnType<typeof useTheme>['colors'],
): string {
  if (tone !== 'default') {
    const toneColors: Record<Exclude<AppTextTone, 'default'>, string> = {
      muted: colors.textSecondary,
      primary: colors.primary,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
    };
    return toneColors[tone];
  }

  return muted ? colors.textSecondary : colors.textPrimary;
}

export function AppText({
  variant = 'body',
  muted = false,
  tone = 'default',
  style,
  ...props
}: AppTextProps) {
  const { colors } = useTheme();
  const color = resolveTextColor(tone, muted, colors);

  return <Text style={[typography[variant], { color }, style]} {...props} />;
}
