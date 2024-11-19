import * as ImagePicker from 'expo-image-picker';
import { ImageRecognitionResponse, CarbonScoreRequest, CarbonScoreResponse } from '../types/scan';
import { storageService } from './storageService';

const API_URL = 'http://localhost:3000/api';

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
      
      // Get filename from uri
      const filename = imageUri.split('/').pop() || 'image.jpg';
      
      // Append the image to form data
      formData.append('image', {
        uri: imageUri,
        name: filename,
        type: 'image/jpeg',
      } as any);

      const response = await fetch(`${API_URL}/recognize-image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to analyze image. Please try again.',
      };
    }
  },

  async calculateCarbonScore(data: CarbonScoreRequest): Promise<CarbonScoreResponse> {
    try {
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
      return {
        success: false,
        error: 'Failed to calculate carbon score. Please try again.',
      };
    }
  },
}; 