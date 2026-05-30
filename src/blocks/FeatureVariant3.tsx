"use client";

import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FeatureVariant3Props {
  id?: string;
  headline?: string;
  description?: string;
}

export function FeatureVariant3({
  id = "feature-3",
  headline = "The Aeon ecosystem brings together our models",
  description = "Empower your team with workflows that adapt to your needs, whether you prefer git synchronization or an AI Agents interface.",
}: FeatureVariant3Props) {
  return (
    <EditableSection stableId="FeatureVariant3-1" id={id} as="section" className="py-16 md:py-32 font-sans bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-4 md:px-6">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <Editable
            stableId="FeatureVariant3-2"
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-4xl font-semibold text-foreground max-w-2xl"
          />
          <Editable
            stableId="FeatureVariant3-3"
            id={`${id}-description`}
            as="p"
            defaultText={description}
            propName="description"
            className="max-w-2xl text-muted-foreground sm:ml-auto"
          />
        </div>
        <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
          <div className="aspect-[88/36] relative rounded-2xl overflow-hidden shadow-sm border border-border/50">
            <div className="bg-gradient-to-t z-10 from-background absolute inset-0 to-transparent pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2797&q=80"
              className="absolute inset-0 z-0 object-cover w-full h-full"
              alt="Platform illustration"
            />
          </div>
        </div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4 pt-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <Editable stableId="FeatureVariant3-4" id={`${id}-f1-title`} as="h3" defaultText="Faaast" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant3-5" id={`${id}-f1-desc`} as="p" defaultText="It supports an entire helping developers and innovate." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-primary" />
              <Editable stableId="FeatureVariant3-6" id={`${id}-f2-title`} as="h3" defaultText="Powerful" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant3-7" id={`${id}-f2-desc`} as="p" defaultText="It supports an entire helping developers and businesses." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <Editable stableId="FeatureVariant3-8" id={`${id}-f3-title`} as="h3" defaultText="Security" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant3-9" id={`${id}-f3-desc`} as="p" defaultText="It supports an helping developers businesses innovate." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <Editable stableId="FeatureVariant3-10" id={`${id}-f4-title`} as="h3" defaultText="AI Powered" className="text-sm font-medium text-foreground" inline />
            </div>
            <Editable stableId="FeatureVariant3-11" id={`${id}-f4-desc`} as="p" defaultText="It supports an helping developers businesses innovate." className="text-muted-foreground text-sm max-w-2xl" />
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
