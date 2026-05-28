"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { Editable } from "@/components/Editable"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  ctaText: string
  popular?: boolean
}

export interface PricingVariant1Props {
  headline?: string
  subtext?: string
  plans?: PricingPlan[]
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for small side projects.",
    features: ["1 Project", "Basic Support", "10GB Storage"],
    ctaText: "Get Started",
  },
  {
    name: "Pro",
    price: "$49",
    description: "For professionals and growing teams.",
    features: ["Unlimited Projects", "Priority Support", "100GB Storage", "Custom Analytics"],
    ctaText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "Advanced features for large organizations.",
    features: ["Unlimited Everything", "24/7 Dedicated Support", "SSO Authentication"],
    ctaText: "Contact Sales",
  },
]

export function PricingVariant1({
  headline = "Simple, transparent pricing",
  subtext = "Choose the plan that's right for you.",
  plans = defaultPlans,
}: PricingVariant1Props) {
  return (
    <section className="w-full py-24 md:py-32 bg-[#111110] text-[#EFEEEA] transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <Editable
              as="h2"
              defaultText={headline}
              propName="headline"
              className="text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl text-[#EFEEEA]"
            />
            <Editable
              as="p"
              defaultText={subtext}
              propName="subtext"
              className="max-w-[900px] text-[#D8D8D6] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-light mx-auto"
            />
          </div>
        </motion.div>
        
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: index * 0.1 }}
              whileHover={{ scale: 0.98, borderColor: "rgba(255,255,255,0.1)" }}
              className="h-full w-full relative"
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#EFEEEA] text-[#111110] px-4 py-1 rounded-[5px] text-xs font-mono font-medium uppercase tracking-wider z-20 shadow-sm">
                  Most Popular
                </div>
              )}
              <Card
                className={`flex flex-col justify-between h-full relative bg-[#161615] text-[#EFEEEA] border-white/[0.04] shadow-md transition-colors ${
                  plan.popular ? "border-white/[0.1] shadow-white/[0.02]" : ""
                }`}
              >
                <CardHeader>
                  <Editable
                    as="div"
                    defaultText={plan.name}
                    propName={`plans[${index}].name`}
                    className="text-xl font-medium tracking-tight text-[#EFEEEA] font-sans"
                  />
                  <div className="text-5xl font-medium tracking-tighter mt-2 flex items-baseline">
                    <Editable as="span" defaultText={plan.price} propName={`plans[${index}].price`} inline />
                    <span className="text-lg text-[#D8D8D6] font-light ml-1">/mo</span>
                  </div>
                  <Editable
                    as="p"
                    defaultText={plan.description}
                    propName={`plans[${index}].description`}
                    className="text-[#D8D8D6] font-light mt-2 text-sm"
                  />
                </CardHeader>
                <CardContent className="grid gap-4 flex-1 mt-4">
                  <ul className="space-y-3 text-sm text-[#D8D8D6]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-[#EFEEEA]"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <Editable
                          as="span"
                          defaultText={feature}
                          propName={`plans[${index}].features[${i}]`}
                          className="font-light"
                          inline
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                    className={`w-full py-3 px-4 rounded-[5px] font-mono text-sm tracking-tight transition-colors ${
                      plan.popular
                        ? "bg-[#EFEEEA] text-[#111110] hover:bg-white"
                        : "bg-white/[0.04] text-[#EFEEEA] hover:bg-white/[0.08] border border-white/[0.04]"
                    }`}
                  >
                    <Editable as="span" defaultText={plan.ctaText} propName={`plans[${index}].ctaText`} inline />
                  </motion.button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
