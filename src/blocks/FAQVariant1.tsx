"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQVariant1Props {
  headline?: string;
  subtext?: string;
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  { question: "What is this?", answer: "A high-performance headless rendering engine driven by JSON blueprints." },
  { question: "Is it free?", answer: "We offer a generous free tier. Paid plans unlock premium blocks and higher usage limits." },
  { question: "Can I use my own components?", answer: "Yes. Simply register any React component in the BlockRenderer registry and it becomes instantly available." },
];

export function FAQVariant1({
  headline = "Frequently Asked Questions",
  subtext = "Everything you need to know.",
  faqs = defaultFaqs,
}: FAQVariant1Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <EditableSection stableId="FAQVariant1-1" className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <Editable stableId="FAQVariant1-2"
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground"
          />
          <Editable stableId="FAQVariant1-3"
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground max-w-2xl text-lg font-light"
          />
        </motion.div>

        <div className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.06 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left gap-6 group cursor-pointer"
              >
                <div onClick={(e) => {
                    // if clicking the editable text, don't toggle accordion
                    if ((e.target as HTMLElement).closest('[data-editable]')) {
                        e.stopPropagation();
                    }
                }} className="w-full">
                  <Editable stableId="FAQVariant1-4"
                    as="span"
                    defaultText={faq.question}
                    propName={`faqs[${i}].question`}
                    className="text-foreground font-medium text-base group-hover:opacity-80 transition-opacity"
                    inline
                  />
                </div>
                <span className="shrink-0 text-muted-foreground">
                  {openIndex === i ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <Editable stableId="FAQVariant1-5"
                      as="p"
                      defaultText={faq.answer}
                      propName={`faqs[${i}].answer`}
                      className="pb-5 text-muted-foreground font-light leading-relaxed text-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
