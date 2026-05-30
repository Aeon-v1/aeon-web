"use client";

import * as React from "react";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";
import { Hexagon } from "lucide-react";
import { FaTwitter, FaGithub } from "react-icons/fa";

export interface FooterVariant2Props {
  id?: string;
  brandName?: string;
  copyrightText?: string;
  copyrightLicense?: string;
}

const socialLinks = [
  { icon: <FaTwitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaGithub className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
];

const mainLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function FooterVariant2({
  id = "footer-2",
  brandName = "Aeon",
  copyrightText = "© 2024 Aeon Corp",
  copyrightLicense = "All rights reserved",
}: FooterVariant2Props) {
  return (
    <EditableSection stableId="FooterVariant2-1" id={id} as="footer" className="pb-6 pt-16 lg:pb-8 lg:pt-24 bg-background font-sans">
      <div className="px-4 lg:px-8 mx-auto max-w-7xl">
        <div className="md:flex md:items-start md:justify-between">
          <a href="#" className="flex items-center gap-x-2" aria-label={brandName}>
            <Hexagon className="h-10 w-10 text-foreground" />
            <Editable stableId="FooterVariant2-2"
              id={`${id}-brandName`}
              as="span"
              defaultText={brandName}
              propName="brandName"
              className="font-bold text-xl text-foreground"
              inline
            />
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a 
                  href={link.href} 
                  target="_blank" 
                  aria-label={link.label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>
              <Editable stableId="FooterVariant2-3" id={`${id}-copyright`} as="span" defaultText={copyrightText} propName="copyrightText" inline />
            </div>
            {copyrightLicense && (
              <div>
                <Editable stableId="FooterVariant2-4" id={`${id}-license`} as="span" defaultText={copyrightLicense} propName="copyrightLicense" inline />
              </div>
            )}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
