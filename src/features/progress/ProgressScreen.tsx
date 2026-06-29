import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { ScreenContainer } from '@/shared/components/ScreenContainer';
import { spacing } from '@/shared/theme/spacing';

export function ProgressScreen() {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AppText variant="title">Progression</AppText>
        <AppText variant="subtitle" muted style={styles.subtitle}>
          Chaque petit pas compte.
        </AppText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
