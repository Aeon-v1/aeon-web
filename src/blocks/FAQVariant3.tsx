"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import * as React from "react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQVariant3Props {
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
  { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations." },
];

export function FAQVariant3({
  id = "faq-3",
  headline = "FAQs",
  subtext = "Your questions answered",
  contactText = "Can't find what you're looking for? Contact our",
  contactLinkText = "customer support team",
  faqs = defaultFaqs,
}: FAQVariant3Props) {
    return (
        <EditableSection id={id} className="py-16 md:py-24 bg-background font-sans">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <div className="md:col-span-2">
                        <Editable
                            id={`${id}-headline`}
                            as="h2"
                            defaultText={headline}
                            propName="headline"
                            className="text-foreground text-4xl font-bold"
                        />
                        <Editable
                            id={`${id}-subtext`}
                            as="p"
                            defaultText={subtext}
                            propName="subtext"
                            className="text-muted-foreground mt-4 text-balance text-lg"
                        />
                        <div className="text-muted-foreground mt-6 hidden md:flex items-center gap-1 flex-wrap">
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

                    <div className="md:col-span-3">
                        <Accordion
                            type="single"
                            collapsible
                            className="-mx-2 sm:mx-0">
                            {faqs.map((item, i) => (
                                <div
                                    className="group"
                                    key={i}>
                                    <AccordionItem
                                        value={`item-${i}`}
                                        className="data-[state=open]:bg-muted peer rounded-xl border-none px-5 py-1 data-[state=open]:border-none md:px-7">
                                        <div onClick={(e) => {
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
                                    <hr className="mx-5 -mb-px group-last:hidden peer-data-[state=open]:opacity-0 md:mx-7 border-border" />
                                </div>
                            ))}
                        </Accordion>
                    </div>

                    <div className="text-muted-foreground mt-6 flex md:hidden items-center gap-1 flex-wrap">
                        <Editable
                            id={`${id}-contact-text-mobile`}
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
                                id={`${id}-contact-link-text-mobile`}
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
    )
}
