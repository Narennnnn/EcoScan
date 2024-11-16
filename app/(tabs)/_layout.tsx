import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size: number;
}) {
  return <Ionicons style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Track',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              name={focused ? 'gift' : 'gift-outline'} 
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
