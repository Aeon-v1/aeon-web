"use client";

import * as React from "react";
import { Editable, EditableSection } from "@/components/Editable";
import { Hexagon } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export interface FooterVariant5Props {
  id?: string;
  brandName?: string;
  description?: string;
  copyrightText?: string;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export function FooterVariant5({
  id = "footer-5",
  brandName = "Aeon",
  description = "A collection of components for your startup business or side project.",
  copyrightText = "© 2024 Aeon Web. All rights reserved.",
}: FooterVariant5Props) {
  return (
    <EditableSection id={id} as="section" className="py-32 bg-background font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start text-foreground">
              <Hexagon className="h-8 w-8" />
              <Editable
                id={`${id}-brandName`}
                as="h2"
                defaultText={brandName}
                propName="brandName"
                className="text-xl font-semibold"
              />
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              <Editable
                id={`${id}-description`}
                as="span"
                defaultText={description}
                propName="description"
                inline
              />
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-foreground transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {defaultSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-foreground">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-foreground transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">
            <Editable
              id={`${id}-copyright`}
              as="span"
              defaultText={copyrightText}
              propName="copyrightText"
              inline
            />
          </p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {defaultLegalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-foreground transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </EditableSection>
  );
}
