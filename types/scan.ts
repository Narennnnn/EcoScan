export interface ClothingItem {
  type: string;
  carbonFootprint: number;
  confidence: number;
}

export interface ScanResult {
  items: ClothingItem[];
  totalCarbonFootprint: number;
  ecoRewardPoints: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discount: string;
}

export interface ImageRecognitionResponse {
  success: boolean;
  data?: {
    items: string[];
    confidence: number;
  };
  error?: string;
}

export interface CarbonScoreRequest {
  name: string;
  material?: 'cotton' | 'organic-cotton' | 'polyester' | 'wool' | 'recycled';
  condition?: 'new' | 'good' | 'fair' | 'poor';
  age?: '0-6m' | '6-12m' | '1y+';
}

export interface CarbonScoreResponse {
  success: boolean;
  data?: {
    baseScore: number;
    adjustments: {
      material: number;
      condition: number;
      age: number;
    };
    finalScore: number;
    ecoPoints: number;
  };
  error?: string;
} 