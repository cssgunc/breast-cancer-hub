import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightColors, darkColors } from './StyleSheet';
import { getSetting, saveSetting } from '@/hooks/useSettings';

interface Theme {
  white: string,
  black: string,

  darkestHighlight: string,
  darkHighlight: string,
  mediumHighlight: string,
  lightHighlight: string,

  darkGray: string,
  mediumGray: string,
  lightGray: string,
  lighterGray: string,
  lightestGray: string,

  backgroundGray: string,
  backgroundLightGray: string,

  grayHomePageLearnMoreButton: string,

  blue: string,
  green: string,
}

const ColorContext = createContext<{
  colors: Theme,
  setDarkMode: (enabled: boolean) => void,
} | null>(null);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    getSetting("useDarkTheme").then((value) => {
      setDarkModeState(value);
    });
  }, []);

  const setDarkMode = (enabled: boolean) => {
    saveSetting("useDarkTheme", enabled);
    setDarkModeState(enabled);
  };

  const colors = darkMode ? darkColors : lightColors;

  return (
    <ColorContext.Provider value={{ colors, setDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
};

export function useColors() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColors must be used within a ColorProvider');
  return ctx;
}