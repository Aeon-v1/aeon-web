"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";

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
    <EditableSection className="w-full py-24 md:py-32 bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 md:px-16 md:py-20 flex flex-col items-center text-center gap-8"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 h-[50%] w-[60%] rounded-full bg-foreground/[0.02] blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <Editable
              as="h2"
              defaultText={headline}
              propName="headline"
              className="text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl text-foreground"
            />
            <Editable
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="text-lg text-muted-foreground font-light leading-relaxed"
            />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <EditableButton
              as={motion.a}
              href={primaryCtaHref}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="group flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-tight text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
            >
              <Editable as="span" defaultText={primaryCtaText} propName="primaryCtaText" inline />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </EditableButton>
            <EditableButton
              as={motion.a}
              href={secondaryCtaHref}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-border bg-secondary px-8 py-3.5 text-sm font-medium tracking-tight text-secondary-foreground transition-colors hover:bg-secondary/80 cursor-pointer"
            >
              <Editable as="span" defaultText={secondaryCtaText} propName="secondaryCtaText" inline />
            </EditableButton>
          </div>
        </motion.div>
      </div>
    </EditableSection>
  );
}
