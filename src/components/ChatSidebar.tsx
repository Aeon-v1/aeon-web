"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PromptBox } from "./ui/PromptBox";
import { ChatMessageItem } from "./ChatMessageItem";
import { useEditor } from "./EditorProvider";
import AIThinkingBlock from "./ui/ai-thinking-block";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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
  // Try to extract "for X" pattern
  const forMatch = lower.match(/for\s+([a-z0-9\s]{2,30}?)(?:\s*[-–,.]|$)/i);
  if (forMatch) return forMatch[1].trim().replace(/\b\w/g, c => c.toUpperCase());
  // Fallback: first 4 words
  return prompt.split(/\s+/).slice(0, 4).join(" ");
}

const INITIAL_MESSAGES: Message[] = [
  { id: "1", role: "user", content: "Build a sleek landing page for a headless rendering engine called Aeon Web." },
  { id: "2", role: "assistant", content: "I've generated a complete landing page for Aeon Web. It includes a Hero section, Logo cloud, Features grid, How it Works steps, Pricing, and Testimonials." },
];

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { addGeneratedPage } = useEditor();
  const userName = "Builder";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // ── Branch: Page Generation ──────────────────────────────────────────────
    if (isGenerateRequest(text)) {
      setIsGenerating(true);
      setCurrentPrompt(text);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

        const blockCount = data.blocks.length;
        setMessages(prev => [...prev, { 
          id: assistantMsgId, 
          role: "assistant", 
          content: `✅ Done! I've built **${pageName}** with ${blockCount} blocks. It's now open as a new page tab in the canvas.` 
        }]);
      } catch (err) {
        setMessages(prev => [...prev, { 
          id: assistantMsgId, 
          role: "assistant", 
          content: "⚠️ Failed to connect to the generation API. Check your API key." 
        }]);
      } finally {
        setIsLoading(false);
        setIsGenerating(false);
      }
      return;
    }

    // ── Branch: Conversational Chat ──────────────────────────────────────────
    const chatHistory = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

    // Create a placeholder assistant message to stream into
    setMessages(prev => [...prev, { id: assistantMsgId, role: "assistant", content: "" }]);

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        const err = await response.json().catch(() => ({ error: "Unknown error" }));
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: `⚠️ ${err.error || "Failed to get a response."}` } : m));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(m =>
          m.id === assistantMsgId ? { ...m, content: m.content + chunk } : m
        ));

      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setMessages(prev => prev.map(m =>
          m.id === assistantMsgId ? { ...m, content: "⚠️ Failed to connect to AI. Please check your API key." } : m
        ));
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFC] dark:bg-[#1F1F1E] w-full lg:w-[25%] relative shrink-0 z-40 pointer-events-auto transition-colors duration-300">
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
                <h2 className="text-lg font-medium tracking-tight text-black dark:text-white transition-colors duration-300">
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
                <ChatMessageItem key={msg.id} msg={msg} />
              ))}

              {/* Page Generation Thinking Block */}
              {isLoading && isGenerating && (
                 <div className="flex w-full animate-in fade-in duration-300 pb-8">
                    <AIThinkingBlock prompt={currentPrompt} />
                 </div>
              )}

              {/* Thinking indicator — shows only while loading before first chunk arrives */}
              {isLoading && !isGenerating && messages[messages.length - 1]?.content === "" && (
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex items-start gap-2.5 w-full pr-6 pl-1 animate-in fade-in duration-300">
                    <div className="h-5 w-5 rounded-md flex items-center justify-center border shrink-0 bg-black/5 dark:bg-[#2C2C2A] border-black/[0.04] dark:border-white/[0.03]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500 dark:bg-neutral-500"></span>
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-2xl text-xs md:text-sm font-sans flex items-center gap-1.5 shadow-sm bg-white dark:bg-[#181817] border border-black/[0.04] dark:border-white/[0.03] text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                      <span>Generating response</span>
                      <span className="flex items-center gap-0.5 ml-0.5 mt-1">
                        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                      </span>
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
