export type ColorScheme = 'light' | 'dark';

export type ThemeColors = {
  backgroundWarm: string;
  surface: string;
  surfaceSoft: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  primary: string;
  onPrimary: string;
  tabBar: string;
  tabBarBorder: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tint: string;
};

export const colors: Record<ColorScheme, ThemeColors> = {
  light: {
    backgroundWarm: '#FFFBF5',
    surface: '#FFFFFF',
    surfaceSoft: '#F5F0EB',
    textPrimary: '#1C1917',
    textSecondary: '#78716C',
    border: '#F5E6D3',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    primary: '#F97316',
    onPrimary: '#FFFFFF',
    tabBar: '#FFFFFF',
    tabBarBorder: '#F5E6D3',
    tabIconDefault: '#A8A29E',
    tabIconSelected: '#F97316',
    tint: '#F97316',
  },
  dark: {
    backgroundWarm: '#1C1917',
    surface: '#292524',
    surfaceSoft: '#44403C',
    textPrimary: '#FAFAF9',
    textSecondary: '#A8A29E',
    border: '#44403C',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    primary: '#FB923C',
    onPrimary: '#FFFFFF',
    tabBar: '#292524',
    tabBarBorder: '#44403C',
    tabIconDefault: '#78716C',
    tabIconSelected: '#FB923C',
    tint: '#FB923C',
  },
};

export default colors;
