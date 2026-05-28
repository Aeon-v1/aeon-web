import React from "react";
import { PricingVariant1 } from "@/blocks/PricingVariant1";
import { HeroVariant1 } from "@/blocks/HeroVariant1";
import { FAQVariant1 } from "@/blocks/FAQVariant1";
import { FooterVariant1 } from "@/blocks/FooterVariant1";
import { TestimonialVariant1 } from "@/blocks/TestimonialVariant1";
import { CTAVariant1 } from "@/blocks/CTAVariant1";
import { LogoSectionVariant1 } from "@/blocks/LogoSectionVariant1";
import { StatVariant1 } from "@/blocks/StatVariant1";
import { FeatureVariant1 } from "@/blocks/FeatureVariant1";
import { HowItWorksVariant1 } from "@/blocks/HowItWorksVariant1";

// Map string types from the JSON to actual React components
const BLOCK_REGISTRY: Record<string, React.ComponentType<any>> = {
  HeroVariant1: HeroVariant1,
  PricingVariant1: PricingVariant1,
  FAQVariant1: FAQVariant1,
  FooterVariant1: FooterVariant1,
  TestimonialVariant1: TestimonialVariant1,
  CTAVariant1: CTAVariant1,
  LogoSectionVariant1: LogoSectionVariant1,
  StatVariant1: StatVariant1,
  FeatureVariant1: FeatureVariant1,
  HowItWorksVariant1: HowItWorksVariant1,
};

export interface BlockData {
  type: string;
  props?: Record<string, any>;
}

export interface BlockRendererProps {
  blocks: BlockData[];
}

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

        // Render the resolved component with its dynamic props
        return <Component key={index} {...block.props} />;
      })}
    </div>
  );
}
