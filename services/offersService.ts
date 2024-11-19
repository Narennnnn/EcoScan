import { OffersResponse } from '../types/offers';

const API_URL = 'http://localhost:3000/api';

export const offersService = {
  async getOffers(): Promise<OffersResponse> {
    try {
      const response = await fetch(`${API_URL}/offers`);
      if (!response.ok) throw new Error('Failed to fetch offers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching offers:', error);
      return {
        success: false,
        error: 'Failed to load offers. Please try again.',
      };
    }
  },
}; 