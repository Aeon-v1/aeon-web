"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEditor } from "@/components/EditorProvider";
import { 
  PanelLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sun, 
  Moon, 
  Play,
  Square,
  Pencil,
  Undo2,
  Redo2
} from "lucide-react";

export function IconTray() {
  const { theme, setTheme } = useTheme();
  const { undo, redo, canUndo, canRedo, isPreviewMode, setIsPreviewMode, viewportSize, setViewportSize } = useEditor();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getDeviceBtnClass = (active: boolean) => 
    active 
      ? "w-8 h-8 rounded-full flex items-center justify-center text-black dark:text-[#EFEEEA] bg-black/[0.06] dark:bg-white/[0.08] transition-colors"
      : "w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer";
  
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-[7px] bg-white/80 dark:bg-[#1c1c1a]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-2xl z-50 transition-colors duration-300">
      {/* Undo / Redo */}
      <button 
        onClick={undo}
        disabled={!canUndo}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          canUndo 
            ? "text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] cursor-pointer" 
            : "text-gray-300 dark:text-white/20 cursor-not-allowed"
        }`}
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button 
        onClick={redo}
        disabled={!canRedo}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          canRedo 
            ? "text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] cursor-pointer" 
            : "text-gray-300 dark:text-white/20 cursor-not-allowed"
        }`}
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1 transition-colors duration-300" />

      {/* Panel Left & Edit */}
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <PanelLeft className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <Pencil className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1 transition-colors duration-300" />

      {/* Screen Sizes */}
      <button onClick={() => setViewportSize("desktop")} className={getDeviceBtnClass(viewportSize === "desktop")}>
        <Monitor className="w-4 h-4" />
      </button>
      <button onClick={() => setViewportSize("tablet")} className={getDeviceBtnClass(viewportSize === "tablet")}>
        <Tablet className="w-4 h-4" />
      </button>
      <button onClick={() => setViewportSize("mobile")} className={getDeviceBtnClass(viewportSize === "mobile")}>
        <Smartphone className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1 transition-colors duration-300" />

      {/* Theme & Preview */}
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
      >
        {mounted && theme !== "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
      <button 
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
      >
        {isPreviewMode ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

    </div>
  );
}
