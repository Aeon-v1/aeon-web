"use client";

import * as React from "react";
import { Editable, EditableButton, EditableSection, EditableImage } from "@/components/Editable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FeatureColumn {
  images: string[];
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

export interface HowItWorksVariant2Props {
  id?: string;
  headline?: string;
  subtext?: string;
  columns?: FeatureColumn[];
}

const defaultColumns: FeatureColumn[] = [
  {
    images: [
      "",
      ""
    ],
    title: "Optical Sensor",
    subtitle: "ANONYMISED COMPUTER VISION",
    description: "We make an optical sensor that is able to understand and interpret activity within a room. Everything is computed locally and privately.",
    buttonText: "Our technology",
  },
  {
    images: [
      ""
    ],
    title: "Care",
    subtitle: "USER-FRIENDLY SYSTEMS",
    description: "Give staff the tools to understand and prioritise care for their residents. Seamlessly integrating into your existing routines.",
    buttonText: "Our product",
  },
  {
    images: [
      ""
    ],
    title: "Analyse",
    subtitle: "HANDS-ON CUSTOMER SUCCESS",
    description: "We work directly with care staff and ward leaders to help ensure a successful integration with optimal results.",
    buttonText: "Our Company",
  },
];

export function HowItWorksVariant2({
  id = "how-it-works-2",
  headline = "How Teton works",
  subtext = "Support care staff in providing the best care for their patients",
  columns: _columns = defaultColumns,
}: HowItWorksVariant2Props) {
  const columns = (!_columns || _columns.length === 0) ? defaultColumns : _columns;

  return (
    <EditableSection stableId="HowItWorksVariant2-1" id={id} as="section" className="w-full py-16 md:py-24 lg:py-32 bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Area */}
        <div className="mb-12 md:mb-16">
          <Editable
            stableId="HowItWorksVariant2-2"
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-3xl md:text-4xl font-semibold text-foreground mb-2"
          />
          <Editable
            stableId="HowItWorksVariant2-3"
            id={`${id}-subtext`}
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl"
          />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col group">
              
              <div className="flex flex-col gap-4 aspect-[3/4] mb-8">
                {col.images && col.images.length === 2 ? (
                  <>
                    <div className="h-1/2 w-full rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
                      <EditableImage stableId={`HowItWorksVariant2-img-${idx}-0`} src={col.images[0]} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="h-1/2 w-full rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
                      <EditableImage stableId={`HowItWorksVariant2-img-${idx}-1`} src={col.images[1]} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </>
                ) : (
                  <div className="h-full w-full rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
                    <EditableImage stableId={`HowItWorksVariant2-img-${idx}-0`} src={col.images?.[0] || ""} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1">
                <Editable
                  stableId="HowItWorksVariant2-4"
                  id={`${id}-col-${idx}-title`}
                  as="h3"
                  defaultText={col.title}
                  propName={`columns[${idx}].title`}
                  className="text-2xl font-semibold text-foreground mb-3"
                  inline
                />
                <Editable
                  stableId="HowItWorksVariant2-5"
                  id={`${id}-col-${idx}-subtitle`}
                  as="h4"
                  defaultText={col.subtitle}
                  propName={`columns[${idx}].subtitle`}
                  className="text-xs font-bold tracking-wider text-blue-500/90 uppercase mb-4"
                  inline
                />
                <Editable
                  stableId="HowItWorksVariant2-6"
                  id={`${id}-col-${idx}-desc`}
                  as="p"
                  defaultText={col.description}
                  propName={`columns[${idx}].description`}
                  className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1"
                />
                
                <div className="mt-auto">
                  <EditableButton
                    stableId="HowItWorksVariant2-7"
                    id={`${id}-col-${idx}-btn`}
                    as={Button}
                    variant="default"
                    className="rounded-full px-6 bg-[#1e1e1e] hover:bg-[#1e1e1e]/90 text-white font-medium"
                  >
                    <Editable
                      stableId="HowItWorksVariant2-8"
                      id={`${id}-col-${idx}-btn-text`}
                      as="span"
                      defaultText={col.buttonText}
                      propName={`columns[${idx}].buttonText`}
                      inline
                    />
                  </EditableButton>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </EditableSection>
  );
}
