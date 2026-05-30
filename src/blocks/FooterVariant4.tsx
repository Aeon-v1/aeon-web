"use client";

import * as React from "react";
import { Editable, EditableSection } from "@/components/Editable";
import { Globe, Share2, MessageCircle, Link as LinkIcon, Send, Feather } from "lucide-react";

export interface FooterVariant4Props {
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

export function FooterVariant4({
  id = "footer-4",
  copyrightText = "© 2024 Aeon Web, All rights reserved",
}: FooterVariant4Props) {
  return (
    <EditableSection stableId="FooterVariant4-1" id={id} as="footer" className="py-16 md:py-32 font-sans bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <a href="/" aria-label="go home" className="mx-auto block size-fit"></a>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
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
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Share">
            <Share2 className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Message">
            <MessageCircle className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Link">
            <LinkIcon className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Globe">
            <Globe className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Send">
            <Send className="size-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground block" aria-label="Feather">
            <Feather className="size-6" />
          </a>
        </div>
        
        <span className="text-muted-foreground block text-center text-sm">
          <Editable stableId="FooterVariant4-2"
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
