"use client";

import * as React from "react";
import { Editable, EditableSection } from "@/components/Editable";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export interface FooterVariant3Props {
  id?: string;
  copyrightText?: string;
}

const links = [
  { title: "Features", href: "#" },
  { title: "Solution", href: "#" },
  { title: "Customers", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Help", href: "#" },
  { title: "About", href: "#" },
];

export function FooterVariant3({
  id = "footer-3",
  copyrightText = "© 2024 Aeon Web, All rights reserved",
}: FooterVariant3Props) {
  return (
    <EditableSection id={id} as="footer" className="bg-muted py-16 font-sans">
      <div className="mx-auto max-w-5xl px-6">
        <a href="/" aria-label="go home" className="mx-auto block size-fit"></a>

        <div className="my-8 flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-foreground block duration-150"
            >
              <span>{link.title}</span>
            </a>
          ))}
        </div>
        
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Twitter">
            <FaTwitter className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="LinkedIn">
            <FaLinkedin className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Facebook">
            <FaFacebook className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Instagram">
            <FaInstagram className="size-6" />
          </a>
        </div>
        
        <span className="text-muted-foreground block text-center text-sm">
          <Editable
            id={`${id}-copyright`}
            as="span"
            defaultText={copyrightText}
            propName="copyrightText"
            inline
          />
        </span>
      </div>
    </EditableSection>
  );
}
