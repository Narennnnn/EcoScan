import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import RewardScreenInfo from '@/components/RewardScreenInfo';
export default function RewardScreen() {
  return (
    <View style={styles.container}>
        <RewardScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 


