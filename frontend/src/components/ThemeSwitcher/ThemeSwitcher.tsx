"use client"

import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState<"dark" | "light">();

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) =>
      prevDarkMode === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    const prevDarkMode = localStorage.getItem("theme");
    if (prevDarkMode === "light" || prevDarkMode === "dark") {
      setDarkMode(prevDarkMode);
    } else {
      setDarkMode("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (darkMode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Button onClick={toggleTheme} className="px-3 py-1" variant="outline">
      {darkMode === "light" ? (
        <MoonIcon size={16}/>
      ) : (
        <SunIcon size={16}/>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
