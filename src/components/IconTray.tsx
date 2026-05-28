"use client";

import React from "react";
import { useTheme } from "next-themes";
import { 
  PanelLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sun, 
  Moon, 
  Eye,
  Pencil
} from "lucide-react";

export function IconTray() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-[7px] bg-white/80 dark:bg-[#1c1c1a]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-2xl z-50 transition-colors duration-300">
      
      {/* Panel Left & Edit */}
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <PanelLeft className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <Pencil className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1 transition-colors duration-300" />

      {/* Screen Sizes */}
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-black dark:text-[#EFEEEA] bg-black/[0.06] dark:bg-white/[0.08] transition-colors">
        <Monitor className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <Tablet className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
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
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
        <Eye className="w-4 h-4" />
      </button>

    </div>
  );
}
