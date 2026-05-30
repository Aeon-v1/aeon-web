"use client";

import { EditableSection } from "@/components/Editable";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface LogoSectionVariant5Props {
  id?: string;
  logos?: LogoItem[];
}

const defaultLogos: LogoItem[] = [
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel Logo" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase Logo" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI Logo" },
  { src: "https://storage.efferd.com/logo/dub-wordmark.svg", alt: "Dub Logo" },
  { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso Logo" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub Logo" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI Logo" },
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia Logo" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk Logo" },
  { src: "https://storage.efferd.com/logo/bolt-wordmark.svg", alt: "Bolt Logo" },
  { src: "https://storage.efferd.com/logo/stripe-wordmark.svg", alt: "Stripe Logo" },
];

export function LogoSectionVariant5({
  id = "logo-6",
  logos: _logos = defaultLogos,
}: LogoSectionVariant5Props) {
  const logos = (!_logos || _logos.length === 0) ? defaultLogos : _logos;

  return (
    <EditableSection stableId="LogoSectionVariant5-1" id={id} as="section" className="py-24 bg-background font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-8 py-6 sm:gap-x-12 sm:gap-y-12">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              alt={logo.alt}
              className="pointer-events-none h-5 w-fit select-none dark:brightness-0 dark:invert opacity-60 hover:opacity-100 transition-opacity"
              height="auto"
              loading="lazy"
              src={logo.src}
              width="auto"
            />
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
