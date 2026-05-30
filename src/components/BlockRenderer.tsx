"use client";

import React, { createContext } from "react";
import { NavbarVariant1 } from "@/blocks/NavbarVariant1";
import { NavbarVariant2 } from "@/blocks/NavbarVariant2";
import { NavbarVariant3 } from "@/blocks/NavbarVariant3";
import { PricingVariant1 } from "@/blocks/PricingVariant1";
import { HeroVariant1 } from "@/blocks/HeroVariant1";
import { FAQVariant1 } from "@/blocks/FAQVariant1";
import { FAQVariant2 } from "@/blocks/FAQVariant2";
import { FAQVariant3 } from "@/blocks/FAQVariant3";
import { FAQVariant4 } from "@/blocks/FAQVariant4";
import { FooterVariant1 } from "@/blocks/FooterVariant1";
import { FooterVariant2 } from "@/blocks/FooterVariant2";
import { FooterVariant3 } from "@/blocks/FooterVariant3";
import { FooterVariant4 } from "@/blocks/FooterVariant4";
import { FooterVariant5 } from "@/blocks/FooterVariant5";
import { TestimonialVariant1 } from "@/blocks/TestimonialVariant1";
import { TestimonialVariant2 } from "@/blocks/TestimonialVariant2";
import { TestimonialVariant3 } from "@/blocks/TestimonialVariant3";
import { TestimonialVariant4 } from "@/blocks/TestimonialVariant4";
import { CTAVariant1 } from "@/blocks/CTAVariant1";
import { CTAVariant2 } from "@/blocks/CTAVariant2";
import { CTAVariant3 } from "@/blocks/CTAVariant3";
import { CTAVariant4 } from "@/blocks/CTAVariant4";
import { CTAVariant5 } from "@/blocks/CTAVariant5";
import { LogoSectionVariant1 } from "@/blocks/LogoSectionVariant1";
import { LogoSectionVariant2 } from "@/blocks/LogoSectionVariant2";
import { LogoSectionVariant3 } from "@/blocks/LogoSectionVariant3";
import { LogoSectionVariant4 } from "@/blocks/LogoSectionVariant4";
import { LogoSectionVariant5 } from "@/blocks/LogoSectionVariant5";
import { StatVariant1 } from "@/blocks/StatVariant1";
import { FeatureVariant1 } from "@/blocks/FeatureVariant1";
import { FeatureVariant2 } from "@/blocks/FeatureVariant2";
import { FeatureVariant3 } from "@/blocks/FeatureVariant3";
import { FeatureVariant4 } from "@/blocks/FeatureVariant4";
import { FeatureVariant5 } from "@/blocks/FeatureVariant5";
import { HowItWorksVariant1 } from "@/blocks/HowItWorksVariant1";
import { HowItWorksVariant2 } from "@/blocks/HowItWorksVariant2";
import { NewsletterVariant1 } from "@/blocks/NewsletterVariant1";
import { ContactVariant1 } from "@/blocks/ContactVariant1";
import { ContactVariant2 } from "@/blocks/ContactVariant2";

// Map string types from the JSON to actual React components
const BLOCK_REGISTRY: Record<string, React.ComponentType<any>> = {
  NavbarVariant1: NavbarVariant1,
  NavbarVariant2: NavbarVariant2,
  NavbarVariant3: NavbarVariant3,
  HeroVariant1: HeroVariant1,
  PricingVariant1: PricingVariant1,
  FAQVariant1: FAQVariant1,
  FAQVariant2: FAQVariant2,
  FAQVariant3: FAQVariant3,
  FAQVariant4: FAQVariant4,
  FooterVariant1: FooterVariant1,
  FooterVariant2: FooterVariant2,
  FooterVariant3: FooterVariant3,
  FooterVariant4: FooterVariant4,
  FooterVariant5: FooterVariant5,
  TestimonialVariant1: TestimonialVariant1,
  TestimonialVariant2: TestimonialVariant2,
  TestimonialVariant3: TestimonialVariant3,
  TestimonialVariant4: TestimonialVariant4,
  CTAVariant1: CTAVariant1,
  CTAVariant2: CTAVariant2,
  CTAVariant3: CTAVariant3,
  CTAVariant4: CTAVariant4,
  CTAVariant5: CTAVariant5,
  LogoSectionVariant1: LogoSectionVariant1,
  LogoSectionVariant2: LogoSectionVariant2,
  LogoSectionVariant3: LogoSectionVariant3,
  LogoSectionVariant4: LogoSectionVariant4,
  LogoSectionVariant5: LogoSectionVariant5,
  StatVariant1: StatVariant1,
  FeatureVariant1: FeatureVariant1,
  FeatureVariant2: FeatureVariant2,
  FeatureVariant3: FeatureVariant3,
  FeatureVariant4: FeatureVariant4,
  FeatureVariant5: FeatureVariant5,
  HowItWorksVariant1: HowItWorksVariant1,
  HowItWorksVariant2: HowItWorksVariant2,
  NewsletterVariant1: NewsletterVariant1,
  ContactVariant1: ContactVariant1,
  ContactVariant2: ContactVariant2,
};

export interface BlockData {
  type: string;
  props?: Record<string, any>;
}

export interface BlockRendererProps {
  blocks: BlockData[];
}

export const BlockContext = createContext<string>("");

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {blocks.map((block, index) => {
        const Component = BLOCK_REGISTRY[block.type];

        if (!Component) {
          // Fallback for missing or unregistered blocks
          console.warn(`Block type "${block.type}" is not registered in BLOCK_REGISTRY.`);
          return (
            <div key={index} className="p-4 border border-red-500 bg-red-500/10 text-red-500 rounded-md my-4 max-w-7xl mx-auto">
              Warning: Block type "{block.type}" not found.
            </div>
          );
        }

        const blockId = block.props?.id || `block-${index}`;
        
        // Render the resolved component with its dynamic props
        return (
          <BlockContext.Provider key={index} value={blockId}>
            <Component id={blockId} {...block.props} />
          </BlockContext.Provider>
        );
      })}
    </div>
  );
}
