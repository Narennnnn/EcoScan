import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

const mockHistory = [
  {
    id: '1',
    date: '2024-03-10',
    items: ['T-Shirt', 'Jeans'],
    carbonFootprint: 15,
    points: 30,
  },
  // Add more mock data as needed
];

export default function HistoryScreenInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.items}>{item.items.join(', ')}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.carbonText}>{item.carbonFootprint} kg CO₂</Text>
              <Text style={styles.pointsText}>+{item.points} points</Text>
            </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  items: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  carbonText: {
    color: Colors.light.tint,
    fontWeight: '500',
  },
  pointsText: {
    color: '#28a745',
    fontWeight: '500',
  },
}); 