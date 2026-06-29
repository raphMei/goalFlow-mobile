import { getTheme, type GoalFlowTheme } from '@/shared/theme';
import { useColorScheme } from '@/shared/components/useColorScheme';

export function useTheme(): GoalFlowTheme {
  const scheme = useColorScheme() ?? 'light';
  return getTheme(scheme);
}
