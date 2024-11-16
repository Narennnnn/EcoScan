import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from './Themed';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { ScanResult } from '@/types/scan';
import { analyzeCarbonFootprint } from '@/services/scanService';

export default function ScanScreenInfo() {
  const [image, setImage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You need to enable camera permissions to use this feature!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeScanResults(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeScanResults(result.assets[0].uri);
    }
  };

  const analyzeScanResults = async (imageUri: string) => {
    setLoading(true);
    try {
      const results = await analyzeCarbonFootprint(imageUri);
      setScanResults(results);
    } catch (error) {
      alert('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Scan Clothing</Text>
        <Text style={styles.subtitle}>
          Take a photo or upload an image to analyze
        </Text>
      </View>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <FontAwesome name="camera" size={50} color={Colors.light.tint} />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <FontAwesome name="camera" size={20} color="white" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <FontAwesome name="image" size={20} color="white" />
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.resultsContainer}>
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      )}

      {scanResults && !loading && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Scan Results</Text>
          {scanResults.items.map((item, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.itemType}>{item.type}</Text>
              <Text style={styles.carbonText}>{item.carbonFootprint} kg CO₂</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total Carbon Footprint: {scanResults.totalCarbonFootprint} kg CO₂
            </Text>
            <Text style={styles.pointsText}>
              Eco-Points Earned: +{scanResults.ecoRewardPoints}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  resultsContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemType: {
    fontSize: 16,
  },
  carbonText: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  totalContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
}); 