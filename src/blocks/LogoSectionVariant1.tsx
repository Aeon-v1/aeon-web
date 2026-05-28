"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable } from "@/components/Editable";

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
    <section className="w-full py-16 bg-[#111110] font-sans border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-mono uppercase tracking-widest text-[#D8D8D6]/50 mb-10"
        >
          <Editable as="span" defaultText={headline} propName="headline" inline />
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.06 }}
              className="text-[#D8D8D6]/30 hover:text-[#D8D8D6]/70 transition-colors duration-300 text-lg font-medium tracking-tight select-none"
            >
              <Editable as="span" defaultText={logo.name} propName={`logos[${i}].name`} inline />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
