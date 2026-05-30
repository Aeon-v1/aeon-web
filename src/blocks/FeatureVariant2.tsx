"use client";

import { Activity, DraftingCompass, Mail, Zap } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FeatureVariant2Props {
  id?: string;
  headline?: string;
  description?: string;
}

export function FeatureVariant2({
  id = "feature-2",
  headline = "Built for Scaling teams",
  description = "Orrupti aut temporibus assumenda atque ab, accusamus sit, molestiae veniam laboriosam pariatur.",
}: FeatureVariant2Props) {
  return (
    <EditableSection stableId="FeatureVariant2-1" id={id} as="section" className="py-16 md:py-32 font-sans bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <Editable
                stableId="FeatureVariant2-2"
                id={`${id}-headline`}
                as="h2"
                defaultText={headline}
                propName="headline"
                className="text-4xl font-semibold lg:text-5xl text-foreground"
              />
              <Editable
                stableId="FeatureVariant2-3"
                id={`${id}-description`}
                as="p"
                defaultText={description}
                propName="description"
                className="mt-6 text-muted-foreground text-lg max-w-2xl"
              />
            </div>
            <ul className="mt-8 divide-y border-y divide-border border-border *:flex *:items-center *:gap-3 *:py-3 text-foreground">
              <li>
                <Mail className="size-5 text-primary" />
                <Editable stableId="FeatureVariant2-4" id={`${id}-list1`} as="span" defaultText="Email and web support" inline />
              </li>
              <li>
                <Zap className="size-5 text-primary" />
                <Editable stableId="FeatureVariant2-5" id={`${id}-list2`} as="span" defaultText="Fast response time" inline />
              </li>
              <li>
                <Activity className="size-5 text-primary" />
                <Editable stableId="FeatureVariant2-6" id={`${id}-list3`} as="span" defaultText="Monitoring and analytics" inline />
              </li>
              <li>
                <DraftingCompass className="size-5 text-primary" />
                <Editable stableId="FeatureVariant2-7" id={`${id}-list4`} as="span" defaultText="Architectural review" inline />
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-gradient-to-b aspect-[76/59] relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1207&q=80"
                className="hidden rounded-[15px] dark:block object-cover w-full h-full"
                alt="Dashboard illustration dark"
              />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1207&q=80"
                className="rounded-[15px] shadow dark:hidden object-cover w-full h-full"
                alt="Dashboard illustration light"
              />
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
