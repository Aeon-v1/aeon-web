"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEditor } from "@/components/EditorProvider";
import { useAuth } from "@/components/AuthProvider";
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
  Redo2,
  Cloud,
  CloudUpload,
  Globe
} from "lucide-react";

export function IconTray() {
  const { theme, setTheme } = useTheme();
  const { isPreviewMode, setIsPreviewMode, viewportSize, setViewportSize, syncStatus, publishWebsite, isLeftPanelOpen, setIsLeftPanelOpen, isRightPanelOpen, setIsRightPanelOpen, hasPaid } = useEditor();
  const [mounted, setMounted] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { user, linkWithGoogle } = useAuth();

  const handlePublish = async () => {
    if (!hasPaid) {
      if (!user?.uid) {
        alert("Authentication is still initializing. Please wait a second and try again.");
        return;
      }

      let finalUser = user;
      if (user.isAnonymous) {
        if (window.confirm("You are currently using a temporary session. To make sure you don't lose access to your website after paying, please link a Google account now.")) {
          try {
            const linkedUser = await linkWithGoogle();
            if (linkedUser) {
              finalUser = linkedUser;
            } else {
              return; // Linking returned null
            }
          } catch (e) {
             return; // Linking threw error or was cancelled
          }
        } else {
          return; // User cancelled the confirm dialog
        }
      }
      
      const emailInput = finalUser?.email || window.prompt("Please enter your email address for the receipt:", "");
      if (!emailInput) return; // User cancelled

      setPublishing(true);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Hardcoding 5000 NGN for now
          body: JSON.stringify({ email: emailInput, amount: 5000, uid: user.uid }),
        });
        const data = await res.json();
        setPublishing(false);
        
        if (data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          alert(data.error || "Failed to initialize payment");
        }
      } catch (e) {
        console.error(e);
        alert("Payment initialization failed");
        setPublishing(false);
      }
      return;
    }

    const newWindow = window.open('about:blank', '_blank');
    setPublishing(true);
    const slug = await publishWebsite();
    setPublishing(false);
    if (slug) {
      if (newWindow) {
        newWindow.location.href = `/p/${slug}`;
      } else {
        // Fallback if popup was blocked completely
        alert(`Published successfully! Visit: /p/${slug}`);
      }
    } else {
      if (newWindow) newWindow.close();
      alert("Failed to publish website.");
    }
  };

  const getDeviceBtnClass = (active: boolean) => 
    active 
      ? "w-8 h-8 rounded-[7px] flex items-center justify-center text-black dark:text-[#EFEEEA] bg-black/[0.06] dark:bg-white/[0.08] transition-colors"
      : "w-8 h-8 rounded-[7px] flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer";
  
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-[7px] bg-white/80 dark:bg-[#1c1c1a]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-2xl z-50 transition-colors duration-300">

      {/* Panel Left & Edit */}
      <button 
        onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
        className={getDeviceBtnClass(isLeftPanelOpen)}
        title="Toggle Left Panel"
      >
        <PanelLeft className="w-4 h-4" />
      </button>
      <button 
        onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
        className={getDeviceBtnClass(isRightPanelOpen)}
        title="Toggle Properties Panel"
      >
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
        className="w-8 h-8 rounded-[7px] flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
        title="Toggle Theme"
      >
        {mounted && theme !== "dark" ? <Moon className="w-4 h-4 opacity-50" /> : <Sun className="w-4 h-4 opacity-50" />}
      </button>
      <button 
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        className="w-8 h-8 rounded-[7px] flex items-center justify-center text-gray-500 dark:text-[#D8D8D6]/60 hover:text-black dark:hover:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
      >
        {isPreviewMode ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="w-[1px] h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1 transition-colors duration-300" />

      {/* Sync Status & Publish */}
      <div 
        className="px-2 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-[#D8D8D6]/60 transition-colors"
        title="Cloud Sync Status"
      >
        {syncStatus === "Saving..." ? (
          <span className="flex items-center gap-1.5"><CloudUpload className="w-3.5 h-3.5 animate-pulse" /> Saving</span>
        ) : syncStatus === "Error" ? (
          <span className="flex items-center gap-1.5 text-red-500"><Cloud className="w-3.5 h-3.5" /> Error</span>
        ) : (
          <span className="flex items-center gap-1.5 text-green-500"><Cloud className="w-3.5 h-3.5" /> Synced</span>
        )}
      </div>
      
      <button 
        onClick={handlePublish}
        disabled={publishing || syncStatus === "Saving..."}
        className="ml-1 h-8 px-3 rounded-[7px] flex items-center justify-center gap-1.5 text-xs font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Globe className="w-3.5 h-3.5" />
        {publishing ? "Publishing..." : "Publish"}
      </button>

    </div>
  );
}
