import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { Text } from '@/components/Themed';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const { state } = useApp();
  const [timePoints, setTimePoints] = useState<number[]>([0]);
  const [carbonPoints, setCarbonPoints] = useState<number[]>([0]);
  const [timeLabels, setTimeLabels] = useState<string[]>(['Start']);

  // Update charts when points or carbon score changes
  useEffect(() => {
    const currentTime = new Date();
    const timeLabel = currentTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    if (state.totalPoints > 0) {
      setTimePoints(prev => [...prev, state.totalPoints]);
      setCarbonPoints(prev => [...prev, state.carbonScore]);
      setTimeLabels(prev => [...prev, timeLabel]);
    }
  }, [state.totalPoints, state.carbonScore]);

  // Keep only last 5 data points
  const getLastNPoints = (arr: any[], n: number = 5) => {
    return arr.slice(-n);
  };

  const chartData = {
    labels: getLastNPoints(timeLabels),
    datasets: [{
      data: getLastNPoints(timePoints),
    }]
  };

  const carbonData = {
    labels: getLastNPoints(timeLabels),
    datasets: [{
      data: getLastNPoints(carbonPoints),
    }]
  };

  // Format numbers for better display
  const formatNumbers = {
    carbonSaved: Number(state.carbonScore || 0).toFixed(2),
    points: state.totalPoints || 0
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    unit 
  }: { 
    icon: keyof typeof FontAwesome.glyphMap; 
    title: string; 
    value: string | number; 
    unit: string;
  }) => (
    <View style={styles.statCard}>
      <FontAwesome name={icon} size={24} color={Colors.light.primary} />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>
        {value} <Text style={styles.statUnit}>{unit}</Text>
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Impact History</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard 
          icon="leaf" 
          title="Total Carbon Saved" 
          value={formatNumbers.carbonSaved}  // Using formatted number
          unit="kg CO₂"
        />
        <StatCard 
          icon="star" 
          title="Total Points" 
          value={formatNumbers.points}
          unit="pts"
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Points Progression</Text>
        <View style={styles.chartWrapper}>
          {timePoints.length > 1 ? (
            <LineChart
              data={chartData}
              width={width - 32}
              height={220}
              chartConfig={{
                backgroundColor: Colors.light.background,
                backgroundGradientFrom: Colors.light.background,
                backgroundGradientTo: Colors.light.background,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(47, 158, 68, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: Colors.light.primary
                }
              }}
              bezier
              style={styles.chart}
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyChartText}>Points will appear here after scanning</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Carbon Savings</Text>
        <View style={styles.chartWrapper}>
          {carbonPoints.length > 1 ? (
            <BarChart
              data={carbonData}
              width={width - 32}
              height={220}
              yAxisLabel=""
              yAxisSuffix=" kg"
              chartConfig={{
                backgroundColor: Colors.light.background,
                backgroundGradientFrom: Colors.light.background,
                backgroundGradientTo: Colors.light.background,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(47, 158, 68, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={styles.chart}
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyChartText}>Carbon savings will appear here after scanning</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.recentScans}>
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        {state.totalPoints > 0 ? (
          <View style={styles.scanItem}>
            <FontAwesome name="shopping-bag" size={24} color={Colors.light.primary} />
            <View style={styles.scanInfo}>
              <Text style={styles.scanTitle}>Clothing Scan</Text>
              <Text style={styles.scanDetail}>
                Carbon Saved: {Number(state.carbonScore).toFixed(2)} kg CO₂
              </Text>
              <Text style={styles.scanDetail}>
                Points Earned: {state.totalPoints}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome name="history" size={40} color={Colors.light.tabIconDefault} />
            <Text style={styles.emptyStateText}>No scans yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Start scanning clothes to track your impact
            </Text>
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 4,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.light.tabIconDefault,
  },
  chartContainer: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.light.text,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 16,
  },
  recentScans: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.light.text,
  },
  scanItem: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scanInfo: {
    marginLeft: 16,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  scanDetail: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  emptyChart: {
    width: width - 32,
    height: 220,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
  },
  emptyChartText: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
}); 



