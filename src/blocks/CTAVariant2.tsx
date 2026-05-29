"use client";

import * as React from "react";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";

export interface CTAVariant2Props {
  id?: string;
  headline?: string;
  subtext?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export function CTAVariant2({
  id = "cta-2",
  headline = "Let your plans shape the future.",
  subtext = "Start your free trial today. No credit card required.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Contact Sales",
}: CTAVariant2Props) {
  return (
    <EditableSection id={id} as="section" className="w-full bg-background font-sans py-24">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-y border-border bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] px-4 py-8">
        <PlusIcon
          className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6 text-muted-foreground"
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6 text-muted-foreground"
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6 text-muted-foreground"
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6 text-muted-foreground"
          strokeWidth={1}
        />

        <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l border-border" />
        <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r border-border" />

        <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed border-border" />

        <div className="space-y-1">
          <Editable
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-center font-bold text-2xl text-foreground"
          />
          <Editable
            id={`${id}-subtext`}
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-center text-muted-foreground"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <EditableButton
            id={`${id}-secondary-btn`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-foreground"
          >
            <Editable
              id={`${id}-secondary-btn-text`}
              as="span"
              defaultText={secondaryButtonText}
              propName="secondaryButtonText"
              inline
            />
          </EditableButton>
          <EditableButton
            id={`${id}-primary-btn`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <Editable
              id={`${id}-primary-btn-text`}
              as="span"
              defaultText={primaryButtonText}
              propName="primaryButtonText"
              inline
            />
            <ArrowRightIcon className="size-4 ml-1" />
          </EditableButton>
        </div>
      </div>
    </EditableSection>
  );
}
