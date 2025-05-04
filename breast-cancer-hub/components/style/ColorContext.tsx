/** This component allows any child component to access the correct colors and global styles.
 * It will automatically update the view according to the dark mode setting.
 */
import React, { createContext, useContext, useState, useEffect } from "react";
import { makeGlobalStyles } from "./StyleSheet";
import {
  sharedColors,
  darkColors,
  lightColors,
  ColorTheme,
} from "@/constants/ThemeTokens";
import { getSetting, saveSetting } from "@/hooks/useSettings";

const ColorContext = createContext<{
  colors: ColorTheme;
  globalStyles: any;
  setDarkMode: (enabled: boolean) => void;
  darkMode: boolean;
} | null>(null);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkModeState] = useState(true);

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
    <ColorContext.Provider
      value={{ colors, globalStyles, setDarkMode, darkMode }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export function useColors() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("useColors must be used within a ColorProvider");
  return ctx;
}
export { ColorTheme };
