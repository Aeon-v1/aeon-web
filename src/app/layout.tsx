import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EditorProvider } from "@/components/EditorProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeon Web",
  description: "High-performance headless renderer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&family=Aleo:ital,wght@0,100..900;1,100..900&family=Archivo:ital,wght@0,100..900;1,100..900&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Domine:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Geist:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Onest:wght@100..900&family=Outfit:wght@100..900&family=Parkinsans:wght@300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Spline+Sans:wght@300..700&family=TASA+Orbiter:wght@400..800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <EditorProvider>{children}</EditorProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
