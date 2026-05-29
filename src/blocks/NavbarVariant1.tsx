"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface NavbarVariant1Props {
  id?: string;
  logoText?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  ctaText?: string;
}

export function NavbarVariant1({
  id = "navbar-1",
  logoText = "Aeon Web",
  link1 = "Features",
  link2 = "Pricing",
  link3 = "Docs",
  ctaText = "Get Started",
}: NavbarVariant1Props) {
  return (
    <EditableSection id={id} as="nav" className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary" />
          <Editable
            id={`${id}-logo`}
            as="span"
            defaultText={logoText}
            propName="logoText"
            className="text-foreground font-semibold tracking-tight text-lg"
            inline
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Editable id={`${id}-link1`} as="a" defaultText={link1} propName="link1" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
          <Editable id={`${id}-link2`} as="a" defaultText={link2} propName="link2" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
          <Editable id={`${id}-link3`} as="a" defaultText={link3} propName="link3" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <EditableButton
            id={`${id}-cta`}
            as={motion.button}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-secondary hover:bg-secondary/80 border border-border px-4 py-2.5 md:py-2 text-sm md:text-xs font-medium tracking-tight text-secondary-foreground transition-colors cursor-pointer"
          >
            <Editable id={`${id}-cta-text`} as="span" defaultText={ctaText} propName="ctaText" inline />
          </EditableButton>
        </div>
      </div>
    </EditableSection>
  );
}
