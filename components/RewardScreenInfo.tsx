import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Offer } from '@/types/scan';
import { getAvailableOffers } from '@/services/scanService';
import Colors from '@/constants/Colors';

export default function RewardScreenInfo() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const userPoints = 100; // This would come from user state/context

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const availableOffers = await getAvailableOffers(userPoints);
    setOffers(availableOffers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsTitle}>Your Points</Text>
        <Text style={styles.pointsValue}>{userPoints}</Text>
      </View>

      <Text style={styles.title}>Available Rewards</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerCard}>
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.pointsRequired}>{item.pointsRequired} pts</Text>
            </View>
            <Text style={styles.offerDescription}>{item.description}</Text>
            <TouchableOpacity 
              style={[
                styles.redeemButton,
                { opacity: userPoints >= item.pointsRequired ? 1 : 0.5 }
              ]}
              disabled={userPoints < item.pointsRequired}
            >
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsTitle: {
    fontSize: 18,
    color: '#666',
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  offerCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  pointsRequired: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: '500',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  redeemButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: 'white',
    fontWeight: '500',
  },
}); 