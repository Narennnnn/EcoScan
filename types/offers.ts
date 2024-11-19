export interface Offer {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  type: 'discount' | 'freebie' | 'digital' | 'certificate' | 'product' | 'service' | 'education' | 'experience' | 'membership';
  tier: 'basic' | 'eco' | 'premium' | 'elite';
  pointsNeeded?: number;
}

export interface OffersResponse {
  success: boolean;
  data?: {
    userPoints: number;
    availableOffers: Offer[];
    upcomingOffers: Offer[];
  };
  error?: string;
} 