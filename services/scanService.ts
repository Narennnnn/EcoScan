import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { ImageRecognitionResponse, CarbonScoreRequest, CarbonScoreResponse } from '../types/scan';
import { storageService } from './storageService';

const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://192.168.0.255:3000/api';
  }
  // Similarly add for 'ios' when locally testing on ios phone using expo go
  // and add the ip address of the pc running the server
  return 'http://localhost:3000/api';
};

export const scanService = {
  async pickImage(): Promise<string | null> {
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
  },

  async takePhoto(): Promise<string | null> {
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
  },

  async recognizeImage(imageUri: string): Promise<ImageRecognitionResponse> {
    try {
      const formData = new FormData();
      
      const filename = imageUri.split('/').pop() || 'image.jpg';
      
      formData.append('image', {
        uri: imageUri,
        name: filename,
        type: 'image/jpeg',
      } as any);

      const API_URL = getApiUrl();
      console.log('Sending request to:', API_URL);

      const response = await fetch(`${API_URL}/recognize-image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 500) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes('No clothing items detected')) {
          return {
            success: false,
            error: 'No clothing items or accessories identified. Please try again with a clearer picture of the item.',
          };
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Image recognition error:', error);
      
      if (error instanceof TypeError && error.message === 'Network request failed') {
        return {
          success: false,
          error: 'Unable to connect to the server. Please check your internet connection.',
        };
      }

      return {
        success: false,
        error: 'Something went wrong while analyzing the image. Please try again.',
      };
    }
  },

  async calculateCarbonScore(data: CarbonScoreRequest): Promise<CarbonScoreResponse> {
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/calculate-carbon-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success && result.data?.ecoPoints) {
        await storageService.addPoints(result.data.ecoPoints);
        await storageService.saveScanResult({
          ...result.data,
          itemName: data.name,
        });
      }

      return result;
    } catch (error) {
      console.error('Carbon score calculation error:', error); // Debug log
      return {
        success: false,
        error: 'Failed to calculate carbon score. Please try again.',
      };
    }
  },
}; 