import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { ScreenContainer } from '@/shared/components/ScreenContainer';
import { spacing } from '@/shared/theme/spacing';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ScreenContainer style={styles.container}>
        <AppText variant="subtitle" style={styles.title}>
          Cet écran n&apos;existe pas.
        </AppText>

        <Link href="/" style={styles.link}>
          <AppText variant="label" tone="primary">
            Retour à l&apos;accueil
          </AppText>
        </Link>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  link: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
});
