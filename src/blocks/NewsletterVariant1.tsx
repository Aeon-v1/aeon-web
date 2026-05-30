"use client";

import React, { useState } from "react";
import { Editable, EditableSection } from "@/components/Editable";

export interface NewsletterVariant1Props {
  id?: string;
  headline?: string;
  subtext?: string;
  buttonText?: string;
}

export function NewsletterVariant1({
  id = "newsletter-1",
  headline = "Subscribe to our newsletter",
  subtext = "Get the latest updates and news delivered to your inbox.",
  buttonText = "Subscribe",
}: NewsletterVariant1Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    try {
      // We will get the slug from the window location if we are on a published site
      const slugMatch = window.location.pathname.match(/^\/p\/([^\/]+)/);
      const slug = slugMatch ? slugMatch[1] : "preview";

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <EditableSection stableId="NewsletterVariant1-1" id={id} as="section" className="w-full py-16 md:py-24 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <Editable stableId="NewsletterVariant1-2"
          id={`${id}-headline`}
          as="h2"
          defaultText={headline}
          propName="headline"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        />
        <Editable stableId="NewsletterVariant1-3"
          id={`${id}-subtext`}
          as="p"
          defaultText={subtext}
          propName="subtext"
          className="text-lg text-muted-foreground mb-8"
        />
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto relative">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="flex-1 h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
            disabled={status === "loading" || status === "success"}
          />
          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : buttonText}
          </button>
          
          {status === "error" && (
            <p className="absolute -bottom-8 left-0 right-0 text-sm text-red-500">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </EditableSection>
  );
}
