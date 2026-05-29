"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap, Code, Layout, Blocks } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface Feature {
  title: string;
  description: string;
  iconName?: string;
}

export interface FeatureVariant1Props {
  headline?: string;
  subtext?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: "JSON Driven",
    description: "Every layout, style, and component is driven completely by a structured JSON payload.",
    iconName: "Code",
  },
  {
    title: "Headless Architecture",
    description: "Decoupled frontend that scales infinitely and deploys to the edge in seconds.",
    iconName: "Layout",
  },
  {
    title: "Premium Blocks",
    description: "Access a library of meticulously designed, high-converting UI blocks out of the box.",
    iconName: "Blocks",
  },
  {
    title: "Blazing Fast",
    description: "Next.js App Router, React Server Components, and optimized assets ensure maximum performance.",
    iconName: "Zap",
  },
];

// Simple icon mapper
function getIcon(name?: string) {
  switch (name) {
    case "Zap": return <Zap className="w-5 h-5" />;
    case "Code": return <Code className="w-5 h-5" />;
    case "Layout": return <Layout className="w-5 h-5" />;
    case "Blocks": return <Blocks className="w-5 h-5" />;
    default: return <Blocks className="w-5 h-5" />;
  }
}

export function FeatureVariant1({
  headline = "Built for performance and scale.",
  subtext = "Everything you need to ship world-class landing pages without the overhead.",
  features = defaultFeatures,
}: FeatureVariant1Props) {
  return (
    <EditableSection className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <Editable
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground max-w-3xl"
          />
          <Editable
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground max-w-2xl text-lg font-light leading-relaxed"
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.08 }}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border hover:border-border/80 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground">
                {getIcon(feature.iconName)}
              </div>
              <div>
                <Editable
                  as="h3"
                  defaultText={feature.title}
                  propName={`features[${i}].title`}
                  className="text-lg font-medium text-foreground mb-2"
                />
                <Editable
                  as="p"
                  defaultText={feature.description}
                  propName={`features[${i}].description`}
                  className="text-muted-foreground font-light text-sm leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
