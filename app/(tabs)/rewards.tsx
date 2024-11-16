import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function RewardsScreen() {
  const rewards = [
    {
      id: '1',
      title: '10% Off Eco-Friendly Brands',
      description: 'Get 10% off on selected eco-friendly clothing brands',
      pointsRequired: 100,
      icon: 'tag',
    },
    {
      id: '2',
      title: 'Free Recycling Kit',
      description: 'Receive a free clothing recycling kit',
      pointsRequired: 50,
      icon: 'recycle',
    },
    {
      id: '3',
      title: 'Plant a Tree',
      description: 'We will plant a tree in your name',
      pointsRequired: 75,
      icon: 'leaf',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
      </View>

      <View style={styles.pointsCard}>
        <View style={styles.pointsHeader}>
          <FontAwesome name="star" size={24} color={Colors.light.primary} />
          <Text style={styles.pointsTitle}>Your Points</Text>
        </View>
        <Text style={styles.pointsAmount}>0</Text>
        <Text style={styles.pointsSubtext}>Keep scanning to earn more points!</Text>
      </View>

      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        
        {rewards.map((reward) => (
          <View key={reward.id} style={styles.rewardCard}>
            <View style={styles.rewardIcon}>
              <FontAwesome name={reward.icon as any} size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <View style={styles.rewardFooter}>
                <Text style={styles.pointsRequired}>{reward.pointsRequired} points</Text>
                <TouchableOpacity 
                  style={[
                    styles.redeemButton,
                    { opacity: 0.5 } // Disabled state
                  ]}
                  disabled={true}
                >
                  <Text style={styles.redeemButtonText}>Redeem</Text>
                </TouchableOpacity>
              </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.background,
    textAlign: 'center',
  },
  pointsCard: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  pointsAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginTop: 12,
  },
  pointsSubtext: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 8,
  },
  rewardsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  rewardContent: {
    flex: 1,
    marginLeft: 16,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  rewardDescription: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pointsRequired: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  redeemButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  redeemButtonText: {
    color: Colors.light.background,
    fontSize: 14,
    fontWeight: '600',
  },
}); 


