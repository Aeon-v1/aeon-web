"use client";

import { BlockRenderer } from "@/components/BlockRenderer";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { IframePreview } from "@/components/IframePreview";
import { IconTray } from "@/components/IconTray";
import { ChatSidebar } from "@/components/ChatSidebar";
import { useEditor } from "@/components/EditorProvider";

export default function Home() {
  const { isPreviewMode, pages, activePageId, viewportSize } = useEditor();
  const activePage = pages.find(p => p.id === activePageId);
  const activeBlocks = activePage?.blocks || [];

  const getViewportWidthClass = () => {
    switch (viewportSize) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      case "desktop": 
      default: return "w-full";
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FDFDFC] dark:bg-[#1F1F1E] text-black dark:text-[#EFEEEA] font-sans antialiased selection:bg-black/10 dark:selection:bg-white/10 selection:text-black dark:selection:text-white overflow-hidden transition-colors duration-300">
      {/* Chat Sidebar */}
      {!isPreviewMode && <ChatSidebar />}
      
      {/* Canvas Area Container */}
      <div className={`flex-1 relative bg-transparent ${isPreviewMode ? 'p-0' : 'p-[10px]'} flex flex-col min-w-0 transition-all duration-300 items-center justify-start`}>
        <div className={`flex-1 overflow-hidden relative w-full transition-all duration-300 ease-in-out ${getViewportWidthClass()} ${isPreviewMode ? '' : 'rounded-lg border border-black/[0.04] dark:border-white/[0.04] bg-background shadow-sm'}`}>
          <IframePreview>
            <BlockRenderer blocks={activeBlocks} />
          </IframePreview>
        </div>
        <IconTray />
      </div>
      
      {/* Properties Inspector */}
      {!isPreviewMode && <PropertiesPanel />}
    </div>
  );
}
