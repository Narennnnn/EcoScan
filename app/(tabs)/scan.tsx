import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text } from '@/components/Themed';
import { scanService } from '@/services/scanService';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { 
  ImageRecognitionResponse, 
  CarbonScoreResponse,
  CarbonScoreRequest 
} from '@/types/scan';
import { useApp } from '@/context/AppContext';

const RESET_DELAY = 20000; // 20 seconds delay before reset
const { width } = Dimensions.get('window');

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<ImageRecognitionResponse | null>(null);
  const [carbonScore, setCarbonScore] = useState<CarbonScoreResponse | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CarbonScoreRequest>({
    name: '',
    material: 'cotton',
    condition: 'good',
    age: '0-6m',
  });

  const { addPoints, updateCarbonScore } = useApp();

  // Reset everything to initial state
  const resetScreen = () => {
    setImage(null);
    setRecognitionResult(null);
    setCarbonScore(null);
    setFormData({
      name: '',
      material: 'cotton',
      condition: 'good',
      age: '0-6m',
    });
  };

  // Auto-reset after showing results
  useEffect(() => {
    if (carbonScore?.success) {
      const timer = setTimeout(() => {
        resetScreen();
      }, RESET_DELAY);

      return () => clearTimeout(timer);
    }
  }, [carbonScore]);

  // Update form data when recognition result changes
  useEffect(() => {
    if (recognitionResult?.success && recognitionResult.data?.items[0]) {
      setFormData(prev => ({
        ...prev,
        name: recognitionResult.data?.items[0] ?? ''
      }));
      // Reset carbon score when new item is recognized
      setCarbonScore(null);
    }
  }, [recognitionResult]);

  const handleImage = async (useCamera: boolean) => {
    try {
      // Reset previous results when starting new scan
      setCarbonScore(null);
      setRecognitionResult(null);
      
      const imageUri = useCamera 
        ? await scanService.takePhoto()
        : await scanService.pickImage();

      if (imageUri) {
        setImage(imageUri);
        await analyzeImage(imageUri);
      }
    } catch (error) {
      setRecognitionResult({
        success: false,
        error: 'Failed to capture image',
      });
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setLoading(true);
    setRecognitionResult(null);
    
    try {
      const response = await scanService.recognizeImage(imageUri);
      setRecognitionResult(response);
    } catch (error) {
      setRecognitionResult({
        success: false,
        error: 'Failed to analyze image',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateCarbonScore = async () => {
    setLoading(true);
    try {
      const response = await scanService.calculateCarbonScore(formData);
      setCarbonScore(response);
      
      if (response.success && response.data) {
        // Update global state
        addPoints(response.data.ecoPoints);
        updateCarbonScore(response.data.finalScore);
      }
    } catch (error) {
      setCarbonScore({
        success: false,
        error: 'Failed to calculate carbon score',
      });
    } finally {
      setLoading(false);
    }
  };

  const SelectionButton = ({ 
    label, 
    value, 
    selected, 
    onSelect 
  }: { 
    label: string; 
    value: string; 
    selected: boolean; 
    onSelect: () => void;
  }) => (
    <TouchableOpacity 
      style={[
        styles.selectionButton,
        selected && styles.selectionButtonSelected
      ]}
      onPress={onSelect}
    >
      <Text style={[
        styles.selectionButtonText,
        selected && styles.selectionButtonTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCarbonScoreForm = () => {
    if (!recognitionResult?.success || !recognitionResult.data) return null;

    const materials = [
      { label: 'Cotton', value: 'cotton' },
      { label: 'Organic Cotton', value: 'organic-cotton' },
      { label: 'Polyester', value: 'polyester' },
      { label: 'Wool', value: 'wool' },
      { label: 'Recycled', value: 'recycled' },
    ];

    const conditions = [
      { label: 'New', value: 'new' },
      { label: 'Good', value: 'good' },
      { label: 'Fair', value: 'fair' },
      { label: 'Poor', value: 'poor' },
    ];

    const ages = [
      { label: '0-6 months', value: '0-6m' },
      { label: '6-12 months', value: '6-12m' },
      { label: '12-24 months', value: '12-24m' },
    ];

    return (
      <View style={styles.formContainer}>
        <View style={styles.detectedItemContainer}>
          <Text style={styles.detectedLabel}>Detected Item</Text>
          <Text style={styles.detectedItem}>
            {recognitionResult.data.items[0]}
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Material</Text>
          <View style={styles.optionsContainer}>
            {materials.map((item) => (
              <SelectionButton
                key={item.value}
                label={item.label}
                value={item.value}
                selected={formData.material === item.value}
                onSelect={() => setFormData(prev => ({ ...prev, material: item.value }))}
              />
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Condition</Text>
          <View style={styles.optionsContainer}>
            {conditions.map((item) => (
              <SelectionButton
                key={item.value}
                label={item.label}
                value={item.value}
                selected={formData.condition === item.value}
                onSelect={() => setFormData(prev => ({ ...prev, condition: item.value }))}
              />
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Age</Text>
          <View style={styles.optionsContainer}>
            {ages.map((item) => (
              <SelectionButton
                key={item.value}
                label={item.label}
                value={item.value}
                selected={formData.age === item.value}
                onSelect={() => setFormData(prev => ({ ...prev, age: item.value }))}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculateCarbonScore}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.light.background} />
          ) : (
            <Text style={styles.calculateButtonText}>Calculate Impact</Text>
          )}
        </TouchableOpacity>

        {carbonScore && (
          <View style={styles.scoreContainer}>
            {carbonScore.success ? (
              <>
                <Text style={styles.scoreTitle}>Carbon Score Results</Text>
                <Text style={styles.scoreText}>
                  Base Score: {carbonScore.data?.baseScore}
                </Text>
                <Text style={styles.scoreText}>
                  Final Score: {carbonScore.data?.finalScore}
                </Text>
                <Text style={styles.pointsText}>
                  Eco Points Earned: +{carbonScore.data?.ecoPoints}
                </Text>
              </>
            ) : (
              <Text style={styles.errorText}>{carbonScore.error}</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  // Manual reset button component
  const ResetButton = () => (
    <TouchableOpacity
      style={styles.resetButton}
      onPress={resetScreen}
    >
      <Text style={styles.resetButtonText}>Scan New Item</Text>
    </TouchableOpacity>
  );

  const renderInitialScreen = () => (
    <View style={styles.initialContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Clothing</Text>
        <Text style={styles.subtitle}>
          Analyze your clothing's environmental impact
        </Text>
      </View>

      <View style={styles.instructionsContainer}>
        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Take a Photo</Text>
            <Text style={styles.stepText}>
              Capture a clear image of your clothing item
            </Text>
          </View>
        </View>

        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get Analysis</Text>
            <Text style={styles.stepText}>
              We'll identify the item and calculate its impact
            </Text>
          </View>
        </View>

        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Earn Points</Text>
            <Text style={styles.stepText}>
              Receive eco-points based on your choices
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => handleImage(true)}
        >
          <View style={styles.buttonIconContainer}>
            <FontAwesome name="camera" size={28} color={Colors.light.background} />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Take Photo</Text>
            <Text style={styles.buttonSubtext}>Use your camera</Text>
          </View>
          <FontAwesome 
            name="angle-right" 
            size={24} 
            color={Colors.light.background} 
            style={styles.buttonArrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => handleImage(false)}
        >
          <View style={styles.buttonIconContainer}>
            <FontAwesome name="image" size={28} color={Colors.light.background} />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Choose Photo</Text>
            <Text style={styles.buttonSubtext}>From your gallery</Text>
          </View>
          <FontAwesome 
            name="angle-right" 
            size={24} 
            color={Colors.light.background} 
            style={styles.buttonArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!image ? (
        renderInitialScreen()
      ) : (
        <View style={styles.resultContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.light.primary} />
              <Text style={styles.loadingText}>Analyzing image...</Text>
            </View>
          ) : recognitionResult ? (
            <View style={styles.resultContent}>
              {recognitionResult.success ? (
                <>
                  <Text style={styles.resultTitle}>Detected Items:</Text>
                  {recognitionResult.data?.items.map((item, index) => {
                    const confidence = recognitionResult.data?.confidence ?? 0;
                    return (
                      <Text key={index} style={styles.itemText}>
                        • {item} ({(confidence * 100).toFixed(1)}% confidence)
                      </Text>
                    );
                  })}
                </>
              ) : (
                <Text style={styles.errorText}>{recognitionResult.error}</Text>
              )}
              
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetScreen}
              >
                <Text style={styles.resetButtonText}>Scan Another Item</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
      {recognitionResult?.success && renderCarbonScoreForm()}
      {carbonScore?.success && <ResetButton />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  initialContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  buttonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  buttonTitle: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: Colors.light.background,
    opacity: 0.8,
    fontSize: 14,
    marginTop: 2,
  },
  buttonArrow: {
    marginLeft: 8,
    opacity: 0.8,
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
    backgroundColor: Colors.light.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  resetButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    padding: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    marginTop: 20,
  },
  detectedItemContainer: {
    marginBottom: 24,
  },
  detectedLabel: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 4,
  },
  detectedItem: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.light.text,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  selectionButtonSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  selectionButtonText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  selectionButtonTextSelected: {
    color: Colors.light.background,
    fontWeight: '500',
  },
  calculateButton: {
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.light.text,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  pointsText: {
    fontSize: 18,
    color: Colors.light.primary,
    fontWeight: '600',
    marginTop: 8,
  },
});