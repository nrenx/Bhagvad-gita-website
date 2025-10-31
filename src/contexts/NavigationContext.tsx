'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <NavigationContext.Provider 
      value={{ 
        isTransitioning, 
        setIsTransitioning 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
