"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable, EditableSection } from "@/components/Editable";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TestimonialVariant1Props {
  headline?: string;
  subtext?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Aeon Web cut our landing page build time from weeks to hours. The JSON-driven approach is a game changer.",
    name: "Sofia Andersen",
    role: "Head of Product",
    company: "Luma Labs",
  },
  {
    quote: "The Aeon design system is the most coherent and beautiful renderer we've ever integrated. Truly premium.",
    name: "Marcus Thorn",
    role: "Lead Engineer",
    company: "Fieldstone AI",
  },
  {
    quote: "We ship entire marketing pages without touching code. Our designers love the control, our devs love the speed.",
    name: "Priya Nair",
    role: "CTO",
    company: "Orbit Studio",
  },
];

function Initials({ name }: { name?: string }) {
  const safeName = typeof name === 'string' && name.trim() !== '' ? name : "User";
  const parts = safeName.trim().split(" ");
  return (
    <span className="text-sm font-medium text-foreground">
      {parts[0]?.[0] ?? ""}{parts[1]?.[0] ?? ""}
    </span>
  );
}

export function TestimonialVariant1({
  headline = "Trusted by builders worldwide",
  subtext = "Don't take our word for it.",
  testimonials: _testimonials = defaultTestimonials,
}: TestimonialVariant1Props) {
  const testimonials = (!_testimonials || _testimonials.length === 0) ? defaultTestimonials : _testimonials;
  return (
    <EditableSection stableId="TestimonialVariant1-1" className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <Editable stableId="TestimonialVariant1-2"
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-4xl font-medium tracking-tighter sm:text-5xl text-foreground"
          />
          <Editable stableId="TestimonialVariant1-3"
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground max-w-2xl text-lg font-light"
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.08 }}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-7 hover:border-border/80 transition-colors duration-300"
            >
              {/* Quote */}
              <Editable stableId="TestimonialVariant1-4"
                as="p"
                defaultText={t.quote || "Awesome experience!"}
                propName={`testimonials[${i}].quote`}
                className="text-muted-foreground text-sm leading-relaxed font-light before:content-['\201C'] after:content-['\201D']"
              />

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                  <Initials name={t.name} />
                </div>
                <div>
                  <Editable stableId="TestimonialVariant1-5"
                    as="p"
                    defaultText={t.name || "Customer"}
                    propName={`testimonials[${i}].name`}
                    className="text-sm font-medium text-foreground tracking-tight"
                  />
                  <div className="text-xs text-muted-foreground font-light font-mono mt-1">
                    <Editable stableId="TestimonialVariant1-6" as="span" defaultText={t.role || "User"} propName={`testimonials[${i}].role`} inline />
                    <span className="mx-1">·</span>
                    <Editable stableId="TestimonialVariant1-7" as="span" defaultText={t.company || "Company"} propName={`testimonials[${i}].company`} inline />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
