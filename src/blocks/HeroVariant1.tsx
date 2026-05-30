"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableButton, EditableSection, EditableImage } from "@/components/Editable";

export interface HeroVariant1Props {
  headline?: string;
  subtext?: string;
  ctaText?: string;
}

export function HeroVariant1({
  headline = "Next Generation Platform",
  subtext = "Build faster, scale better, and design flawlessly with our new decoupled architecture.",
  ctaText = "Get Started",
}: HeroVariant1Props) {
  return (
    <EditableSection stableId="HeroVariant1-1" className="relative flex min-h-[70vh] flex-col items-center pt-24 pb-16 overflow-hidden bg-background font-sans text-foreground w-full">
      {/* Background Orbs (Subtle) */}
      <div className="absolute top-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-foreground/[0.02] blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50%] w-[50%] rounded-full bg-foreground/[0.01] blur-[120px]" />
      
      <div className="relative z-10 flex w-full max-w-7xl mx-auto px-4 md:px-6 flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="space-y-6 max-w-3xl"
        >
          <Editable stableId="HeroVariant1-2"
            as="h1"
            defaultText={headline}
            propName="headline"
            className="text-5xl font-medium tracking-tighter sm:text-6xl md:text-7xl text-foreground"
          />
          <Editable stableId="HeroVariant1-3"
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light"
          />
          
          <div className="pt-8">
            <EditableButton stableId="HeroVariant1-4" 
              as={motion.button}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-tight text-primary-foreground transition-colors hover:bg-primary/90 border border-transparent cursor-pointer"
            >
              <Editable stableId="HeroVariant1-5" as="span" defaultText={ctaText} propName="ctaText" inline />
            </EditableButton>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.2 }}
          className="mt-16 w-full max-w-5xl mx-auto rounded-xl border border-border/50 bg-background/50 p-2 backdrop-blur-sm"
        >
          <EditableImage stableId="HeroVariant1-6" 
            className="w-full h-auto aspect-video rounded-lg object-cover bg-muted"
            fallbackQuery="dashboard UI software startup dark mode"
            alt="Hero Dashboard"
          />
        </motion.div>
      </div>
    </EditableSection>
  );
}
