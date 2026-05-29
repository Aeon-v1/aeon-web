"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQVariant4Props {
  id?: string;
  headline?: string;
  subtext?: string;
  faqs?: FAQItem[];
  footerText?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "What does your team do?",
    answer: "We design and build digital products end‑to‑end: research, UX/UI, front‑end/back‑end, infrastructure, and release support.",
  },
  {
    question: "How is your workflow structured?",
    answer: "Iteratively. Solution storyboards → quick prototypes → user testing → prioritization → production integration. Transparent at every stage.",
  },
  {
    question: "Which stack and tools do you use?",
    answer: "TypeScript/React/Next.js, Node.js, Python, Postgres, Redis, Tailwind, Playwright, CI/CD on GitHub Actions. Deployment — containers and clouds.",
  },
  {
    question: "Can we see code or a demo?",
    answer: "Yes. We prepare private demo environments, give repository access and supply documented examples.",
  },
  {
    question: "How do you estimate timelines and budgets?",
    answer: "We evaluate MVPs by impact metrics — value/complexity. We provide T‑shirt sizing bounds, then lock sprints with checkpoints.",
  },
  {
    question: "Do you take over existing products?",
    answer: "Yes. We audit, clean up architecture/CI, eliminate debts, set up monitoring and take over under SLA.",
  },
];

export function FAQVariant4({
  id = "faq-4",
  headline = "FAQ",
  subtext = "Clean, minimalistic, black‑and‑white.",
  footerText = `© ${new Date().getFullYear()} Your team — products that move metrics.`,
  faqs = defaultFaqs,
}: FAQVariant4Props) {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#ffffff",
    gradient: "none" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560; // larger presence
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? "currentColor" : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");
      c.setAttribute("class", "text-foreground");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  // Randomizer with contrast awareness (b/w forward)
  const randomize = () => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const lightColors = ["#ffffff"];
    const darkColors = ["#222222", "#111111"];
    const useLightBg = Math.random() > 0.5;

    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      gradient:
        Math.random() > 0.6
          ? (["rainbow", "ocean", "grayscale", "neon"] as const)[
              Math.floor(Math.random() * 4)
            ]
          : "none",
    }));
  };

  const filtered = query
    ? faqs
        .map((item, originalIndex) => ({ ...item, originalIndex }))
        .filter(({ question, answer }) =>
          (question + answer).toLowerCase().includes(query.toLowerCase())
        )
    : faqs.map((item, originalIndex) => ({ ...item, originalIndex }));

  return (
    <EditableSection
      id={id}
      className="relative w-full overflow-hidden text-foreground bg-background font-sans"
    >
      {/* Background Spiral */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
      >
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 gap-6">
          <div>
            <Editable
              id={`${id}-headline`}
              as="h1"
              defaultText={headline}
              propName="headline"
              className="text-4xl md:text-6xl font-bold tracking-tight"
            />
            <Editable
              id={`${id}-subtext`}
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="mt-2 text-sm md:text-base text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="h-10 w-full md:w-56 rounded-xl border border-border bg-transparent px-3 text-sm outline-none transition focus:border-foreground/60 text-foreground placeholder-muted-foreground"
            />
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((item, i) => (
              <FAQItem
                key={item.originalIndex}
                rootId={id}
                originalIndex={item.originalIndex}
                displayIndex={i + 1}
                q={item.question}
                a={item.answer}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
          <Editable
            id={`${id}-footer-text`}
            as="span"
            defaultText={footerText}
            propName="footerText"
            inline
          />
        </footer>
      </div>

      {/* Control Panel */}
      {panelOpen && (
        <aside className="fixed right-4 top-4 z-20 w-[320px] rounded-2xl border border-border bg-background/80 p-4 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground">Spiral Controls</h3>
          <div className="space-y-3 text-xs">
            <Slider label="Points" min={100} max={2000} step={50} value={cfg.points} onChange={(v) => setCfg({ ...cfg, points: v })} />
            <Slider label="Dot radius" min={0.5} max={5} step={0.1} value={cfg.dotRadius} onChange={(v) => setCfg({ ...cfg, dotRadius: v })} />
            <Slider label="Duration" min={1} max={10} step={0.1} value={cfg.duration} onChange={(v) => setCfg({ ...cfg, duration: v })} />

            <Toggle label="Pulse" value={cfg.pulseEffect} onChange={(v) => setCfg({ ...cfg, pulseEffect: v })} />
            <Slider label="Opacity min" min={0} max={1} step={0.05} value={cfg.opacityMin} onChange={(v) => setCfg({ ...cfg, opacityMin: v })} />
            <Slider label="Opacity max" min={0} max={1} step={0.05} value={cfg.opacityMax} onChange={(v) => setCfg({ ...cfg, opacityMax: v })} />
            <Slider label="Size min" min={0.1} max={2} step={0.1} value={cfg.sizeMin} onChange={(v) => setCfg({ ...cfg, sizeMin: v })} />
            <Slider label="Size max" min={0.1} max={3} step={0.1} value={cfg.sizeMax} onChange={(v) => setCfg({ ...cfg, sizeMax: v })} />

            <Select
              label="Gradient"
              value={cfg.gradient}
              options={[
                { label: "None", value: "none" },
                { label: "Rainbow", value: "rainbow" },
                { label: "Sunset", value: "sunset" },
                { label: "Ocean", value: "ocean" },
                { label: "Fire", value: "fire" },
                { label: "Neon", value: "neon" },
                { label: "Pastel", value: "pastel" },
                { label: "Grayscale", value: "grayscale" },
              ]}
              onChange={(v) => setCfg({ ...cfg, gradient: v as any })}
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={randomize}
                className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-xs hover:border-foreground/50 hover:bg-muted/80"
              >
                Randomize (R)
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-xl border border-border bg-muted px-3 py-2 text-xs hover:border-foreground/50 hover:bg-muted/80"
              >
                Close (H)
              </button>
            </div>
          </div>
        </aside>
      )}
    </EditableSection>
  );
}

function FAQItem({
  rootId,
  originalIndex,
  displayIndex,
  q,
  a,
}: {
  rootId: string;
  originalIndex: number;
  displayIndex: number;
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-foreground/40">
      <div
        className="flex w-full items-center justify-between text-left cursor-pointer"
        onClick={(e) => {
            if ((e.target as HTMLElement).closest('[data-editable]')) return;
            setOpen((v) => !v);
        }}
      >
        <div className="flex items-baseline gap-3 w-full pr-4">
          <span className="text-xs text-muted-foreground">{String(displayIndex).padStart(2, "0")}</span>
          <Editable
            id={`${rootId}-faq-${originalIndex}-q`}
            as="h3"
            defaultText={q}
            propName={`faqs[${originalIndex}].question`}
            className="text-base md:text-lg font-semibold leading-tight"
            inline
          />
        </div>
        <span className="ml-4 text-muted-foreground transition group-hover:text-foreground flex-shrink-0">
          {open ? "–" : "+"}
        </span>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <Editable
            id={`${rootId}-faq-${originalIndex}-a`}
            as="p"
            defaultText={a}
            propName={`faqs[${originalIndex}].answer`}
            className="text-sm text-muted-foreground"
          />
        </div>
      </div>
      {/* Hover halo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-foreground/10"
          style={{ maskImage: "radial-gradient(180px_180px_at_var(--x,50%)_var(--y,50%),white,transparent)" }}
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-muted-foreground">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-10 rounded-full border border-border transition ${value ? "bg-foreground" : "bg-transparent"}`}
        aria-pressed={value}
      >
        <span className={`block h-5 w-5 translate-x-0.5 rounded-full transition ${value ? "translate-x-4 bg-background" : "translate-x-0 bg-muted-foreground"}`} />
      </button>
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-muted-foreground">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none text-foreground cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
      </div>
    </label>
  );
}
