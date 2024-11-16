import React, { useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto, analyzeCarbonFootprint } from '../services/scanService';
import { ScanResult } from '../types/scan';

export default function ScannerView() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleImageScan = async (imageUri: string) => {
    setLoading(true);
    try {
      const scanResult = await analyzeCarbonFootprint(imageUri);
      setResult(scanResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImage(uri);
      await handleImageScan(uri);
    }
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setImage(uri);
      await handleImageScan(uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={[styles.button, styles.cameraButton]}
          >
            <Ionicons name="camera" size={24} color={Colors.light.background} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePickImage}
            style={[styles.button, styles.galleryButton]}
          >
            <Ionicons name="images" size={24} color={Colors.light.background} />
            <Text style={styles.buttonText}>Pick from Gallery</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          {loading ? (
            <ActivityIndicator size="large" color={Colors.light.primary} />
          ) : (
            result && (
              <View style={styles.scoreContainer}>
                <Text style={styles.totalScore}>
                  Total Carbon Footprint: {result.totalCarbonFootprint} kg CO₂
                </Text>
                <Text style={styles.points}>
                  Eco-Reward Points: +{result.ecoRewardPoints}
                </Text>
                {result.items.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemText}>
                      {item.type}: {item.carbonFootprint} kg CO₂
                    </Text>
                    <Text style={styles.confidenceText}>
                      Confidence: {(item.confidence * 100).toFixed(1)}%
                    </Text>
                  </View>
                ))}
              </View>
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  cameraButton: {
    backgroundColor: Colors.light.primary,
  },
  galleryButton: {
    backgroundColor: Colors.light.secondary,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  scoreContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 10,
  },
  points: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: Colors.light.border,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  confidenceText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    marginTop: 5,
  },
}); 