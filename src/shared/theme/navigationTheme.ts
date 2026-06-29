import { DarkTheme, DefaultTheme } from 'expo-router';

import { colors, type ColorScheme } from './colors';

export function createNavigationTheme(scheme: ColorScheme) {
  const palette = colors[scheme];
  const baseTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    dark: scheme === 'dark',
    colors: {
      ...baseTheme.colors,
      primary: palette.primary,
      background: palette.backgroundWarm,
      card: palette.surface,
      text: palette.textPrimary,
      border: palette.border,
      notification: palette.primary,
    },
  };
}
