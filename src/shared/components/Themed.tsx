/**
 * @deprecated Legacy Expo template — ne pas utiliser pour les nouveaux écrans.
 *
 * Préférer :
 * - `useTheme()` depuis `@/shared/hooks/useTheme`
 * - `AppText` et `ScreenContainer` pour le design system GoalFlow
 *
 * Ce fichier sera supprimé une fois les derniers usages migrés.
 */
import { Text as DefaultText, View as DefaultView } from 'react-native';

import { useColorScheme } from './useColorScheme';

import { colors } from '@/shared/theme/colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textPrimary');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundWarm');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
