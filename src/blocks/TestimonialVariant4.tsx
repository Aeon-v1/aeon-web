"use client";

import React, { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Editable, EditableSection } from "@/components/Editable";

export interface Testimonial4 {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface TestimonialVariant4Props {
  id?: string;
  headline?: string;
  subtext?: string;
  testimonials?: Testimonial4[];
}

const defaultTestimonials: Testimonial4[] = [
  {
    name: "Guillermo Rauch",
    role: "CEO of Enigma",
    content: "Aeon has been a game-changer for us. Their service is top-notch and their team is incredibly responsive.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Rika Shinoda",
    role: "CEO of Kintsugi",
    content: "We've seen incredible results with Aeon. Their expertise and dedication are unmatched.",
    avatar: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Jack Reacher",
    role: "CEO of OdeaoLabs",
    content: "Their team is highly professional, and their innovative solutions have truly transformed the way we operate.",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "John Doe",
    role: "CEO of Labsbo",
    content: "We're extremely satisfied with Aeon. Their expertise and dedication have exceeded our expectations.",
    avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Steven Sunny",
    role: "CEO of boxefi",
    content: "Their customer support is absolutely exceptional. They are always available and incredibly helpful.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Guillermo Rauch",
    role: "CEO of OdeaoLabs",
    content: "Aeon has been a key partner in our growth journey.",
    avatar: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Paul Brauch",
    role: "CTO of Spectrum",
    content: "Aeon has been a true game-changer for us. Their exceptional service, combined with their deep expertise and commitment to excellence, has made a significant impact on our business.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export function TestimonialVariant4({
  id = "testimonial-4",
  headline = "Trusted by Startups and the world's largest companies",
  subtext = "Let's hear how our clients feel about our service",
  testimonials: _testimonials = defaultTestimonials,
}: TestimonialVariant4Props) {
  const testimonials = (!_testimonials || _testimonials.length === 0) ? defaultTestimonials : _testimonials;
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <EditableSection stableId="TestimonialVariant4-1" id={id} as="main" className="w-full bg-background font-sans">
      <section className="relative h-full container mx-auto rounded-lg py-14" ref={testimonialRef}>
        <article className="max-w-7xl mx-auto text-center space-y-4 px-4">
          <TimelineContent as="h1" className="xl:text-5xl text-4xl font-medium text-foreground tracking-tight" animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            <Editable stableId="TestimonialVariant4-2" id={`${id}-headline`} as="span" defaultText={headline} propName="headline" inline />
          </TimelineContent>
          <TimelineContent as="p" className="mx-auto text-muted-foreground text-lg" animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            <Editable stableId="TestimonialVariant4-3" id={`${id}-subtext`} as="span" defaultText={subtext} propName="subtext" inline />
          </TimelineContent>
        </article>

        {/* 3 Columns Grid */}
        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full lg:py-16 pt-10 pb-4 lg:px-10 px-4">
          
          {/* Column 1 */}
          <div className="md:flex lg:flex-col lg:space-y-4 h-full lg:gap-0 gap-4">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-foreground text-background overflow-hidden rounded-2xl border border-border p-6 shadow-lg">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2e_1px,transparent_1px),linear-gradient(to_bottom,#ffffff2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <Editable stableId="TestimonialVariant4-4" id={`${id}-content-0`} as="p" defaultText={testimonials[0]?.quote || testimonials[0]?.content} propName="testimonials[0].quote" className="text-lg leading-relaxed" />
                <div className="flex justify-between items-end pt-8">
                  <div>
                    <Editable stableId="TestimonialVariant4-5" id={`${id}-name-0`} as="h2" defaultText={testimonials[0]?.name} propName="testimonials[0].name" className="font-semibold text-lg" />
                    <Editable stableId="TestimonialVariant4-6" id={`${id}-role-0`} as="p" defaultText={testimonials[0]?.role} propName="testimonials[0].role" className="opacity-80 text-sm" />
                  </div>
                  <img src={testimonials[0]?.avatar} alt="avatar" className="w-14 h-14 rounded-xl object-cover ring-2 ring-background/20" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 shadow-lg">
              <article className="mt-auto relative z-10">
                <Editable stableId="TestimonialVariant4-7" id={`${id}-content-1`} as="p" defaultText={testimonials[1]?.quote || testimonials[1]?.content} propName="testimonials[1].quote" className="text-base leading-relaxed" />
                <div className="flex justify-between items-end pt-6">
                  <div>
                    <Editable stableId="TestimonialVariant4-8" id={`${id}-name-1`} as="h2" defaultText={testimonials[1]?.name} propName="testimonials[1].name" className="font-semibold" />
                    <Editable stableId="TestimonialVariant4-9" id={`${id}-role-1`} as="p" defaultText={testimonials[1]?.role} propName="testimonials[1].role" className="opacity-80 text-xs" />
                  </div>
                  <img src={testimonials[1]?.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-foreground/20" />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-4 lg:gap-0 gap-4">
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 shadow-sm">
              <article className="mt-auto">
                <Editable stableId="TestimonialVariant4-10" id={`${id}-content-2`} as="p" defaultText={testimonials[2]?.quote || testimonials[2]?.content} propName="testimonials[2].quote" className="text-sm leading-relaxed" />
                <div className="flex justify-between items-end pt-6">
                  <div>
                    <Editable stableId="TestimonialVariant4-11" id={`${id}-name-2`} as="h2" defaultText={testimonials[2]?.name} propName="testimonials[2].name" className="font-semibold text-base" />
                    <Editable stableId="TestimonialVariant4-12" id={`${id}-role-2`} as="p" defaultText={testimonials[2]?.role} propName="testimonials[2].role" className="text-muted-foreground text-xs" />
                  </div>
                  <img src={testimonials[2]?.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 shadow-sm">
              <article className="mt-auto">
                <Editable stableId="TestimonialVariant4-13" id={`${id}-content-3`} as="p" defaultText={testimonials[3]?.quote || testimonials[3]?.content} propName="testimonials[3].quote" className="text-sm leading-relaxed" />
                <div className="flex justify-between items-end pt-6">
                  <div>
                    <Editable stableId="TestimonialVariant4-14" id={`${id}-name-3`} as="h2" defaultText={testimonials[3]?.name} propName="testimonials[3].name" className="font-semibold text-base" />
                    <Editable stableId="TestimonialVariant4-15" id={`${id}-role-3`} as="p" defaultText={testimonials[3]?.role} propName="testimonials[3].role" className="text-muted-foreground text-xs" />
                  </div>
                  <img src={testimonials[3]?.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-2xl border border-border p-6 shadow-sm">
              <article className="mt-auto">
                <Editable stableId="TestimonialVariant4-16" id={`${id}-content-4`} as="p" defaultText={testimonials[4]?.quote || testimonials[4]?.content} propName="testimonials[4].quote" className="text-sm leading-relaxed" />
                <div className="flex justify-between items-end pt-6">
                  <div>
                    <Editable stableId="TestimonialVariant4-17" id={`${id}-name-4`} as="h2" defaultText={testimonials[4]?.name} propName="testimonials[4].name" className="font-semibold text-base" />
                    <Editable stableId="TestimonialVariant4-18" id={`${id}-role-4`} as="p" defaultText={testimonials[4]?.role} propName="testimonials[4].role" className="text-muted-foreground text-xs" />
                  </div>
                  <img src={testimonials[4]?.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover" />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="h-full md:flex lg:flex-col lg:space-y-4 lg:gap-0 gap-4">
            <TimelineContent animationNum={7} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-2xl border border-primary/20 p-6 shadow-lg">
              <article className="mt-auto relative z-10">
                <Editable stableId="TestimonialVariant4-19" id={`${id}-content-5`} as="p" defaultText={testimonials[5]?.quote || testimonials[5]?.content} propName="testimonials[5].quote" className="text-base leading-relaxed" />
                <div className="flex justify-between items-end pt-6">
                  <div>
                    <Editable stableId="TestimonialVariant4-20" id={`${id}-name-5`} as="h2" defaultText={testimonials[5]?.name} propName="testimonials[5].name" className="font-semibold" />
                    <Editable stableId="TestimonialVariant4-21" id={`${id}-role-5`} as="p" defaultText={testimonials[5]?.role} propName="testimonials[5].role" className="opacity-80 text-xs" />
                  </div>
                  <img src={testimonials[5]?.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-foreground/20" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={8} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-foreground text-background overflow-hidden rounded-2xl border border-border p-6 shadow-lg">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2e_1px,transparent_1px),linear-gradient(to_bottom,#ffffff2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <Editable stableId="TestimonialVariant4-22" id={`${id}-content-6`} as="p" defaultText={testimonials[6]?.quote || testimonials[6]?.content} propName="testimonials[6].quote" className="text-lg leading-relaxed" />
                <div className="flex justify-between items-end pt-8">
                  <div>
                    <Editable stableId="TestimonialVariant4-23" id={`${id}-name-6`} as="h2" defaultText={testimonials[6]?.name} propName="testimonials[6].name" className="font-semibold text-lg" />
                    <Editable stableId="TestimonialVariant4-24" id={`${id}-role-6`} as="p" defaultText={testimonials[6]?.role} propName="testimonials[6].role" className="opacity-80 text-sm" />
                  </div>
                  <img src={testimonials[6]?.avatar} alt="avatar" className="w-14 h-14 rounded-xl object-cover ring-2 ring-background/20" />
                </div>
              </article>
            </TimelineContent>
          </div>

        </div>
      </section>
    </EditableSection>
  );
}
