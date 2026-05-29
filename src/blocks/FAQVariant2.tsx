"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import * as React from "react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQVariant2Props {
  id?: string;
  headline?: string;
  subtext?: string;
  faqs?: FAQItem[];
  contactText?: string;
  contactLinkText?: string;
}

const defaultFaqs: FAQItem[] = [
  { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options." },
  { question: "Can I change or cancel my order?", answer: "You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes." },
];

export function FAQVariant2({
  id = "faq-2",
  headline = "Frequently Asked Questions",
  subtext = "Discover quick and comprehensive answers to common questions about our platform, services, and features.",
  faqs = defaultFaqs,
  contactText = "Can't find what you're looking for? Contact our",
  contactLinkText = "customer support team",
}: FAQVariant2Props) {
  return (
    <EditableSection id={id} className="bg-background py-16 md:py-24 font-sans">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div>
          <Editable
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-foreground text-4xl font-bold tracking-tight"
          />
          <Editable
            id={`${id}-subtext`}
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground mt-4 text-balance text-lg"
          />
        </div>

        <div className="mt-12">
          <Accordion
            type="single"
            collapsible
            className="bg-card rounded-xl w-full border border-border px-8 py-3"
          >
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-dotted border-border"
              >
                <div onClick={(e) => {
                    // if clicking the editable text, don't toggle accordion
                    if ((e.target as HTMLElement).closest('[data-editable]')) {
                        e.stopPropagation();
                    }
                }} className="w-full">
                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-foreground">
                        <Editable
                            id={`${id}-faq-${i}-q`}
                            as="span"
                            defaultText={item.question}
                            propName={`faqs[${i}].question`}
                            inline
                        />
                    </AccordionTrigger>
                </div>
                <AccordionContent>
                  <Editable
                    id={`${id}-faq-${i}-a`}
                    as="p"
                    defaultText={item.answer}
                    propName={`faqs[${i}].answer`}
                    className="text-base text-muted-foreground"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-muted-foreground mt-6 flex items-center gap-1 flex-wrap">
            <Editable
              id={`${id}-contact-text`}
              as="span"
              defaultText={contactText}
              propName="contactText"
              inline
            />
            <Link
              href="#"
              className="text-primary font-medium hover:underline"
            >
              <Editable
                id={`${id}-contact-link-text`}
                as="span"
                defaultText={contactLinkText}
                propName="contactLinkText"
                inline
              />
            </Link>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
