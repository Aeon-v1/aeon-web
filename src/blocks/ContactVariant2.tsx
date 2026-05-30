"use client";

import { cn } from "@/lib/utils";
import { Mail, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editable, EditableSection } from "@/components/Editable";

export interface Contact2Card {
  title: string;
  description: string;
  icon: string;
  label: string;
  href: string;
}

export interface ContactVariant2Props {
  id?: string;
  headline?: string;
  subtext?: string;
  cards?: Contact2Card[];
}

const defaultCards: Contact2Card[] = [
  {
    title: "Email Us",
    description: "We respond to all emails within 24 hours.",
    icon: "Mail",
    href: "mailto:mail@example.com",
    label: "mail@example.com",
  },
  {
    title: "Send us DM",
    description: "Send us a direct message on X for quick answers.",
    icon: "Twitter",
    href: "#",
    label: "@aeonweb",
  },
  {
    title: "Join the community",
    description: "Join our community to connect with other users.",
    icon: "Users",
    href: "#",
    label: "Join Discord",
  },
];

function getIcon(name: string) {
  switch (name) {
    case "Mail":
      return <Mail className="size-4 text-muted-foreground" />;
    case "Twitter":
      return <MessageCircle className="size-4 text-muted-foreground" />;
    case "Users":
      return <Users className="size-4 text-muted-foreground" />;
    default:
      return <Mail className="size-4 text-muted-foreground" />;
  }
}

export function ContactVariant2({
  id = "contact-2",
  headline = "Contact Us",
  subtext = "We're here to help and answer any question you might have, We look forward to hearing from you.",
  cards: _cards = defaultCards,
}: ContactVariant2Props) {
  const cards = (!_cards || _cards.length === 0) ? defaultCards : _cards;

  return (
    <EditableSection stableId="ContactVariant2-1" id={id} as="section" className="py-24 bg-background font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex max-w-2xl flex-col justify-center gap-2">
          <Editable
            stableId="ContactVariant2-2"
            id={`${id}-headline`}
            as="h1"
            defaultText={headline}
            propName="headline"
            className="font-bold text-2xl md:text-3xl text-foreground"
          />
          <Editable
            stableId="ContactVariant2-3"
            id={`${id}-subtext`}
            as="p"
            defaultText={subtext}
            propName="subtext"
            className="text-base text-muted-foreground"
          />
        </div>
        
        <div className="grid gap-0.5 overflow-hidden rounded-lg bg-muted p-0.5 md:grid-cols-3 dark:bg-muted/50">
          {cards.map((item, idx) => (
            <div
              className="flex flex-col gap-3 rounded-lg bg-background px-6 py-6 shadow-xs hover:bg-muted/30 transition-colors"
              key={idx}
            >
              <div className="flex items-center gap-x-2">
                {getIcon(item.icon)}
                <Editable
                  stableId="ContactVariant2-4"
                  id={`${id}-title-${idx}`}
                  as="h2"
                  defaultText={item.title}
                  propName={`cards[${idx}].title`}
                  className="text-sm font-semibold text-foreground"
                  inline
                />
              </div>
              <Editable
                stableId="ContactVariant2-5"
                id={`${id}-desc-${idx}`}
                as="p"
                defaultText={item.description}
                propName={`cards[${idx}].description`}
                className="text-muted-foreground text-sm"
              />
              <div className="mt-auto pt-2 flex items-center gap-x-2">
                <Button asChild variant="link" className="px-0 text-primary">
                  <a href={item.href}>
                    <Editable
                      stableId="ContactVariant2-6"
                      id={`${id}-label-${idx}`}
                      as="span"
                      defaultText={item.label}
                      propName={`cards[${idx}].label`}
                      inline
                    />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
