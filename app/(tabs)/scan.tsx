import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import ScanScreenInfo from '@/components/ScanScreenInfo';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
        <ScanScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});