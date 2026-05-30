"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableSection } from "@/components/Editable";

export interface Stat {
  value: string;
  label: string;
}

export interface StatVariant1Props {
  headline?: string;
  subtext?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "400+", label: "Blocks available" },
  { value: "10x", label: "Faster delivery" },
  { value: "0", label: "Lines of code" },
  { value: "99.9%", label: "Uptime" },
];

export function StatVariant1({
  headline = "By the numbers",
  subtext = "Scale your landing pages infinitely without scaling your engineering team.",
  stats = defaultStats,
}: StatVariant1Props) {
  return (
    <EditableSection stableId="StatVariant1-1" className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground font-sans border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="flex flex-col space-y-4 max-w-lg"
          >
            <Editable stableId="StatVariant1-2"
              as="h2"
              defaultText={headline}
              propName="headline"
              className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground"
            />
            <Editable stableId="StatVariant1-3"
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="text-muted-foreground text-lg font-light leading-relaxed"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10 md:gap-x-16 lg:gap-y-12 shrink-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.1 }}
                className="flex flex-col gap-2 border-l border-border pl-6"
              >
                <Editable stableId="StatVariant1-4"
                  as="span"
                  defaultText={stat.value}
                  propName={`stats[${i}].value`}
                  className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground"
                />
                <Editable stableId="StatVariant1-5"
                  as="span"
                  defaultText={stat.label}
                  propName={`stats[${i}].label`}
                  className="text-muted-foreground text-sm font-light tracking-wide"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
