import { BlockData } from "@/components/BlockRenderer";

export const MOCK_PAGE_DATA: BlockData[] = [
  {
    type: "NavbarVariant2",
    props: {
      logoText: "Aeon Web",
      link1: "Platform",
      link2: "Solutions",
      link3: "Resources",
      ctaText: "Get Started",
    },
  },
  {
    type: "HeroVariant1",
    props: {
      headline: "The Future of Cloud Rendering",
      subtext: "Deploy stunning, high-performance interfaces directly from structured JSON blueprints. No coding required.",
      ctaText: "Start Building Free",
    },
  },
  {
    type: "LogoSectionVariant1",
    props: {
      headline: "Trusted by teams at",
      logos: [
        { name: "Vercel" },
        { name: "Linear" },
        { name: "Notion" },
        { name: "Stripe" },
        { name: "Figma" },
        { name: "Loom" },
      ],
    },
  },
  {
    type: "StatVariant1",
    props: {
      headline: "By the numbers",
      subtext: "Scale your landing pages infinitely without scaling your engineering team.",
      stats: [
        { value: "400+", label: "Blocks available" },
        { value: "10x", label: "Faster delivery" },
        { value: "0", label: "Lines of code" },
        { value: "99.9%", label: "Uptime" },
      ],
    },
  },
  {
    type: "FeatureVariant1",
    props: {
      headline: "Built for performance and scale.",
      subtext: "Everything you need to ship world-class landing pages without the overhead.",
      features: [
        { title: "JSON Driven", description: "Every layout, style, and component is driven completely by a structured JSON payload.", iconName: "Code" },
        { title: "Headless Architecture", description: "Decoupled frontend that scales infinitely and deploys to the edge in seconds.", iconName: "Layout" },
        { title: "Premium Blocks", description: "Access a library of meticulously designed, high-converting UI blocks out of the box.", iconName: "Blocks" },
        { title: "Blazing Fast", description: "Next.js App Router, React Server Components, and optimized assets ensure maximum performance.", iconName: "Zap" },
      ],
    },
  },
  {
    type: "HowItWorksVariant1",
    props: {
      headline: "How it works",
      subtext: "From prompt to production in three simple steps.",
      steps: [
        { title: "Generate Blueprint", description: "The Aeon AI generates a structured JSON payload describing the complete page layout, copy, and components." },
        { title: "Process Payload", description: "The headless renderer receives the payload and maps each JSON block to a pre-built React component in the registry." },
        { title: "Deploy Automatically", description: "The final page is statically rendered and deployed to the edge, resulting in blazing fast load times and perfect SEO." },
      ],
    },
  },
  {
    type: "PricingVariant1",
    props: {
      headline: "Scalable Pricing",
      subtext: "Only pay for what you render.",
      plans: [
        {
          name: "Developer",
          price: "$0",
          description: "For individuals exploring the engine.",
          features: ["1 Project", "Community Support", "Basic Blocks"],
          ctaText: "Get Started",
        },
        {
          name: "Startup",
          price: "$49",
          description: "For growing teams.",
          features: ["10 Projects", "Priority Support", "Premium Blocks", "Custom Themes"],
          ctaText: "Upgrade to Startup",
          popular: true,
        },
        {
          name: "Enterprise",
          price: "$199",
          description: "Advanced features for large organizations.",
          features: ["Unlimited Everything", "24/7 Dedicated Support", "SSO & SAML", "SLA Guarantee"],
          ctaText: "Contact Sales",
        },
      ],
    },
  },
  {
    type: "TestimonialVariant1",
    props: {
      headline: "Trusted by builders worldwide",
      subtext: "Don't take our word for it.",
      testimonials: [
        { quote: "Aeon Web cut our landing page build time from weeks to hours. The JSON-driven approach is a game changer.", name: "Sofia Andersen", role: "Head of Product", company: "Luma Labs" },
        { quote: "The Aeon design system is the most coherent renderer we've integrated. Truly premium.", name: "Marcus Thorn", role: "Lead Engineer", company: "Fieldstone AI" },
        { quote: "We ship entire marketing pages without touching code. Our designers love the control.", name: "Priya Nair", role: "CTO", company: "Orbit Studio" },
      ],
    },
  },
  {
    type: "CTAVariant1",
    props: {
      headline: "Start building today.",
      subtext: "Join thousands of teams shipping faster with Aeon Web.",
      primaryCtaText: "Get Started Free",
      secondaryCtaText: "View Docs",
    },
  },
  {
    type: "FAQVariant1",
    props: {
      headline: "Frequently Asked Questions",
      subtext: "Everything you need to know about Aeon Web.",
      faqs: [
        { question: "What is Aeon Web?", answer: "Aeon Web is a headless rendering engine that transforms JSON blueprints into fully styled, high-performance landing pages." },
        { question: "Do I need to write code?", answer: "No. The Aeon AI generates the JSON payload. Aeon Web handles all the rendering automatically." },
        { question: "Which frameworks does it support?", answer: "Aeon Web is built on Next.js with the App Router and is fully compatible with modern React patterns." },
        { question: "Can I customize the fonts and colors?", answer: "Yes. The design system supports 40+ Google Fonts and a full Aeon color palette via CSS variables." },
      ],
    },
  },
  {
    type: "FooterVariant1",
    props: {
      brand: "Aeon",
      tagline: "The headless rendering engine for the modern web.",
      links: [
        { label: "Docs", href: "#" },
        { label: "Blocks", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "GitHub", href: "#" },
      ],
      copyright: "© 2025 Aeon. All rights reserved.",
    },
  },
];
