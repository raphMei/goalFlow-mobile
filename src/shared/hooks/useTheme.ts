import { colors, type ColorScheme, type ThemeColors } from '@/shared/theme/colors';
import { useColorScheme } from '@/shared/components/useColorScheme';

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const scheme = useColorScheme() ?? 'light';
  return { scheme, colors: colors[scheme] };
}
