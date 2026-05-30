"use client"
import Link from 'next/link'
import { Equal, X } from 'lucide-react'
import { Button } from '@/components/ui/liquid-glass-button'
import React from 'react'
import { cn } from '@/lib/utils' 
import { Editable, EditableButton, EditableSection } from "@/components/Editable";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface NavbarVariant3Props {
  id?: string;
  logoText?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  ctaText?: string;
}

export function NavbarVariant3({
  id = "navbar-3",
  logoText = "Dalim",
  link1 = "Products",
  link2 = "Designs",
  link3 = "Pricing",
  ctaText = "Get Started",
}: NavbarVariant3Props) {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <EditableSection stableId="NavbarVariant3-1" id={id} as="header" className="sticky top-0 z-50 w-full">
            <nav
                data-state={menuState && 'active'}
                className="w-full px-2 bg-background/90 backdrop-blur-md border-b border-border">
                <div className={cn('mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'max-w-4xl lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 py-2">
                        <div className="flex w-full justify-between lg:w-auto">
                            <div
                                className="flex gap-2 items-center cursor-pointer">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 392.02 324.6"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="#fff200"
                                        d="M268.08,0c-27.4,0-51.41,4.43-72.07,13.26C175.36,4.43,151.35,0,123.95,0H0v324.6h123.95c27.37,0,51.38-4.58,72.07-13.7,20.69,9.12,44.7,13.7,72.07,13.7h123.95V0h-123.95ZM324.09,268.36h-47.91c-20.25,0-37.3-4.05-51.18-12.15-12.28-7.17-21.94-17.41-28.99-30.7h0s0,0,0,0c0,0,0,0,0,0h0c-7.05,13.29-16.71,23.53-28.99,30.7-13.87,8.1-30.93,12.15-51.18,12.15h-47.91V56.24h47.91c19.8,0,36.67,4.01,50.61,12.04,12.51,7.2,22.35,17.47,29.55,30.77h0s0,0,0,0c0,0,0,0,0,0h0c7.2-13.3,17.04-23.57,29.55-30.77,13.95-8.02,30.82-12.04,50.61-12.04h47.91v212.13Z"></path>
                                </svg>
                                <Editable stableId="NavbarVariant3-2" id={`${id}-logo`} as="p" defaultText={logoText} propName="logoText" className='font-semibold text-xl tracking-tighter text-foreground' inline />  
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-foreground">
                                <Equal className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                <li><Editable stableId="NavbarVariant3-3" id={`${id}-link1`} as="span" defaultText={link1} propName="link1" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                                <li><Editable stableId="NavbarVariant3-4" id={`${id}-link2`} as="span" defaultText={link2} propName="link2" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                                <li><Editable stableId="NavbarVariant3-5" id={`${id}-link3`} as="span" defaultText={link3} propName="link3" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    <li><Editable stableId="NavbarVariant3-6" id={`${id}-mobile-link1`} as="span" defaultText={link1} propName="link1" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                                    <li><Editable stableId="NavbarVariant3-7" id={`${id}-mobile-link2`} as="span" defaultText={link2} propName="link2" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                                    <li><Editable stableId="NavbarVariant3-8" id={`${id}-mobile-link3`} as="span" defaultText={link3} propName="link3" className="text-muted-foreground hover:text-foreground block duration-150 cursor-pointer" inline /></li>
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">
                                  
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'cursor-pointer')}>
                                    <span className="text-foreground border-border">Login</span>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'cursor-pointer')}>
                                    <span className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</span>
                                </Button>
                                <ThemeToggle />
                                <EditableButton stableId="NavbarVariant3-9"
                                    id={`${id}-cta`}
                                    as={Button}
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90')}
                                >
                                    <Editable stableId="NavbarVariant3-10" id={`${id}-cta-text`} as="span" defaultText={ctaText} propName="ctaText" inline />
                                </EditableButton>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </EditableSection>
    )
}
