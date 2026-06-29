export type ColorScheme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  tabBar: string;
  tabBarBorder: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tint: string;
};

export const colors: Record<ColorScheme, ThemeColors> = {
  light: {
    background: '#FFFBF5',
    surface: '#FFFFFF',
    text: '#1C1917',
    textMuted: '#78716C',
    primary: '#F97316',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F5E6D3',
    tabIconDefault: '#A8A29E',
    tabIconSelected: '#F97316',
    tint: '#F97316',
  },
  dark: {
    background: '#1C1917',
    surface: '#292524',
    text: '#FAFAF9',
    textMuted: '#A8A29E',
    primary: '#FB923C',
    tabBar: '#292524',
    tabBarBorder: '#44403C',
    tabIconDefault: '#78716C',
    tabIconSelected: '#FB923C',
    tint: '#FB923C',
  },
};

export default colors;
