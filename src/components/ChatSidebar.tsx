"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PromptBox } from "./ui/PromptBox";
import { ChatMessageItem } from "./ChatMessageItem";
import { useEditor } from "./EditorProvider";
import AIThinkingBlock from "./ui/ai-thinking-block";
import { useAuth } from "./AuthProvider";
import { useSearchParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";

// Keywords that indicate the user wants to generate a page
const GENERATE_KEYWORDS = [
  "build", "create", "make", "generate", "design", "compose",
  "give me a", "build me", "create a", "make a", "make me",
  "landing page", "homepage", "website", "web page", "page for",
];

function isGenerateRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return GENERATE_KEYWORDS.some(kw => lower.includes(kw));
}

// Derive a short page name from the user's prompt
function derivePageName(prompt: string): string {
  const lower = prompt.toLowerCase();
  const forMatch = lower.match(/for\s+(?:a\s+|an\s+|the\s+)?([a-z0-9\s]{2,20}?)(?:\s*[-–,.]|$)/i);
  if (forMatch && forMatch[1]) return forMatch[1].trim().replace(/\b\w/g, c => c.toUpperCase());
  return "Home";
}

function generateReport(blocks: any[]): string {
  const blockTypes = blocks.map(b => b.type);
  const sections = [];
  if (blockTypes.some(t => t.includes('Hero'))) sections.push('a high-converting Hero section');
  if (blockTypes.some(t => t.includes('Feature'))) sections.push('a Features grid');
  if (blockTypes.some(t => t.includes('Pricing'))) sections.push('a Pricing table');
  if (blockTypes.some(t => t.includes('Testimonial'))) sections.push('social proof Testimonials');
  if (blockTypes.some(t => t.includes('FAQ'))) sections.push('an FAQ section');
  
  const sectionsText = sections.length > 0 ? ` featuring ${sections.join(', ')}` : '';
  
  return `✅ **Site Generated Successfully!**\n\nI've tailored a custom layout based on your request${sectionsText}, comprising ${blocks.length} structural blocks total. \n\nThe design is now active in your canvas. You can click any text to edit it, or ask me to tweak the colors and styling right here!`;
}

export function ChatSidebar() {
  const { addGeneratedPage, pages, globalTheme, elementOverrides, setGlobalTheme, updateOverride } = useEditor();
  const { user } = useAuth();
  const userName = "Builder";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const initPrompt = searchParams.get("prompt");

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const { messages, setMessages, append, isLoading } = useChat({
    api: "/api/chat",
    body: {
      state: { pages, globalTheme, elementOverrides }
    },
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'updateGlobalTheme') {
         setGlobalTheme(prev => ({ ...prev, ...(toolCall.args as any) }));
      }
      if (toolCall.toolName === 'updateElementOverride') {
         const { id, ...updates } = toolCall.args as any;
         updateOverride(id, updates);
      }
      return "Action successful.";
    }
  });

  useEffect(() => {
    if (initPrompt && messages.length === 0) {
      setMessages([
        { id: "init-1", role: "user", content: initPrompt },
        { id: "init-2", role: "assistant", content: "✅ **Site Generated Successfully!**\n\nI've generated a custom, fully-styled website based on your request. The layout is active in the canvas. You can click any text to edit it directly, or ask me to change the colors, add new sections, or tweak the copy!" }
      ]);
    }
  }, [initPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isGenerating]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isGenerating) return;

    // ── Branch: Page Generation ──────────────────────────────────────────────
    if (isGenerateRequest(text)) {
      setIsGenerating(true);
      setCurrentPrompt(text);
      
      const userMsgId = Date.now().toString();
      const assistantMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: userMsgId, role: "user", content: text }]);

      try {
        const token = await user?.getIdToken().catch(() => null);
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          },
          body: JSON.stringify({ prompt: text }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setMessages(prev => [...prev, { 
            id: assistantMsgId, 
            role: "assistant", 
            content: `⚠️ ${data.error || "Failed to generate page."}` 
          }]);
          return;
        }

        const pageName = derivePageName(text);
        addGeneratedPage(pageName, data.blocks);

        setMessages(prev => [...prev, { 
          id: assistantMsgId, 
          role: "assistant", 
          content: generateReport(data.blocks)
        }]);
      } catch (err) {
        setMessages(prev => [...prev, { 
          id: assistantMsgId, 
          role: "assistant", 
          content: "⚠️ Failed to connect to the generation API. Check your API key." 
        }]);
      } finally {
        setIsGenerating(false);
      }
      return;
    }

    // ── Branch: Conversational Chat / Agentic Editing ────────────────────────
    append({ role: "user", content: text });
  }, [isLoading, isGenerating, user, addGeneratedPage, append, setMessages]);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFC] dark:bg-[#1F1F1E] w-full lg:w-[25%] relative shrink-0 z-40 pointer-events-auto transition-colors duration-300">
      {user?.isAnonymous && (
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => {
              const callbackUrl = encodeURIComponent("http://localhost:3001/auth/callback");
              window.location.href = `/login?redirect=${callbackUrl}`;
            }}
            className="px-3 py-1.5 text-[13px] font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
          >
            Sign In to Save
          </button>
        </div>
      )}
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          /* INITIAL STATE: Center aligned prompt */
          <div key="empty-chat-layout" className="flex-1 flex flex-col justify-center items-center h-full relative">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="relative z-10 w-full max-w-xl mx-auto px-4 pb-16 flex flex-col justify-center items-center gap-6"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center select-none"
              >
                <h2 className="text-[19px] font-medium tracking-tight text-black dark:text-white transition-colors duration-300">
                  Hey {userName || "there"}, how is it going?
                </h2>
              </motion.div>

              <motion.div
                layoutId="prompt-box-container"
                className="w-full"
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              >
                <PromptBox
                  onSendMessage={handleSendMessage}
                  placeholder="Ask Aeon Builder to add a hero section, modify colors, or add a pricing table..."
                  className="transition-all duration-300 shadow-none focus-within:ring-1 focus-within:ring-white/5 border border-white/[0.05]"
                />
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* ACTIVE STATE: Shifted dynamically to scrollable layout */
          <motion.div
            key="active-chat-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col h-full overflow-hidden relative"
          >
            {/* Scrollable messages thread */}
            <main className="flex-1 w-full max-w-xl mx-auto px-4 pb-6 pt-8 flex flex-col space-y-6 md:space-y-8 overflow-y-auto scrollbar-none custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} msg={msg as any} />
              ))}

              {/* Page Generation Thinking Block */}
              {isGenerating && (
                 <div className="flex w-full animate-in fade-in duration-300 pb-8">
                    <AIThinkingBlock prompt={currentPrompt} />
                 </div>
              )}

              {/* Thinking indicator */}
              {isLoading && !isGenerating && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex items-start gap-2.5 w-full pr-6 pl-1 animate-in fade-in duration-300">
                    <div className="h-5 w-5 rounded-md flex items-center justify-center border shrink-0 bg-black/5 dark:bg-[#2C2C2A] border-black/[0.04] dark:border-white/[0.03]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500 dark:bg-neutral-500"></span>
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-2xl text-[13px] md:text-[15px] font-sans flex items-center gap-1.5 shadow-sm bg-white dark:bg-[#181817] border border-black/[0.04] dark:border-white/[0.03] text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                      <span>Applying changes...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-4" />
            </main>

            {/* Sticky Bottom Input Area */}
            <div className="w-full px-4 pb-6 pt-4 bg-gradient-to-t from-[#FDFDFC] via-[#FDFDFC]/95 dark:from-[#1F1F1E] dark:via-[#1F1F1E]/95 to-transparent sticky bottom-0">
              <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <PromptBox
                  onSendMessage={handleSendMessage}
                  placeholder="Continue tweaking the design..."
                  className="transition-all duration-300 shadow-xl focus-within:ring-1 focus-within:ring-white/5 border border-white/[0.05] w-full"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
