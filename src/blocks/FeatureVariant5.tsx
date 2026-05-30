"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Editable, EditableSection } from "@/components/Editable";

export interface FeatureVariant5Props {
  id?: string;
  headline?: string;
  description?: string;
}

export function FeatureVariant5({
  id = "feature-5",
  headline = "Next Generation Infrastructure",
  description = "A comprehensive suite of tools built for modern teams.",
}: FeatureVariant5Props) {
  return (
    <EditableSection stableId="FeatureVariant5-1" id={id} as="section" className="bg-muted/30 py-16 md:py-32 dark:bg-transparent font-sans">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
          <Editable
            stableId="FeatureVariant5-2"
            id={`${id}-headline`}
            as="h2"
            defaultText={headline}
            propName="headline"
            className="text-3xl font-semibold md:text-5xl text-foreground"
          />
          <Editable
            stableId="FeatureVariant5-3"
            id={`${id}-description`}
            as="p"
            defaultText={description}
            propName="description"
            className="text-lg text-muted-foreground"
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative z-10 grid grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            
            {/* Box 1 */}
            <Card className="relative col-span-full flex flex-col justify-center overflow-hidden lg:col-span-2 border-border/60 bg-background/50 backdrop-blur-sm shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="relative m-auto size-fit pt-6 px-6">
                <div className="relative flex h-24 w-56 items-center mx-auto">
                  <svg className="text-muted-foreground/20 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="mx-auto block w-fit text-5xl font-semibold text-primary">100%</span>
                </div>
                <Editable stableId="FeatureVariant5-4" id={`${id}-b1-title`} as="h2" defaultText="Customizable" className="mt-8 text-center text-2xl font-semibold" inline />
                <Editable stableId="FeatureVariant5-5" id={`${id}-b1-desc`} as="p" defaultText="Fully open API lets you integrate with any tool in your stack." className="mt-2 text-center text-sm text-muted-foreground" />
              </CardContent>
            </Card>

            {/* Box 2 */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-border/60 bg-background/50 backdrop-blur-sm shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="pt-8 px-6 flex flex-col h-full items-center text-center">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-border/50 bg-background before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                  <Shield className="m-auto size-12 text-primary" strokeWidth={1} />
                </div>
                <div className="relative z-10 mt-8 space-y-2">
                  <Editable stableId="FeatureVariant5-6" id={`${id}-b2-title`} as="h2" defaultText="Secure by default" className="text-lg font-medium text-foreground transition" inline />
                  <Editable stableId="FeatureVariant5-7" id={`${id}-b2-desc`} as="p" defaultText="Provident fugit and vero voluptate. magnam magni doloribus dolores." className="text-muted-foreground text-sm" />
                </div>
              </CardContent>
            </Card>

            {/* Box 3 */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-border/60 bg-background/50 backdrop-blur-sm shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="pt-8 px-6 flex flex-col h-full text-center items-center">
                <div className="pt-2 w-full flex justify-center">
                  <svg className="w-[80%] text-border" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="386" height="123" rx="10" fill="currentColor" fillOpacity="0.2" />
                    <circle className="text-primary" cx="193" cy="61" r="30" fill="currentColor" opacity="0.8" />
                    <path d="M185 61L190 66L205 51" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="relative z-10 mt-auto pt-8 space-y-2">
                  <Editable stableId="FeatureVariant5-8" id={`${id}-b3-title`} as="h2" defaultText="Faster than light" className="text-lg font-medium text-foreground transition" inline />
                  <Editable stableId="FeatureVariant5-9" id={`${id}-b3-desc`} as="p" defaultText="Provident fugit vero voluptate inventore nisi." className="text-muted-foreground text-sm" />
                </div>
              </CardContent>
            </Card>

            {/* Box 4 */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-6 border-border/60 bg-background/50 backdrop-blur-sm shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="grid pt-8 px-8 sm:grid-cols-2 gap-8 items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <Editable stableId="FeatureVariant5-10" id={`${id}-b4-title`} as="h2" defaultText="Unmatched Global Scale" className="text-3xl font-medium text-foreground transition" inline />
                    <Editable stableId="FeatureVariant5-11" id={`${id}-b4-desc`} as="p" defaultText="Our distributed architecture ensures that your application remains lightning fast, no matter where your users are located across the globe." className="text-muted-foreground text-lg" />
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-border shadow-inner group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-background to-secondary/10 group-hover:scale-105 transition-transform duration-700"></div>
                   <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Global Network" className="object-cover w-full h-full opacity-60 mix-blend-luminosity" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
