"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Editable, EditableButton } from "@/components/Editable";

export interface CTAVariant1Props {
  headline?: string;
  subtext?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

export function CTAVariant1({
  headline = "Start building today.",
  subtext = "Join thousands of teams shipping faster with Aeon Web.",
  primaryCtaText = "Get Started Free",
  secondaryCtaText = "View Docs",
  primaryCtaHref = "#",
  secondaryCtaHref = "#",
}: CTAVariant1Props) {
  return (
    <section className="w-full py-24 md:py-32 bg-[#111110] font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161615] px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center gap-8"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 h-[50%] w-[60%] rounded-full bg-white/[0.02] blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <Editable
              as="h2"
              defaultText={headline}
              propName="headline"
              className="text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl text-[#EFEEEA]"
            />
            <Editable
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="text-lg text-[#D8D8D6] font-light leading-relaxed"
            />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <EditableButton
              as={motion.a}
              href={primaryCtaHref}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 rounded-full bg-[#EFEEEA] px-8 py-3.5 text-sm font-medium tracking-tight text-[#111110] transition-colors hover:bg-white shadow-sm cursor-pointer"
            >
              <Editable as="span" defaultText={primaryCtaText} propName="primaryCtaText" inline />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </EditableButton>
            <EditableButton
              as={motion.a}
              href={secondaryCtaHref}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-3.5 text-sm font-medium tracking-tight text-[#EFEEEA] transition-colors hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer"
            >
              <Editable as="span" defaultText={secondaryCtaText} propName="secondaryCtaText" inline />
            </EditableButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
