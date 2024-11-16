import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

type IconName = 'leaf' | 'tint' | 'star' | 'recycle' | 'sun-o' | 'tree';

interface ImpactMetric {
  icon: IconName;
  number: string;
  label: string;
  color?: string;
}

interface EcoTip {
  icon: IconName;
  title: string;
  text: string;
}

export default function HomeScreen() {
  const impactMetrics: ImpactMetric[] = [
    {
      icon: 'leaf',
      number: '0 kg',
      label: 'CO₂ Saved',
      color: Colors.light.primary,
    },
    {
      icon: 'tint',
      number: '0 L',
      label: 'Water Saved',
      color: '#4DABF7',
    },
    {
      icon: 'recycle',
      number: '0',
      label: 'Items Recycled',
      color: '#40C057',
    },
    {
      icon: 'star',
      number: '0',
      label: 'Points Earned',
      color: '#FAB005',
    },
  ];

  const ecoTips: EcoTip[] = [
    {
      icon: 'leaf',
      title: 'Choose Sustainable',
      text: 'Opt for organic cotton and recycled materials to minimize environmental impact.',
    },
    {
      icon: 'recycle',
      title: 'Circular Fashion',
      text: 'Extend your clothes life through proper care and recycling practices.',
    },
    {
      icon: 'tint',
      title: 'Save Water',
      text: 'Support brands using water-efficient production methods.',
    },
    {
      icon: 'sun-o',
      title: 'Energy Efficient',
      text: 'Wash clothes in cold water xand air dry when possible.',
    },
    {
      icon: 'tree',
      title: 'Go Natural',
      text: 'Choose natural fibers that biodegrade at the end of their lifecycle.',
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>EcoScan</Text>
        <Text style={styles.subtitle}>Track Your Fashion Footprint</Text>
      </View>

      <View style={styles.impactSection}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.impactContainer}
          snapToInterval={width * 0.4 + 12}
          decelerationRate="fast"
        >
          {impactMetrics.map((metric, index) => (
            <View 
              key={index} 
              style={[
                styles.impactCard,
                { width: width * 0.3
                  
                 }
              ]}
            >
              <FontAwesome 
                name={metric.icon} 
                size={24} 
                color={metric.color || Colors.light.primary} 
              />
              <Text style={styles.impactNumber}>{metric.number}</Text>
              <Text style={styles.impactLabel}>{metric.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Eco Tips</Text>
        {ecoTips.map((tip, index) => (
          <View 
            key={index} 
            style={[
              styles.tipCard,
              { opacity: 1 - (index * 0.1) }  // Subtle fade effect for cards
            ]}
          >
            <View style={[styles.tipIcon, { borderColor: Colors.light.primary }]}>
              <FontAwesome name={tip.icon} size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          </View>
        ))}
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
  impactSection: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  impactContainer: {
    paddingRight: 20,
    gap: 12,
  },
  impactCard: {
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
  impactNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 12,
  },
  impactLabel: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
    textAlign: 'center',
  },
  tipsSection: {
    padding: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
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