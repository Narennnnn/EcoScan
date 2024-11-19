import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_POINTS: 'user_points',
  SCAN_HISTORY: 'scan_history',
};

export const storageService = {
  async getUserPoints(): Promise<number> {
    try {
      const points = await AsyncStorage.getItem(STORAGE_KEYS.USER_POINTS);
      return points ? parseInt(points, 10) : 0;
    } catch (error) {
      console.error('Error getting user points:', error);
      return 0;
    }
  },

  async addPoints(points: number): Promise<void> {
    try {
      const currentPoints = await this.getUserPoints();
      const newPoints = currentPoints + points;
      await AsyncStorage.setItem(STORAGE_KEYS.USER_POINTS, newPoints.toString());
    } catch (error) {
      console.error('Error adding points:', error);
    }
  },

  async saveScanResult(result: any): Promise<void> {
    try {
      const history = await this.getScanHistory();
      const updatedHistory = [
        {
          ...result,
          date: new Date().toISOString(),
        },
        ...history,
      ];
      await AsyncStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving scan result:', error);
    }
  },

  async getScanHistory(): Promise<any[]> {
    try {
      const history = await AsyncStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting scan history:', error);
      return [];
    }
  },
}; 