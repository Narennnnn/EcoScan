import { ScanResult, Offer, ClothingItem } from '../types/scan';
import * as ImagePicker from 'expo-image-picker';

export const pickImage = async (): Promise<string | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
};

export const takePhoto = async (): Promise<string | null> => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  
  if (permission.granted) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
  }

  return null;
};

export const analyzeCarbonFootprint = async (imageUri: string): Promise<ScanResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            type: 'T-Shirt',
            carbonFootprint: 5,
            confidence: 0.95,
          },
          {
            type: 'Jeans',
            carbonFootprint: 10,
            confidence: 0.88,
          },
        ],
        totalCarbonFootprint: 15,
        ecoRewardPoints: 30,
      });
    }, 1500);
  });
};

export const getAvailableOffers = async (points: number): Promise<Offer[]> => {
  // This would be replaced with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: '10% Off Eco-Friendly Brands',
          description: 'Get 10% off on selected eco-friendly clothing brands',
          pointsRequired: 100,
          discount: '10%',
        },
        {
          id: '2',
          title: 'Free Recycling Kit',
          description: 'Receive a free clothing recycling kit',
          pointsRequired: 50,
          discount: 'FREE',
        },
      ]);
    }, 1000);
  });
}; 