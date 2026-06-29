import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { ScreenContainer } from '@/shared/components/ScreenContainer';
import { spacing } from '@/shared/theme/spacing';

export function ProfileScreen() {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AppText variant="title">Profil</AppText>
        <AppText variant="subtitle" muted style={styles.subtitle}>
          Vos préférences et paramètres.
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
