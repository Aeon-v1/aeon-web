"use client";

import { cn } from "@/lib/utils";
import { EditableSection } from "@/components/Editable";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface LogoSectionVariant2Props {
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

function LogoCard({ logo, className }: { logo: LogoItem; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-background px-4 py-8 md:p-8", className)}>
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
        height="auto"
        src={logo.src}
        width="auto"
      />
    </div>
  );
}

export function LogoSectionVariant2({
  id = "logo-3",
  logos: _logos = defaultLogos,
}: LogoSectionVariant2Props) {
  const logos = (!_logos || _logos.length === 0) ? defaultLogos : _logos;

  return (
    <EditableSection stableId="LogoSectionVariant2-1" id={id} as="section" className="py-24 bg-background font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 border border-border md:grid-cols-4 rounded-xl overflow-hidden shadow-sm">
          {logos.map((logo, idx) => (
            <LogoCard
              key={idx}
              logo={logo}
              className={cn(
                "border-border relative",
                // Manually add borders to replicate the grid
                "border-b",
                idx % 2 === 0 ? "border-r" : "",
                "md:border-r"
              )}
            />
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
