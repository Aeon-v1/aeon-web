"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function LandingPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!user) {
      // For now, redirect to login or show alert
      alert("Please sign in first to generate a website.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, uid: user.uid }),
      });

      if (!res.ok) throw new Error("Generation failed");
      
      const data = await res.json();
      if (data.success) {
        // Redirect to the editor. The EditorProvider will load the new pages from the DB.
        router.push("/editor?prompt=" + encodeURIComponent(prompt));
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating the site.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFC] dark:bg-[#111110] text-black dark:text-[#EFEEEA] font-sans px-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-8 relative z-10"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Aeon SME Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-balance">
            The Business-in-a-Box Generator.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-[#D8D8D6]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Describe your business in plain English. We'll generate a professional, fully-editable website with tailored copy and images in seconds.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto mt-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[16px] blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative flex items-center bg-white dark:bg-[#1c1c1a] rounded-[12px] shadow-2xl border border-black/10 dark:border-white/10 p-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. I run a mobile dog grooming business in Miami..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-base md:text-lg text-black dark:text-[#EFEEEA] placeholder:text-gray-400 dark:placeholder:text-[#D8D8D6]/40"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-[8px] bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-[0.98] active:scale-[0.96] transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-6 mt-16 opacity-60 text-sm font-medium">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> SEO Optimized</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Mobile Responsive</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Custom Copywriting</span>
        </div>
      </motion.div>
    </div>
  );
}
