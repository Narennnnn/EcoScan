import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function HistoryScreen() {
  // Dummy data for demonstration
  const historyItems = [
    {
      date: '2024-03-15',
      items: [
        { type: 'T-Shirt', carbonFootprint: 5, points: 10 },
        { type: 'Jeans', carbonFootprint: 10, points: 20 },
      ],
    },
    {
      date: '2024-03-14',
      items: [
        { type: 'Dress', carbonFootprint: 8, points: 16 },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan History</Text>
      </View>

      {historyItems.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dateText}>{day.date}</Text>
          
          {day.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.itemCard}>
              <View style={styles.itemIconContainer}>
                <FontAwesome name="shopping-bag" size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemType}>{item.type}</Text>
                <Text style={styles.itemStats}>
                  Carbon Footprint: {item.carbonFootprint} kg CO₂
                </Text>
                <Text style={styles.itemPoints}>+{item.points} points</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
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
  dayContainer: {
    padding: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  itemStats: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 4,
  },
  itemPoints: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
    marginTop: 4,
  },
}); 


