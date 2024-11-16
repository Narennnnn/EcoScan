import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import HistoryScreenInfo from '@/components/HistoryScreenInfo';
export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <HistoryScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 


