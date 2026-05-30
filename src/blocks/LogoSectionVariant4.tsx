"use client";

import { EditableSection } from "@/components/Editable";
import { motion } from "framer-motion";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface LogoSectionVariant4Props {
  id?: string;
  logos?: LogoItem[];
}

const defaultLogos: LogoItem[] = [
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia Logo" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase Logo" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI Logo" },
  { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso Logo" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel Logo" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub Logo" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI Logo" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk Logo" },
];

export function LogoSectionVariant4({
  id = "logo-5",
  logos: _logos = defaultLogos,
}: LogoSectionVariant4Props) {
  const logos = (!_logos || _logos.length === 0) ? defaultLogos : _logos;
  
  // Duplicate logos for smooth infinite scroll
  const doubledLogos = [...logos, ...logos];

  return (
    <EditableSection stableId="LogoSectionVariant4-1" id={id} as="section" className="py-24 bg-background font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-0 sm:px-6">
        <div className="relative border-y border-border bg-gradient-to-r from-muted/30 via-transparent to-muted/30 py-8 w-full overflow-hidden mask-gradient-x">
          <motion.div 
            className="flex w-max items-center gap-10 md:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {doubledLogos.map((logo, idx) => (
              <img
                key={idx}
                alt={logo.alt}
                className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert shrink-0"
                height="auto"
                loading="lazy"
                src={logo.src}
                width="auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </EditableSection>
  );
}
