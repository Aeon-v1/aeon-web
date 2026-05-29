"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableSection } from "@/components/Editable";

export interface Step {
  title: string;
  description: string;
}

export interface HowItWorksVariant1Props {
  headline?: string;
  subtext?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    title: "Generate Blueprint",
    description: "The Aeon AI generates a structured JSON payload describing the complete page layout, copy, and components.",
  },
  {
    title: "Process Payload",
    description: "The headless renderer receives the payload and maps each JSON block to a pre-built React component in the registry.",
  },
  {
    title: "Deploy Automatically",
    description: "The final page is statically rendered and deployed to the edge, resulting in blazing fast load times and perfect SEO.",
  },
];

export function HowItWorksVariant1({
  headline = "How it works",
  subtext = "From prompt to production in three simple steps.",
  steps = defaultSteps,
}: HowItWorksVariant1Props) {
  return (
    <EditableSection className="w-full py-24 md:py-32 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center text-center space-y-4 mb-20"
        >
          <Editable
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground"
          />
          <Editable
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground max-w-2xl text-lg font-light leading-relaxed"
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-8 left-8 right-8 h-[1px] bg-border hidden md:block" />

          <div className="grid gap-12 md:grid-cols-3 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <div className="h-16 w-16 rounded-full bg-card border border-border flex items-center justify-center text-xl font-mono text-foreground">
                  0{i + 1}
                </div>
                <div>
                  <Editable
                    as="h3"
                    defaultText={step.title}
                    propName={`steps[${i}].title`}
                    className="text-xl font-medium text-foreground mb-3"
                  />
                  <Editable
                    as="p"
                    defaultText={step.description}
                    propName={`steps[${i}].description`}
                    className="text-muted-foreground font-light text-sm leading-relaxed"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
