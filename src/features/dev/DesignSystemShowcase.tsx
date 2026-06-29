/**
 * Showcase temporaire du design system GoalFlow.
 *
 * ⚠️ TEMPORAIRE — route dev `/dev/design-system` pour validation visuelle.
 * Ne plus brancher sur TodayScreen ni un onglet de la bottom navigation.
 */
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { GoalPill } from '@/shared/components/GoalPill';
import { ProgressBar } from '@/shared/components/ProgressBar';
import { ScreenContainer } from '@/shared/components/ScreenContainer';
import { TaskCard } from '@/shared/components/TaskCard';
import { spacing } from '@/shared/theme/spacing';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="label" tone="muted" style={styles.sectionTitle}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

export function DesignSystemShowcase() {
  return (
    <ScreenContainer scrollable>
      <View style={styles.content}>
        <AppText variant="title">Design System</AppText>
        <AppText variant="subtitle" tone="muted">
          Showcase temporaire — validation visuelle des composants UI de base GoalFlow.
        </AppText>

        <Section title="AppText — tones">
          <View style={styles.rowWrap}>
            <AppText tone="default">Default</AppText>
            <AppText tone="muted">Muted</AppText>
            <AppText tone="primary">Primary</AppText>
            <AppText tone="success">Success</AppText>
            <AppText tone="warning">Warning</AppText>
            <AppText tone="error">Error</AppText>
          </View>
        </Section>

        <Section title="Button">
          <View style={styles.column}>
            <Button label="Primary" variant="primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Disabled" variant="primary" disabled />
          </View>
        </Section>

        <Section title="Card">
          <View style={styles.column}>
            <Card variant="default">
              <AppText variant="label">Card default</AppText>
              <AppText variant="caption" tone="muted">
                Surface blanche avec bordure douce.
              </AppText>
            </Card>
            <Card variant="soft">
              <AppText variant="label">Card soft</AppText>
              <AppText variant="caption" tone="muted">
                Surface douce pour un fond plus chaleureux.
              </AppText>
            </Card>
          </View>
        </Section>

        <Section title="Badge">
          <View style={styles.rowWrap}>
            <Badge label="Neutral" variant="neutral" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Error" variant="error" />
          </View>
        </Section>

        <Section title="ProgressBar">
          <View style={styles.column}>
            <ProgressBar value={65} />
            <ProgressBar value={40} goalKey="sport" />
            <ProgressBar value={80} goalKey="mobility" />
          </View>
        </Section>

        <Section title="GoalPill">
          <View style={styles.rowWrap}>
            <GoalPill goalKey="sport" label="Sport" />
            <GoalPill goalKey="mobility" label="Mobilité" />
            <GoalPill goalKey="nutrition" label="Nutrition" />
            <GoalPill goalKey="learning" label="Apprentissage" />
            <GoalPill goalKey="project" label="Projet" />
            <GoalPill goalKey="spirituality" label="Spiritualité" />
            <GoalPill goalKey="sleep" label="Sommeil" />
          </View>
        </Section>

        <Section title="TaskCard">
          <View style={styles.column}>
            <TaskCard
              title="Étirements matinaux"
              description="Ouverture hanches et thoracique en douceur."
              timeLabel="07:30"
              durationMinutes={15}
              goalCategory="mobility"
              goalLabel="Mobilité"
              taskKind="timer"
              hasShortVersion
              onPress={() => undefined}
              onToggleDone={() => undefined}
            />
            <TaskCard
              title="Préparer un bowl équilibré"
              description="Légumes, protéines et féculents complets."
              timeLabel="12:15"
              durationMinutes={25}
              goalCategory="nutrition"
              goalLabel="Alimentation"
              taskKind="recipe"
              onPress={() => undefined}
              onToggleDone={() => undefined}
            />
            <TaskCard
              title="Séance upper body"
              description="Développé, tractions assistées, rowing."
              timeLabel="18:00"
              durationMinutes={45}
              goalCategory="sport"
              goalLabel="Muscu"
              status="in_progress"
              taskKind="strength"
              onPress={() => undefined}
              onToggleDone={() => undefined}
            />
            <TaskCard
              title="Bloc focus TypeScript"
              description="Avancer sur un module du side project."
              timeLabel="20:30"
              durationMinutes={30}
              goalCategory="learning"
              goalLabel="Apprentissage"
              taskKind="learning"
              onPress={() => undefined}
              onToggleDone={() => undefined}
            />
            <TaskCard
              title="Moment de gratitude"
              description="Respiration calme et intention du jour."
              timeLabel="21:00"
              durationMinutes={10}
              goalCategory="spirituality"
              goalLabel="Spiritualité"
              taskKind="spiritual"
              onPress={() => undefined}
              onToggleDone={() => undefined}
            />
            <TaskCard
              title="Marche active"
              timeLabel="08:00"
              durationMinutes={20}
              goalCategory="mobility"
              goalLabel="Mobilité"
              status="completed"
              taskKind="steps"
              onToggleDone={() => undefined}
            />
          </View>
        </Section>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    textTransform: 'uppercase',
  },
  column: {
    gap: spacing.md,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
