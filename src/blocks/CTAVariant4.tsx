"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

export interface CTAVariant4Props {
  id?: string;
  headline?: string;
  subtext?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  marqueeItems?: string[];
}

const defaultMarqueeItems = [
  "Content Agencies",
  "Founders & Execs",
  "Social Media Managers",
  "Content Marketers",
  "Growth Teams",
];

export function CTAVariant4({
  id = "cta-4",
  headline = "Get Started in Minutes",
  subtext = "Start getting more distribution and ROI out of your content. Try Aeon for free for 14 days.",
  primaryButtonText = "START FREE TRIAL",
  secondaryButtonText = "BOOK A 15 MINUTE DEMO",
  marqueeItems = defaultMarqueeItems,
}: CTAVariant4Props) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <EditableSection id={id} as="section" className="min-h-[800px] bg-background text-foreground flex items-center justify-center px-6 py-12 overflow-hidden font-sans">
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            <Editable
              id={`${id}-headline`}
              as="h1"
              defaultText={headline}
              propName="headline"
              className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-foreground animate-fade-in-up [animation-delay:200ms]"
            />
            <Editable
              id={`${id}-subtext`}
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:400ms]"
            />
            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
              <EditableButton
                id={`${id}-primary-btn`}
                className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Editable
                  id={`${id}-primary-btn-text`}
                  as="span"
                  defaultText={primaryButtonText}
                  propName="primaryButtonText"
                  className="relative z-10"
                  inline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </EditableButton>
              <EditableButton
                id={`${id}-secondary-btn`}
                className="group relative px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 border border-border cursor-pointer"
              >
                <Editable
                  id={`${id}-secondary-btn-text`}
                  as="span"
                  defaultText={secondaryButtonText}
                  propName="secondaryButtonText"
                  className="relative z-10"
                  inline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </EditableButton>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[600px] lg:h-[700px] flex items-center justify-center animate-fade-in-up [animation-delay:400ms]">
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 marquee-item text-foreground"
                  >
                    <Editable
                      id={`${id}-marquee-${idx}`}
                      as="span"
                      defaultText={item}
                      propName={`marqueeItems[${idx}]`}
                      inline
                    />
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/50 to-transparent z-10"></div>
              
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
