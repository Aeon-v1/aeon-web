"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Editable, EditableButton, EditableSection } from "@/components/Editable";

export interface CTAVariant5Props {
  id?: string;
  headline?: string;
  subtext?: string;
  buttonText?: string;
  placeholderText?: string;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function CTAVariant5({
  id = "cta-5",
  headline = "Lorem ipsum dolor sit amet!",
  subtext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  buttonText = "Submit",
  placeholderText = "Your email address",
}: CTAVariant5Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <EditableSection stableId="CTAVariant5-1" id={id} as="section" className="py-16 md:py-24 bg-background font-sans">
      <div className="mx-auto max-w-5xl p-6 sm:p-8 flex flex-col items-center gap-6 text-center">
        <Editable stableId="CTAVariant5-2"
          id={`${id}-headline`}
          as="h2"
          defaultText={headline}
          propName="headline"
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground !my-0"
        />
        <p className="text-lg opacity-70 md:text-2xl text-muted-foreground mt-4 text-balance">
          <Editable stableId="CTAVariant5-3"
            id={`${id}-subtext`}
            as="span"
            defaultText={subtext}
            propName="subtext"
            inline
          />
        </p>

        <Form {...form}>
          <form
            onSubmit={(e) => {
                e.preventDefault();
                // Avoid submitting during edit mode clicks
                if ((e.target as HTMLElement).closest('[data-editable]')) return;
                form.handleSubmit(onSubmit)(e);
            }}
            className="mt-8 flex w-full max-w-md flex-col sm:flex-row items-center justify-center gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="!mt-0 w-full h-11 bg-background text-foreground border-input placeholder:text-muted-foreground"
                      placeholder={placeholderText}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <EditableButton stableId="CTAVariant5-4"
              id={`${id}-submit-btn`}
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-11 px-8 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer w-full sm:w-auto"
            >
              <Editable stableId="CTAVariant5-5"
                id={`${id}-submit-btn-text`}
                as="span"
                defaultText={buttonText}
                propName="buttonText"
                inline
              />
            </EditableButton>
          </form>
        </Form>
      </div>
    </EditableSection>
  );
}
