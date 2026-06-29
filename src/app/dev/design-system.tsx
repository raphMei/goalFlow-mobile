import { Redirect } from 'expo-router';

import { DesignSystemShowcase } from '@/features/dev/DesignSystemShowcase';

/**
 * Route temporaire de développement — validation visuelle du design system.
 * Accessible uniquement en mode dev (`__DEV__`).
 * À supprimer ou masquer avant une release production.
 */
export default function DesignSystemRoute() {
  if (!__DEV__) {
    return <Redirect href="/" />;
  }

  return <DesignSystemShowcase />;
}
