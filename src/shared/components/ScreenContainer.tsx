import { StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';
import { spacing } from '@/shared/theme/spacing';

type ScreenContainerProps = ViewProps & {
  padded?: boolean;
};

export function ScreenContainer({
  children,
  padded = true,
  style,
  ...props
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: padded ? spacing.lg : 0,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
