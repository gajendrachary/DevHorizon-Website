import React, { createContext, useContext, useState, useCallback } from 'react';

interface DynamicBackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  resetToDefault: () => void;
  defaultColor: string;
}

const DynamicBackgroundContext = createContext<DynamicBackgroundContextType | undefined>(undefined);

interface DynamicBackgroundProviderProps {
  children: React.ReactNode;
  defaultColor?: string;
}

export const DynamicBackgroundProvider = ({ 
  children, 
  defaultColor = 'hsl(var(--background))' 
}: DynamicBackgroundProviderProps) => {
  const [backgroundColor, setBackgroundColorState] = useState(defaultColor);

  const setBackgroundColor = useCallback((color: string) => {
    setBackgroundColorState(color);
  }, []);

  const resetToDefault = useCallback(() => {
    setBackgroundColorState(defaultColor);
  }, [defaultColor]);

  return (
    <DynamicBackgroundContext.Provider value={{ 
      backgroundColor, 
      setBackgroundColor, 
      resetToDefault,
      defaultColor 
    }}>
      {children}
    </DynamicBackgroundContext.Provider>
  );
};

export const useDynamicBackground = () => {
  const context = useContext(DynamicBackgroundContext);
  if (!context) {
    throw new Error('useDynamicBackground must be used within a DynamicBackgroundProvider');
  }
  return context;
};
