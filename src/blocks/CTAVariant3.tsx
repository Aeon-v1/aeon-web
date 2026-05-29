"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";

export interface CTAVariant3Props {
  id?: string;
  headline?: string;
  subtext?: string;
  buttonText?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

export function CTAVariant3({
  id = "cta-3",
  headline = "Call to Action",
  subtext = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  items = defaultItems,
}: CTAVariant3Props) {
  return (
    <EditableSection id={id} as="section" className="py-16 md:py-32 font-sans bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <Editable
                  id={`${id}-headline`}
                  as="h4"
                  defaultText={headline}
                  propName="headline"
                  className="mb-1 text-2xl font-bold md:text-3xl text-foreground"
                />
                <Editable
                  id={`${id}-subtext`}
                  as="p"
                  defaultText={subtext}
                  propName="subtext"
                  className="text-muted-foreground mt-4"
                />
                <div className="mt-6">
                  <EditableButton
                    id={`${id}-primary-btn`}
                    className="inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 sm:h-10 px-6 sm:px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  >
                    <Editable
                      id={`${id}-primary-btn-text`}
                      as="span"
                      defaultText={buttonText}
                      propName="buttonText"
                      inline
                    />
                    <ArrowRight className="size-4 ml-1" />
                  </EditableButton>
                </div>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-3 text-sm font-medium text-foreground">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-4 size-4 flex-shrink-0 text-primary" />
                      <Editable
                        id={`${id}-item-${idx}`}
                        as="span"
                        defaultText={item}
                        propName={`items[${idx}]`}
                        inline
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
