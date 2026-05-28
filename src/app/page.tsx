import { BlockRenderer } from "@/components/BlockRenderer";
import { MOCK_PAGE_DATA } from "@/data/mockPageData";


import { PropertiesPanel } from "@/components/PropertiesPanel";
import { IconTray } from "@/components/IconTray";
import { ChatSidebar } from "@/components/ChatSidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-[#FDFDFC] dark:bg-[#1F1F1E] text-black dark:text-[#EFEEEA] font-sans antialiased selection:bg-black/10 dark:selection:bg-white/10 selection:text-black dark:selection:text-white overflow-hidden transition-colors duration-300">
      {/* Chat Sidebar */}
      <ChatSidebar />
      
      {/* Canvas Area Container */}
      <div className="flex-1 relative bg-transparent p-[10px] flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg border border-black/[0.04] dark:border-white/[0.04]">
          <BlockRenderer blocks={MOCK_PAGE_DATA} />
        </div>
        <IconTray />
      </div>
      
      {/* Properties Inspector */}
      <PropertiesPanel />
    </div>
  );
}
