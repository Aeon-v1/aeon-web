"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableSection } from "@/components/Editable";

export interface Logo {
  name: string;
}

export interface LogoSectionVariant1Props {
  headline?: string;
  logos?: Logo[];
}

const defaultLogos: Logo[] = [
  { name: "Vercel" },
  { name: "Linear" },
  { name: "Notion" },
  { name: "Stripe" },
  { name: "Figma" },
  { name: "Loom" },
];

export function LogoSectionVariant1({
  headline = "Trusted by teams at",
  logos = defaultLogos,
}: LogoSectionVariant1Props) {
  return (
    <EditableSection stableId="LogoSectionVariant1-1" className="w-full py-16 bg-background font-sans border-y border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-10"
        >
          <Editable stableId="LogoSectionVariant1-2" as="span" defaultText={headline} propName="headline" inline />
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.06 }}
              className="text-muted-foreground/50 hover:text-foreground transition-colors duration-300 text-lg font-medium tracking-tight select-none"
            >
              <Editable stableId="LogoSectionVariant1-3" as="span" defaultText={logo.name} propName={`logos[${i}].name`} inline />
            </motion.div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
