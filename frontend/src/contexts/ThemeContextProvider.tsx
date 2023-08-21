"use client"

import { ReactNode, createContext, useEffect, useState } from "react";

export interface ThemeContextState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextState>({
  isDarkMode: true,
  toggleTheme: () => {},
});
export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}
export const THEME_STORAGE_KEY = "THEME";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<THEME>();

  const toggleTheme = () => {
    setTheme((prevDarkMode) =>
      prevDarkMode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  useEffect(() => {
    const prevDarkMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (prevDarkMode === THEME.LIGHT || prevDarkMode === THEME.DARK) {
      setTheme(prevDarkMode);
    } else {
      setTheme(THEME.DARK);
    }
  }, []);

  useEffect(() => {
    if (theme === THEME.DARK) {
      document.documentElement.classList.add(THEME.DARK);
      localStorage.setItem(THEME_STORAGE_KEY, THEME.DARK);
    } else if (theme === THEME.LIGHT) {
      document.documentElement.classList.remove(THEME.DARK);
      localStorage.setItem(THEME_STORAGE_KEY, THEME.LIGHT);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: theme === THEME.DARK,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
