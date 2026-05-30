"use client";

import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Phone, Mail, MapPin } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface ContactInfo {
  title: string;
  value: string;
  icon: string;
}

export interface ContactVariant1Props {
  id?: string;
  headline?: string;
  contacts?: ContactInfo[];
}

const defaultContacts: ContactInfo[] = [
  {
    title: "Call Us Today!",
    value: "+1 (555) 123-4567",
    icon: "Phone",
  },
  {
    title: "Send an Email",
    value: "mail@example.com",
    icon: "Mail",
  },
  {
    title: "Visit Our Office",
    value: "100 Smith Street, VIC",
    icon: "MapPin",
  },
];

function getIcon(name: string) {
  switch (name) {
    case "Phone":
      return <Phone className="size-4 text-muted-foreground" />;
    case "Mail":
      return <Mail className="size-4 text-muted-foreground" />;
    case "MapPin":
      return <MapPin className="size-4 text-muted-foreground" />;
    default:
      return <Phone className="size-4 text-muted-foreground" />;
  }
}

export function ContactVariant1({
  id = "contact-1",
  headline = "Have Questions? Get in Touch!",
  contacts: _contacts = defaultContacts,
}: ContactVariant1Props) {
  const contacts = (!_contacts || _contacts.length === 0) ? defaultContacts : _contacts;

  return (
    <EditableSection stableId="ContactVariant1-1" id={id} as="section" className="py-24 bg-background font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Editable
          stableId="ContactVariant1-2"
          id={`${id}-headline`}
          as="h2"
          defaultText={headline}
          propName="headline"
          className="mb-6 font-medium text-lg md:text-2xl text-foreground text-center"
        />
        <div className="relative mt-12">
          <FullWidthDivider position="top" />
          <div className="grid gap-px overflow-hidden bg-border px-px md:grid-cols-3">
            {contacts.map((item, idx) => (
              <div
                className="flex items-center gap-3 bg-card text-card-foreground p-4 shadow-sm hover:bg-muted/30 transition-colors"
                key={idx}
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50"
                  )}
                >
                  {getIcon(item.icon)}
                </div>
                <div className="flex flex-col gap-y-0.5 w-full">
                  <Editable
                    stableId="ContactVariant1-3"
                    id={`${id}-title-${idx}`}
                    as="h2"
                    defaultText={item.title}
                    propName={`contacts[${idx}].title`}
                    className="text-sm font-semibold"
                  />
                  <Editable
                    stableId="ContactVariant1-4"
                    id={`${id}-value-${idx}`}
                    as="p"
                    defaultText={item.value}
                    propName={`contacts[${idx}].value`}
                    className="text-muted-foreground text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
          <FullWidthDivider position="bottom" />
        </div>
      </div>
    </EditableSection>
  );
}
