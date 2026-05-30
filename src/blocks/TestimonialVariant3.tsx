"use client";

import React from "react";
import { Editable, EditableSection } from "@/components/Editable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial3 {
  name: string;
  role: string;
  stars: number;
  avatar: string;
  content: string;
}

export interface TestimonialVariant3Props {
  id?: string;
  testimonials?: Testimonial3[];
}

const defaultTestimonials: Testimonial3[] = [
  {
    name: "Méschac Irung",
    role: "Creator",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100",
    content: "Using Aeon has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility.",
  },
  {
    name: "Théo Balick",
    role: "Frontend Dev",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    content: "Aeon has transformed the way I develop web applications. The flexibility to customize every aspect is amazing.",
  },
  {
    name: "Glodie Lukose",
    role: "Frontend Dev",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100",
    content: "The extensive collection of UI components has significantly accelerated my workflow. Highly recommended.",
  },
];

export function TestimonialVariant3({
  id = "testimonial-3",
  testimonials: _testimonials = defaultTestimonials,
}: TestimonialVariant3Props) {
  const testimonials = (!_testimonials || _testimonials.length === 0) ? defaultTestimonials : _testimonials;
  return (
    <EditableSection stableId="TestimonialVariant3-1" id={id} as="section" className="bg-background font-sans">
      <div className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-background ring-foreground/10 rounded-2xl border border-transparent p-6 ring-1 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-4",
                        i < t.stars
                          ? "fill-primary stroke-primary"
                          : "fill-foreground/15 stroke-transparent"
                      )}
                    />
                  ))}
                </div>

                <Editable stableId="TestimonialVariant3-2"
                  id={`${id}-content-${index}`}
                  as="p"
                  defaultText={t.quote || t.content || (t as any).testimonial || "This is one of the best products I have ever used. Highly recommended!"}
                  propName={`testimonials[${index}].quote`}
                  className="text-foreground my-6 leading-relaxed"
                />

                <div className="flex items-center gap-3">
                  <Avatar className="ring-border size-10 border shadow-sm ring-1">
                    <AvatarImage src={t.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&random=${index}`} alt={t.name || "Customer"} />
                    <AvatarFallback>{(t.name || (t as any).author || "C").charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Editable stableId="TestimonialVariant3-3"
                      id={`${id}-name-${index}`}
                      as="span"
                      defaultText={t.name || (t as any).author || "Verified Customer"}
                      propName={`testimonials[${index}].name`}
                      className="text-foreground text-sm font-semibold"
                      inline
                    />
                    <Editable stableId="TestimonialVariant3-4"
                      id={`${id}-role-${index}`}
                      as="span"
                      defaultText={t.role || (t as any).position || "User"}
                      propName={`testimonials[${index}].role`}
                      className="text-muted-foreground text-xs"
                      inline
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
