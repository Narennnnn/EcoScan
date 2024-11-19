import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TouchableOpacity,
  Dimensions,
  Animated 
} from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');

interface Tip {
  icon: keyof typeof FontAwesome.glyphMap;
  title: string;
  text: string;
}

export default function HomeScreen() {
  const { state } = useApp();

  const getEnvironmentalImpact = () => {
    const carbonScore = Number(state.carbonScore).toFixed(2);
    const trees = (state.carbonScore * 0.1).toFixed(1);
    const water = Math.round(state.carbonScore * 0.5);
    return { carbonScore, trees, water };
  };

  const { carbonScore, trees, water } = getEnvironmentalImpact();

  const ImpactCard = ({ 
    icon, 
    value, 
    label 
  }: { 
    icon: keyof typeof FontAwesome.glyphMap; 
    value: string | number; 
    label: string;
  }) => (
    <View style={styles.impactCard}>
      <FontAwesome name={icon} size={24} color={Colors.light.primary} />
      <Text style={styles.impactValue}>{value}</Text>
      <Text style={styles.impactLabel}>{label}</Text>
    </View>
  );

  const getTip = (): Tip => {
    if (state.totalPoints === 0) {
      return {
        icon: 'lightbulb-o' as keyof typeof FontAwesome.glyphMap,
        title: 'Start Your Eco Journey',
        text: 'Scan your first clothing item to begin tracking your environmental impact!'
      };
    }
    
    if (state.carbonScore > 10) {
      return {
        icon: 'leaf' as keyof typeof FontAwesome.glyphMap,
        title: 'Making a Difference!',
        text: `You've saved ${carbonScore}kg of CO₂! That's equivalent to planting ${trees} trees.`
      };
    }

    return {
      icon: 'recycle' as keyof typeof FontAwesome.glyphMap,
      title: 'Keep Going!',
      text: 'Every scan helps build a more sustainable future.'
    };
  };

  const currentTip = getTip();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EcoScan</Text>
        <Text style={styles.subtitle}>Your Sustainable Fashion Companion</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <View style={styles.impactGrid}>
          <ImpactCard 
            icon="leaf" 
            value={`${carbonScore}kg`}
            label="CO₂ Saved" 
          />
          <ImpactCard 
            icon="star" 
            value={state.totalPoints || 0}
            label="Points Earned" 
          />
          <ImpactCard 
            icon="tint" 
            value={`${water}L`}
            label="Water Saved" 
          />
          <ImpactCard 
            icon="tree" 
            value={trees}
            label="Trees Equivalent" 
          />
        </View>
      </View>

      {state.totalPoints > 0 && (
        <View style={styles.achievementContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementCard}>
            <FontAwesome 
              name={state.totalPoints >= 100 ? "trophy" : "star-o"} 
              size={32} 
              color={state.totalPoints >= 100 ? Colors.light.primary : Colors.light.tabIconDefault} 
            />
            <Text style={styles.achievementTitle}>
              {state.totalPoints >= 100 ? "Eco Warrior!" : "Next Milestone"}
            </Text>
            <Text style={styles.achievementText}>
              {state.totalPoints >= 100 
                ? "You've earned over 100 points!"
                : `${100 - state.totalPoints} points to reach Eco Warrior status`}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.tipContainer}>
        <Text style={styles.sectionTitle}>Eco Tip</Text>
        <View style={styles.tipCard}>
          <FontAwesome 
            name={currentTip.icon} 
            size={24} 
            color={Colors.light.primary} 
          />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{currentTip.title}</Text>
            <Text style={styles.tipText}>{currentTip.text}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.light.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.background,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.background,
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 4,
  },
  summaryContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.light.text,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  impactCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 8,
  },
  impactLabel: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  achievementContainer: {
    padding: 20,
  },
  achievementCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 12,
  },
  achievementText: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
    textAlign: 'center',
  },
  tipContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  tipText: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
    lineHeight: 20,
  },
}); 