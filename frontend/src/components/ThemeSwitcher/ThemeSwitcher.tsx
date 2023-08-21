"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "@/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContextProvider";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme} className="px-3 py-1" variant="outline">
      {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  );
};

export default ThemeSwitcher;
