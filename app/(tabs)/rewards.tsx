import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Offer } from '@/types/offers';
import { useApp } from '@/context/AppContext';
import { defaultOffers } from '@/constants/defaultOffers';

export default function RewardsScreen() {
  const { state, addOffers } = useApp();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getIconForType = (type: Offer['type']): keyof typeof FontAwesome.glyphMap => {
    const icons: Record<Offer['type'], keyof typeof FontAwesome.glyphMap> = {
      discount: 'tag',
      freebie: 'gift',
      digital: 'file',
      certificate: 'star',
      product: 'shopping-cart',
      service: 'users',
      education: 'book',
      experience: 'star',
      membership: 'user'
    };
    return icons[type] || 'gift';
  };

  const getTierColor = (tier: Offer['tier']): string => {
    const colors: Record<Offer['tier'], string> = {
      basic: '#74C0FC',
      eco: '#51CF66',
      premium: '#FAB005',
      elite: '#CC5DE8'
    };
    return colors[tier];
  };

  const initializeOffers = () => {
    // Sort offers by points required
    const sortedOffers = [...defaultOffers].sort((a, b) => 
      a.pointsRequired - b.pointsRequired
    );

    // Initially, all offers are upcoming with full points needed
    const upcomingOffers = sortedOffers.map(offer => ({
      ...offer,
      pointsNeeded: offer.pointsRequired - state.totalPoints
    }));

    addOffers(upcomingOffers);
    setLoading(false);
  };

  // Initialize offers when component mounts
  useEffect(() => {
    initializeOffers();
  }, []);

  // Re-calculate offers when points change
  useEffect(() => {
    initializeOffers();
  }, [state.totalPoints]);

  const onRefresh = () => {
    setRefreshing(true);
    initializeOffers();
    setRefreshing(false);
  };

  const OfferCard = ({ offer, isUpcoming = false }: { offer: Offer, isUpcoming?: boolean }) => (
    <View style={styles.offerCard}>
      <View style={styles.offerIconContainer}>
        <FontAwesome 
          name={getIconForType(offer.type)} 
          size={24} 
          color={Colors.light.primary} 
        />
      </View>
      <View style={styles.offerContent}>
        <View style={styles.offerHeader}>
          <Text style={styles.offerTitle}>{offer.title}</Text>
          <View style={[
            styles.tierBadge, 
            { backgroundColor: getTierColor(offer.tier) }
          ]}>
            <Text style={styles.tierText}>{offer.tier}</Text>
          </View>
        </View>
        <Text style={styles.offerDescription}>{offer.description}</Text>
        <View style={styles.offerFooter}>
          {isUpcoming ? (
            <Text style={styles.pointsNeeded}>
              {offer.pointsNeeded} more points needed
            </Text>
          ) : (
            <>
              <Text style={styles.pointsText}>{offer.pointsRequired} points</Text>
              <TouchableOpacity 
                style={styles.redeemButton}
                onPress={() => handleRedeem(offer)}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );

  const handleRedeem = (offer: Offer) => {
    // TODO: Implement redemption logic
    console.log('Redeeming offer:', offer.id);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Rewards</Text>
        <View style={styles.pointsContainer}>
          <FontAwesome name="star" size={24} color={Colors.light.background} />
          <Text style={styles.pointsValue}>{state.totalPoints}</Text>
          <Text style={styles.pointsLabel}>points</Text>
        </View>
      </View>

      {state.availableOffers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Offers</Text>
          {state.availableOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </View>
      )}

      {state.upcomingOffers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Offers</Text>
          {state.upcomingOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} isUpcoming />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.background,
    textAlign: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  pointsLabel: {
    fontSize: 16,
    color: Colors.light.background,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  offerCard: {
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
  offerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  offerContent: {
    flex: 1,
    marginLeft: 12,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: Colors.light.background,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  offerDescription: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 8,
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
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
  errorText: {
    fontSize: 16,
    color: Colors.light.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
  pointsNeeded: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    fontWeight: '500',
  },
});


