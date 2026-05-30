"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface NavbarVariant2Props {
  id?: string;
  logoText?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  ctaText?: string;
}

export function NavbarVariant2({
  id = "navbar-2",
  logoText = "Aeon",
  link1 = "Platform",
  link2 = "Solutions",
  link3 = "Resources",
  ctaText = "Sign Up",
}: NavbarVariant2Props) {
  return (
    <EditableSection stableId="NavbarVariant2-1" id={id} as="nav" className="w-full flex justify-center sticky top-4 z-50 font-sans px-4">
      <div className="w-full max-w-5xl bg-background/70 backdrop-blur-xl border border-border rounded-full h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center" />
          <Editable stableId="NavbarVariant2-2"
            id={`${id}-logo`}
            as="span"
            defaultText={logoText}
            propName="logoText"
            className="text-foreground font-bold tracking-tight text-base"
            inline
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 bg-muted px-6 py-1.5 rounded-full">
          <Editable stableId="NavbarVariant2-3" id={`${id}-link1`} as="a" defaultText={link1} propName="link1" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
          <Editable stableId="NavbarVariant2-4" id={`${id}-link2`} as="a" defaultText={link2} propName="link2" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
          <Editable stableId="NavbarVariant2-5" id={`${id}-link3`} as="a" defaultText={link3} propName="link3" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" inline />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <EditableButton stableId="NavbarVariant2-6"
            id={`${id}-cta`}
            as={motion.button}
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 md:py-2 text-sm md:text-xs font-semibold tracking-tight text-primary-foreground transition-all cursor-pointer"
          >
            <Editable stableId="NavbarVariant2-7" id={`${id}-cta-text`} as="span" defaultText={ctaText} propName="ctaText" inline />
          </EditableButton>
        </div>
      </div>
    </EditableSection>
  );
}
