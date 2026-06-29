import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';

import { useTheme } from '@/shared/hooks/useTheme';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Aujourd\'hui',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'sun.max.fill',
                android: 'today',
                web: 'today',
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Objectifs',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'target',
                android: 'flag',
                web: 'flag',
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progression',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chart.line.uptrend.xyaxis',
                android: 'trending_up',
                web: 'trending_up',
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'person.fill',
                android: 'person',
                web: 'person',
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
