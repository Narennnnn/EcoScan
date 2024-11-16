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