"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { EditorContext } from "@/components/EditorProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const editor = React.useContext(EditorContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full" />; // placeholder
  }

  const isDark = editor ? editor.canvasTheme === "dark" : theme === "dark";

  const toggleTheme = () => {
    if (editor) {
      editor.setCanvasTheme(isDark ? "light" : "dark");
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
