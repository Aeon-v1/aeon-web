"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Editable } from "@/components/Editable";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterVariant1Props {
  brand?: string;
  tagline?: string;
  links?: FooterLink[];
  copyright?: string;
}

export function FooterVariant1({
  brand = "Aeon",
  tagline = "The headless rendering engine for the modern web.",
  links = [],
  copyright = "© 2025 Aeon. All rights reserved.",
}: FooterVariant1Props) {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#111110] text-[#D8D8D6] font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left"
        >
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <Editable
              as="span"
              defaultText={brand}
              propName="brand"
              className="text-[#EFEEEA] text-xl font-medium tracking-tight inline-block"
              inline
            />
            <Editable
              as="p"
              defaultText={tagline}
              propName="tagline"
              className="text-sm text-[#D8D8D6] font-light leading-relaxed"
            />
          </div>

          {/* Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-light text-[#D8D8D6] transition-colors hover:text-[#EFEEEA]"
                >
                  <Editable as="span" defaultText={link.label} propName={`links[${index}].label`} inline />
                </a>
              ))}
            </nav>
          )}
        </motion.div>

        {/* Divider + Copyright */}
        <div className="mt-12 border-t border-white/[0.04] pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Editable
            as="p"
            defaultText={copyright}
            propName="copyright"
            className="text-xs font-mono text-[#D8D8D6]/60 tracking-wide"
          />
          <p className="text-xs font-mono text-[#D8D8D6]/40 tracking-wide">
            Powered by Aeon Web Renderer
          </p>
        </div>
      </div>
    </footer>
  );
}
