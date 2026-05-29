"use client";

import React from "react";
import { User, Sparkles } from "lucide-react";

import { Message } from "@ai-sdk/react";

export function ChatMessageItem({ msg }: { msg: Message }) {
  const isAi = msg.role === "assistant" || msg.role === "ai";

  return (
    <div className={`flex w-full ${isAi ? "justify-start" : "justify-end"}`}>
      <div className={`flex items-start w-full ${isAi ? "justify-start" : "justify-end"}`}>
        
        {/* Bubble */}
        <div className={`text-sm leading-relaxed transition-colors duration-300 ${
          isAi 
            ? "text-black dark:text-[#EFEEEA] pr-4" 
            : "bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-[#EFEEEA] border border-black/[0.04] dark:border-white/[0.04] px-4 py-2 rounded-xl max-w-[85%]"
        }`}>
          {msg.content}
        </div>
        
      </div>
    </div>
  );
}
