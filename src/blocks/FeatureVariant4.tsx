"use client";

import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FeatureVariant4Props {
  id?: string;
  headline?: string;
  description?: string;
}

export function FeatureVariant4({
  id = "feature-4",
  headline = "Built for Scaling teams",
  description = "Empower your team with workflows that adapt to your needs, whether you prefer git synchronization or an AI Agents interface.",
}: FeatureVariant4Props) {
  return (
    <EditableSection stableId="FeatureVariant4-1" id={id} as="section" className="overflow-hidden py-16 md:py-32 font-sans bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-6 md:space-y-12">
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          <Editable
            stableId="FeatureVariant4-2"
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-4xl font-semibold lg:text-5xl text-foreground"
          />
          <Editable
            stableId="FeatureVariant4-3"
            id={`${id}-description`}
            as="p"
            defaultText={description}
            propName="description"
            className="mt-6 text-lg text-muted-foreground max-w-2xl"
          />
        </div>
        
        <div className="relative rounded-3xl p-3 lg:col-span-3">
          <div className="[perspective:1000px] max-w-5xl mx-auto">
            <div className="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)] transition-transform duration-700 hover:[transform:skewY(0deg)skewX(0deg)rotateX(0deg)]">
              <div className="aspect-[88/46] relative rounded-xl overflow-hidden border border-border shadow-2xl">
                <div className="bg-gradient-to-t z-10 from-background absolute inset-0 to-transparent pointer-events-none opacity-60"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2797&q=80"
                  className="absolute inset-0 z-0 object-cover w-full h-full"
                  alt="Platform illustration"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4 max-w-5xl pt-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <Editable stableId="FeatureVariant4-4" id={`${id}-f1-title`} as="h3" defaultText="Lightning Fast" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant4-5" id={`${id}-f1-desc`} as="p" defaultText="Engineered for speed, our platform ensures your workflows execute in milliseconds." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-primary" />
              <Editable stableId="FeatureVariant4-6" id={`${id}-f2-title`} as="h3" defaultText="Powerful Compute" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant4-7" id={`${id}-f2-desc`} as="p" defaultText="Leverage scalable infrastructure to process heavy workloads without bottlenecks." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <Editable stableId="FeatureVariant4-8" id={`${id}-f3-title`} as="h3" defaultText="Enterprise Security" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant4-9" id={`${id}-f3-desc`} as="p" defaultText="Bank-grade encryption and compliance certifications keep your data safe." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <Editable stableId="FeatureVariant4-10" id={`${id}-f4-title`} as="h3" defaultText="AI Powered" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant4-11" id={`${id}-f4-desc`} as="p" defaultText="Smart agents automate repetitive tasks, letting your team focus on innovation." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
