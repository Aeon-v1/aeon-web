"use client";

import { Card } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useEffect, useRef, useState } from "react";

function generateDummyThoughts(prompt: string) {
  const defaultPrompt = "a new website";
  const p = prompt ? prompt.trim() : defaultPrompt;
  const shortPrompt = p.length > 50 ? p.substring(0, 50) + "..." : p;

  return `Analyzing request: "${shortPrompt}"...

Determining optimal layout and structure for this project.

Selecting the best navigation component. Navbar seems appropriate to keep it clean and focused. I'll configure the logo and main links.

Drafting the hero section. I need a strong, compelling headline that captures the essence of the request. HeroVariant1 will provide maximum visual impact.

Generating subtext that clearly explains the value proposition.

Selecting feature blocks. FeatureVariant1 works well to highlight the core benefits. I'll need to write specific copy for each feature:
- Focus on the main problem solved
- Highlight ease of use
- Emphasize modern design and scalability

Writing persuasive copy for the feature cards...

Considering adding a 'How it Works' section to guide the user. HowItWorksVariant1 is a great fit for step-by-step flows.

Drafting clear, concise steps for the How It Works section.

Adding a Pricing section. PricingVariant1 will allow me to show a tiered plan structure (e.g., Starter, Pro, Enterprise).
Inventing realistic price points and features tailored to this industry...

Adding a Testimonials section to build trust and social proof. I'll write some realistic quotes from fictional users that sound authentic.

Finalizing the layout with a strong Call to Action block. This will drive conversions at the bottom of the page.

Adding a Footer to complete the page structure and provide secondary navigation.

Reviewing the entire generated layout to ensure all components flow logically...

Checking the generated JSON payload to ensure all props match the strict block schemas...

JSON structure is perfectly valid. 
All required props are present.
Copywriting is complete and highly specific to the user's prompt.

Ready to render the page blocks to the canvas...`;
}

export default function AIThinkingBlock({ prompt }: { prompt?: string }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const fullThoughts = useRef(generateDummyThoughts(prompt || ""));

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Gradually reveal the thinking text
  useEffect(() => {
    let currentIndex = 0;
    const totalLength = fullThoughts.current.length;
    // We expect the generation to take about 30-40 seconds, so reveal ~30 chars per second
    const charsPerTick = 2;
    const tickRateMs = 50;

    revealIntervalRef.current = setInterval(() => {
      currentIndex += charsPerTick;
      if (currentIndex >= totalLength) {
        currentIndex = totalLength;
        if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
      }
      setDisplayedText(fullThoughts.current.substring(0, currentIndex));
    }, tickRateMs);

    return () => {
      if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    };
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);

      // If we are revealing text, we want to gently scroll to the bottom automatically
      // rather than looping from top to bottom
      setScrollPosition(maxScroll);
    }
  }, [displayedText]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div className="flex flex-col max-w-xl w-full">
      <div className="flex items-center justify-start gap-2 mb-3">
        <Loader size={"sm"} />
        <p
          className="bg-[linear-gradient(110deg,#a3a3a3,35%,#fff,50%,#a3a3a3,75%,#a3a3a3)] bg-[length:200%_100%] bg-clip-text text-sm font-medium text-transparent animate-[shimmer_5s_linear_infinite]"
          style={{
            animation: "shimmer 3s linear infinite",
          }}
        >
          Aeon is working
        </p>
        <span className="text-xs text-muted-foreground ml-auto font-mono">
          {timer}s
        </span>
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </div>
      <Card className="relative h-[150px] overflow-hidden bg-secondary/50 border-border/50 p-0 rounded-xl">
        {/* Top fade overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-secondary to-transparent z-10 pointer-events-none h-[40px]" />

        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary to-transparent z-10 pointer-events-none h-[40px]" />

        {/* Scrolling content */}
        <div
          ref={contentRef}
          className="h-full overflow-y-auto overflow-x-hidden p-4 pt-6 pb-12 text-secondary-foreground scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <p className="text-xs font-mono leading-relaxed whitespace-pre-wrap opacity-80">
            {displayedText}
            <span className="animate-pulse inline-block w-2 h-3 bg-primary ml-1 align-middle" />
          </p>
        </div>
      </Card>
    </div>
  );
}
