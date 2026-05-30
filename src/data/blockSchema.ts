/**
 * Block Schema Registry
 * 
 * This file is the AI's reference for what blocks exist, what their props are,
 * and example values. It is injected into the /api/generate prompt as context.
 */

export interface PropSchema {
  type: "string" | "boolean" | "array" | "object";
  description?: string;
  example?: any;
  required?: boolean;
}

export interface BlockSchema {
  description: string;
  props: Record<string, PropSchema>;
}

export const BLOCK_SCHEMA: Record<string, BlockSchema> = {
  // ─── Navbars ──────────────────────────────────────────────────────────────
  NavbarVariant1: {
    description: "Minimal navbar with logo text and a single CTA button.",
    props: {
      logoText:   { type: "string", required: true,  example: "Acme Inc" },
      ctaText:    { type: "string", required: false, example: "Get Started" },
      ctaHref:    { type: "string", required: false, example: "#" },
    },
  },
  NavbarVariant2: {
    description: "Clean navbar with logo, 3 nav links, and a CTA button.",
    props: {
      logoText: { type: "string", required: true,  example: "Acme Inc" },
      link1:    { type: "string", required: false, example: "Platform" },
      link2:    { type: "string", required: false, example: "Solutions" },
      link3:    { type: "string", required: false, example: "Resources" },
      ctaText:  { type: "string", required: false, example: "Get Started" },
    },
  },
  NavbarVariant3: {
    description: "Feature-rich navbar with logo, multiple links, and a dropdown menu.",
    props: {
      logoText: { type: "string", required: true,  example: "Acme Inc" },
      ctaText:  { type: "string", required: false, example: "Get Started" },
    },
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  HeroVariant1: {
    description: "Full-width centered hero with headline, subtext, and one CTA button.",
    props: {
      headline: { type: "string", required: true,  example: "The Future of Cloud Rendering" },
      subtext:  { type: "string", required: true,  example: "Deploy stunning interfaces from structured JSON blueprints." },
      ctaText:  { type: "string", required: false, example: "Start Building Free" },
    },
  },

  // ─── Logo Section ─────────────────────────────────────────────────────────
  LogoSectionVariant1: {
    description: "A horizontal strip of brand/partner logos.",
    props: {
      logos: {
        type: "array",
        required: false,
        example: [
          { name: "Stripe" },
          { name: "Vercel" },
          { name: "Linear" },
          { name: "Notion" },
          { name: "Figma" },
        ],
      },
    },
  },

  // ─── Stats ────────────────────────────────────────────────────────────────
  StatVariant1: {
    description: "A section showcasing 3-4 key metrics or stats with labels.",
    props: {
      headline: { type: "string", required: false, example: "By the numbers" },
      subtext:  { type: "string", required: false, example: "Scale infinitely without scaling your team." },
      stats: {
        type: "array",
        required: true,
        example: [
          { value: "10x",   label: "Faster delivery" },
          { value: "400+",  label: "Blocks available" },
          { value: "0",     label: "Lines of code" },
          { value: "99.9%", label: "Uptime" },
        ],
      },
    },
  },

  // ─── Features ─────────────────────────────────────────────────────────────
  FeatureVariant1: {
    description: "A 2x2 or 2x3 grid of feature cards, each with a title, description, and icon.",
    props: {
      headline: { type: "string", required: false, example: "Built for performance and scale." },
      subtext:  { type: "string", required: false, example: "Everything you need to ship world-class landing pages." },
      features: {
        type: "array",
        required: true,
        example: [
          { title: "Fast",       description: "Renders at the edge in milliseconds.", iconName: "Zap" },
          { title: "Flexible",   description: "Works with any data source.",          iconName: "Layout" },
          { title: "Scalable",   description: "Handle millions of requests.",         iconName: "Blocks" },
          { title: "Secure",     description: "SOC2 compliant by default.",           iconName: "Shield" },
        ],
        // Available iconNames (lucide-react): Zap, Layout, Blocks, Shield, Code, Globe, Star, 
        // Users, Lock, Rocket, BarChart, Cloud, Check, Settings, Heart, ArrowRight
      },
    },
  },

  // ─── How It Works ─────────────────────────────────────────────────────────
  HowItWorksVariant1: {
    description: "A numbered step-by-step section explaining a process (2-4 steps).",
    props: {
      headline: { type: "string", required: false, example: "How it works" },
      subtext:  { type: "string", required: false, example: "From prompt to production in three simple steps." },
      steps: {
        type: "array",
        required: true,
        example: [
          { title: "Sign Up",   description: "Create your account in 30 seconds." },
          { title: "Configure", description: "Connect your data source and choose a template." },
          { title: "Deploy",    description: "Launch your site to the global edge network." },
        ],
      },
    },
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  PricingVariant1: {
    description: "A 3-column pricing table with plan names, prices, features, and CTAs.",
    props: {
      headline: { type: "string", required: false, example: "Simple, transparent pricing" },
      subtext:  { type: "string", required: false, example: "No hidden fees. Cancel anytime." },
      plans: {
        type: "array",
        required: true,
        example: [
          {
            name: "Free",
            price: "$0",
            description: "Perfect for individuals.",
            features: ["1 Project", "Community Support", "Basic Features"],
            ctaText: "Get Started",
            popular: false,
          },
          {
            name: "Pro",
            price: "$29",
            description: "For growing teams.",
            features: ["10 Projects", "Priority Support", "All Features", "Custom Domain"],
            ctaText: "Start Free Trial",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "$99",
            description: "For large organizations.",
            features: ["Unlimited Projects", "Dedicated Support", "SSO", "SLA"],
            ctaText: "Contact Sales",
            popular: false,
          },
        ],
      },
    },
  },

  // ─── Testimonials ─────────────────────────────────────────────────────────
  TestimonialVariant1: {
    description: "A section with 3 customer testimonial cards with quotes, names, roles.",
    props: {
      headline:     { type: "string", required: false, example: "Loved by builders worldwide" },
      subtext:      { type: "string", required: false, example: "Don't take our word for it." },
      testimonials: {
        type: "array",
        required: true,
        example: [
          { quote: "This product changed how we ship.", name: "Jane Doe",   role: "CTO",        company: "TechCorp" },
          { quote: "Incredible DX and design system.",  name: "Alex Smith", role: "Lead Dev",   company: "BuildCo" },
          { quote: "We cut our build time by 10x.",     name: "Sara Lee",   role: "Head of Product", company: "LaunchPad" },
        ],
      },
    },
  },

  // ─── CTA ──────────────────────────────────────────────────────────────────
  CTAVariant1: {
    description: "A centered CTA banner with headline, subtext, primary and secondary buttons.",
    props: {
      headline:         { type: "string", required: true,  example: "Start building today." },
      subtext:          { type: "string", required: false, example: "Join thousands of teams shipping faster." },
      primaryCtaText:   { type: "string", required: false, example: "Get Started Free" },
      secondaryCtaText: { type: "string", required: false, example: "View Demo" },
    },
  },
  CTAVariant2: {
    description: "A high-contrast CTA section with a bold headline and a single button.",
    props: {
      headline: { type: "string", required: true,  example: "Ready to ship faster?" },
      subtext:  { type: "string", required: false, example: "No credit card required." },
      ctaText:  { type: "string", required: false, example: "Start for Free" },
    },
  },
  CTAVariant3: {
    description: "A side-by-side CTA layout with text on the left and a button on the right.",
    props: {
      headline: { type: "string", required: true,  example: "Build your next big thing." },
      subtext:  { type: "string", required: false, example: "Deploy in minutes, scale infinitely." },
      ctaText:  { type: "string", required: false, example: "Get Started" },
    },
  },
  CTAVariant4: {
    description: "A visually rich CTA with an animated background and prominent headline.",
    props: {
      headline: { type: "string", required: true,  example: "The future is headless." },
      subtext:  { type: "string", required: false, example: "Join 10,000+ builders." },
      ctaText:  { type: "string", required: false, example: "Try Free" },
    },
  },
  CTAVariant5: {
    description: "A minimal inline CTA strip with compact text and a button side by side.",
    props: {
      headline: { type: "string", required: true,  example: "Get early access." },
      ctaText:  { type: "string", required: false, example: "Join Waitlist" },
    },
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  FAQVariant1: {
    description: "An accordion-style FAQ section with expandable question/answer pairs.",
    props: {
      headline: { type: "string", required: false, example: "Frequently Asked Questions" },
      subtext:  { type: "string", required: false, example: "Everything you need to know." },
      faqs: {
        type: "array",
        required: true,
        example: [
          { question: "Is there a free plan?",       answer: "Yes, our free plan includes 1 project with all core features." },
          { question: "Can I cancel anytime?",       answer: "Absolutely. No contracts, cancel with one click." },
          { question: "Do you offer refunds?",       answer: "We offer a 30-day money-back guarantee on all plans." },
          { question: "Is my data secure?",          answer: "Yes, we are SOC2 compliant and encrypt all data in transit and at rest." },
        ],
      },
    },
  },
  FAQVariant2: {
    description: "A two-column FAQ layout with questions on the left and answers on the right.",
    props: {
      headline: { type: "string", required: false, example: "Common Questions" },
      faqs: {
        type: "array",
        required: true,
        example: [
          { question: "What is included?",    answer: "All plans include core features and community support." },
          { question: "How do I get started?", answer: "Sign up free — no credit card needed." },
        ],
      },
    },
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
  FooterVariant1: {
    description: "A minimal footer with brand name, tagline, navigation links, and copyright.",
    props: {
      brand:     { type: "string", required: true,  example: "Acme Inc" },
      tagline:   { type: "string", required: false, example: "The modern web platform." },
      copyright: { type: "string", required: false, example: "© 2025 Acme Inc. All rights reserved." },
      links: {
        type: "array",
        required: false,
        example: [
          { label: "Docs",      href: "#" },
          { label: "Blog",      href: "#" },
          { label: "Careers",   href: "#" },
          { label: "GitHub",    href: "#" },
        ],
      },
    },
  },
  FooterVariant2: {
    description: "A footer with brand, social links, main nav links, and legal links.",
    props: {
      brandName:        { type: "string", required: true,  example: "Acme Inc" },
      copyrightText:    { type: "string", required: false, example: "© 2025 Acme Inc" },
      copyrightLicense: { type: "string", required: false, example: "All rights reserved" },
    },
  },
  FooterVariant5: {
    description: "A full-featured footer with brand, description, 3 link columns (Product, Company, Resources), social icons, and legal links.",
    props: {
      brandName:    { type: "string", required: true,  example: "Acme Inc" },
      description:  { type: "string", required: false, example: "A platform built for modern teams." },
      copyrightText: { type: "string", required: false, example: "© 2025 Acme Inc. All rights reserved." },
    },
  },
};

/**
 * Returns a compact JSON string of the schema suitable for injection into an AI prompt.
 */
export function getSchemaPrompt(): string {
  const entries = Object.entries(BLOCK_SCHEMA).map(([type, schema]) => {
    const propsDescription = Object.entries(schema.props)
      .map(([propName, prop]) => {
        const req = prop.required ? " (required)" : " (optional)";
        const ex = prop.example !== undefined
          ? ` — e.g. ${JSON.stringify(prop.example).slice(0, 80)}`
          : "";
        return `    "${propName}": ${prop.type}${req}${ex}`;
      })
      .join("\n");

    return `${type}: ${schema.description}\n  props:\n${propsDescription}`;
  });

  return entries.join("\n\n");
}
