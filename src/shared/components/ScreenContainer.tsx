import { ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';
import { spacing } from '@/shared/theme/spacing';

type ScreenContainerProps = ViewProps & {
  padded?: boolean;
  scrollable?: boolean;
};

export function ScreenContainer({
  children,
  padded = true,
  scrollable = false,
  style,
  ...props
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.backgroundWarm,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: padded ? spacing.lg : 0,
    },
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.backgroundWarm }]}
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: padded ? spacing.lg : 0,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
