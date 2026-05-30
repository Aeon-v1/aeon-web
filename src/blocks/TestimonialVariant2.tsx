"use client";

import React from "react";
import { Editable, EditableSection } from "@/components/Editable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  logo?: string;
}

export interface TestimonialVariant2Props {
  id?: string;
  headline?: string;
  subtext?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Shekinah Tshiokufila",
    role: "Software Engineer",
    content: "Aeon has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
  },
  {
    name: "Jonathan Yombo",
    role: "Software Engineer",
    content: "Aeon is really extraordinary and very practical, no need to break your head. A real gold mine for quickly prototyping sites.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    name: "Yucel Faruksahan",
    role: "Creator, Tailkits",
    content: "Great work on this template. This is one of the best personal website builders that I have seen so far!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    name: "Rodrigo Aguilar",
    role: "Creator, TailwindAwesome",
    content: "I've tried many builders, but the speed and quality of the AI generation here is simply unmatched. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export function TestimonialVariant2({
  id = "testimonial-2",
  headline = "Built by makers, loved by developers",
  subtext = "Aeon is evolving to be more than just the models. It supports an entire platform helping businesses innovate.",
  testimonials: _testimonials = defaultTestimonials,
}: TestimonialVariant2Props) {
  const testimonials = (!_testimonials || _testimonials.length === 0) ? defaultTestimonials : _testimonials;
  return (
    <EditableSection stableId="TestimonialVariant2-1" id={id} as="section" className="py-16 md:py-32 font-sans bg-background text-foreground">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-12">
          <Editable stableId="TestimonialVariant2-2"
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-4xl font-medium lg:text-5xl tracking-tight"
          />
          <Editable stableId="TestimonialVariant2-3"
            id={`${id}-subtext`}
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-muted-foreground text-lg"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          {testimonials.map((t, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;

            return (
              <Card 
                key={idx} 
                className={cn(
                  "border-border bg-card text-card-foreground shadow-sm",
                  isFirst ? "grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2" :
                  isSecond ? "md:col-span-2" : ""
                )}
              >
                {isFirst && t.logo && (
                  <CardHeader>
                    <img
                      className="h-6 w-fit dark:invert opacity-60"
                      src={t.logo}
                      alt="Company Logo"
                      height="24"
                      width="auto"
                    />
                  </CardHeader>
                )}
                <CardContent className={cn("h-full pt-6", isFirst && "pt-0")}>
                  <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                    <Editable stableId="TestimonialVariant2-4"
                      id={`${id}-content-${idx}`}
                      as="p"
                      defaultText={t.quote || t.content || (t as any).testimonial || "This product has completely transformed our workflow. Highly recommended!"}
                      propName={`testimonials[${idx}].quote`}
                      className={cn(
                        "font-medium leading-relaxed",
                        isFirst || isSecond ? "text-xl" : "text-base"
                      )}
                    />

                    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                      <Avatar className="size-12 ring-1 ring-border">
                        <AvatarImage src={t.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100&auto=format&fit=crop&q=80&w=100&h=100&random=${idx}`} alt={t.name || "Customer"} />
                        <AvatarFallback>{(t.name || (t as any).author || "C").charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <Editable stableId="TestimonialVariant2-5"
                          id={`${id}-name-${idx}`}
                          as="cite"
                          defaultText={t.name || (t as any).author || "Satisfied Customer"}
                          propName={`testimonials[${idx}].name`}
                          className="text-sm font-medium not-italic"
                          inline
                        />
                        <Editable stableId="TestimonialVariant2-6"
                          id={`${id}-role-${idx}`}
                          as="span"
                          defaultText={t.role || (t as any).position || "Verified User"}
                          propName={`testimonials[${idx}].role`}
                          className="text-muted-foreground block text-sm"
                          inline
                        />
                      </div>
                    </div>
                  </blockquote>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </EditableSection>
  );
}
