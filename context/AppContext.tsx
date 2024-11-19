import React, { createContext, useContext, useState, useEffect } from 'react';
import { Offer } from '../types/offers';

interface AppState {
  totalPoints: number;
  carbonScore: number;
  availableOffers: Offer[];
  upcomingOffers: Offer[];
}

interface AppContextType {
  state: AppState;
  addPoints: (points: number) => void;
  updateCarbonScore: (score: number) => void;
  resetState: () => void;
  addOffers: (offers: Offer[]) => void;
}

const initialState: AppState = {
  totalPoints: 0,
  carbonScore: 0,
  availableOffers: [],
  upcomingOffers: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const addPoints = (points: number) => {
    setState(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const { available, upcoming } = recalculateOffers(
        [...prev.availableOffers, ...prev.upcomingOffers],
        newTotalPoints
      );

      return {
        ...prev,
        totalPoints: newTotalPoints,
        availableOffers: available,
        upcomingOffers: upcoming,
      };
    });
  };

  const updateCarbonScore = (score: number) => {
    setState(prev => ({
      ...prev,
      carbonScore: prev.carbonScore + score,
    }));
  };

  const recalculateOffers = (allOffers: Offer[], currentPoints: number) => {
    const available: Offer[] = [];
    const upcoming: Offer[] = [];

    // Sort offers by points required
    const sortedOffers = [...allOffers].sort((a, b) => a.pointsRequired - b.pointsRequired);

    sortedOffers.forEach(offer => {
      if (currentPoints >= offer.pointsRequired) {
        available.push(offer);
      } else {
        upcoming.push({
          ...offer,
          pointsNeeded: offer.pointsRequired - currentPoints,
        });
      }
    });

    return { available, upcoming };
  };

  const addOffers = (offers: Offer[]) => {
    const { available, upcoming } = recalculateOffers(offers, state.totalPoints);
    setState(prev => ({
      ...prev,
      availableOffers: available,
      upcomingOffers: upcoming,
    }));
  };

  return (
    <AppContext.Provider 
      value={{ 
        state, 
        addPoints, 
        updateCarbonScore,
        resetState,
        addOffers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 