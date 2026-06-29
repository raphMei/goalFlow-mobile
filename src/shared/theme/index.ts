import { colors, type ColorScheme, type ThemeColors } from './colors';
import { goalColors, type GoalColorKey, type GoalColorPalette } from './goalColors';
import { radius, type Radius } from './radius';
import { spacing } from './spacing';
import { typography, type Typography } from './typography';

export { colors, type ColorScheme, type ThemeColors } from './colors';
export { goalColors, getGoalColor, type GoalColorKey, type GoalColorPalette } from './goalColors';
export { createNavigationTheme } from './navigationTheme';
export { radius, type Radius } from './radius';
export { spacing } from './spacing';
export { typography, type Typography } from './typography';

export type GoalFlowTheme = {
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  typography: Typography;
  radius: Radius;
  goalColors: Record<GoalColorKey, GoalColorPalette>;
};

export function getTheme(scheme: ColorScheme): GoalFlowTheme {
  return {
    scheme,
    colors: colors[scheme],
    spacing,
    typography,
    radius,
    goalColors,
  };
}
