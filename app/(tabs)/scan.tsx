import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Text } from '@/components/Themed';
import { scanService } from '@/services/scanService';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { ImageRecognitionResponse } from '@/types/scan';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageRecognitionResponse | null>(null);

  const handleImage = async (useCamera: boolean) => {
    try {
      const imageUri = useCamera 
        ? await scanService.takePhoto()
        : await scanService.pickImage();

      if (imageUri) {
        setImage(imageUri);
        await analyzeImage(imageUri);
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to capture image',
      });
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await scanService.recognizeImage(imageUri);
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to analyze image',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan Clothing</Text>

        {!image ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleImage(true)}
            >
              <FontAwesome name="camera" size={24} color={Colors.light.background} />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => handleImage(false)}
            >
              <FontAwesome name="image" size={24} color={Colors.light.background} />
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
                <Text style={styles.loadingText}>Analyzing image...</Text>
              </View>
            ) : result ? (
              <View style={styles.resultContent}>
                {result.success ? (
                  <>
                    <Text style={styles.resultTitle}>Detected Items:</Text>
                    {result.data?.items.map((item, index) => {
                      const confidence = result.data?.confidence ?? 0;
                      return (
                        <Text key={index} style={styles.itemText}>
                          • {item} ({(confidence * 100).toFixed(1)}% confidence)
                        </Text>
                      );
                    })}
                  </>
                ) : (
                  <Text style={styles.errorText}>{result.error}</Text>
                )}
                
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={resetScan}
                >
                  <Text style={styles.resetButtonText}>Scan Another Item</Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    gap: 16,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  resultContent: {
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 16,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: Colors.light.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
});