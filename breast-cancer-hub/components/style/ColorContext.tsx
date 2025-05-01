/** This component allows any child component to access the correct colors and global styles.
 * It will automatically update the view according to the dark mode setting.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { makeGlobalStyles } from './StyleSheet';
import { sharedColors, darkColors, lightColors } from '@/constants/ThemeTokens';
import { getSetting, saveSetting } from '@/hooks/useSettings';

export interface ColorTheme {
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

  blue: string,
  green: string,

  text: string,
  background: string,
  tint: string,
  icon: string,
  tabIconDefault: string,
  tabIconSelected: string,
}

const ColorContext = createContext<{
  colors: ColorTheme,
  globalStyles: any,
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

const colors = {
  ...sharedColors,
  ...(darkMode ? darkColors : lightColors),
};
  const globalStyles = makeGlobalStyles(colors);

  return (
    <ColorContext.Provider value={{ colors, globalStyles, setDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
};

export function useColors() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColors must be used within a ColorProvider');
  return ctx;
}