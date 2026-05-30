import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { BlockRenderer } from "@/components/BlockRenderer";
import { EditorProvider } from "@/components/EditorProvider";
import { AuthProvider } from "@/components/AuthProvider";

function hexToHsl(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}

function getThemeStyles(globalTheme: any) {
  let cssVars = '';
  if (globalTheme.headingFont) cssVars += `--font-heading: "${globalTheme.headingFont}", sans-serif;\n`;
  if (globalTheme.headingFontWeight) cssVars += `--font-heading-weight: ${globalTheme.headingFontWeight};\n`;
  if (globalTheme.headingLetterSpacing) cssVars += `--font-heading-letter-spacing: ${globalTheme.headingLetterSpacing};\n`;
  if (globalTheme.headingLineHeight) cssVars += `--font-heading-line-height: ${globalTheme.headingLineHeight};\n`;
  
  if (globalTheme.bodyFont) cssVars += `--font-body: "${globalTheme.bodyFont}", sans-serif;\n`;
  if (globalTheme.bodyFontWeight) cssVars += `--font-body-weight: ${globalTheme.bodyFontWeight};\n`;
  if (globalTheme.bodyLetterSpacing) cssVars += `--font-body-letter-spacing: ${globalTheme.bodyLetterSpacing};\n`;
  if (globalTheme.bodyLineHeight) cssVars += `--font-body-line-height: ${globalTheme.bodyLineHeight};\n`;

  if (globalTheme.primaryColor) {
    cssVars += `--primary: ${globalTheme.primaryColor};\n`;
    cssVars += `--hu-primary: ${hexToHsl(globalTheme.primaryColor)};\n`;
  }
  if (globalTheme.secondaryColor) {
    cssVars += `--secondary: ${globalTheme.secondaryColor};\n`;
    cssVars += `--hu-secondary: ${hexToHsl(globalTheme.secondaryColor)};\n`;
  }
  if (globalTheme.accentColor) {
    cssVars += `--accent: ${globalTheme.accentColor};\n`;
    cssVars += `--hu-accent: ${hexToHsl(globalTheme.accentColor)};\n`;
  }
  return `:root, .dark, .light { ${cssVars} }`;
}


interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sql = getDb();
  if (sql) {
    try {
      const results = await sql`SELECT pages_json FROM published_websites WHERE slug = ${slug}`;
      if (results.length > 0) {
        const pages = JSON.parse(results[0].pages_json);
        const homePage = pages[0];
        if (homePage && homePage.blocks) {
          // Try to extract the business name from the Navbar logoText
          const navbar = homePage.blocks.find((b: any) => b.type && b.type.startsWith("Navbar"));
          const title = navbar?.props?.logoText || homePage.name || "Website";
          return { title };
        }
      }
    } catch (e) {
      // Ignore DB errors during metadata generation
    }
  }
  return { title: "Published Site" };
}

export default async function PublishedPage({ params }: PageProps) {
  const { slug } = await params;
  
  const sql = getDb();
  if (!sql) {
    return <div className="p-8 text-center text-red-500">Database not configured.</div>;
  }

  try {
    const results = await sql`
      SELECT pages_json, overrides_json, theme_json
      FROM published_websites
      WHERE slug = ${slug}
    `;

    if (results.length === 0) {
      notFound();
    }

    const pages = JSON.parse(results[0].pages_json);
    const overrides = JSON.parse(results[0].overrides_json);
    const theme = JSON.parse(results[0].theme_json);

    return (
      <AuthProvider>
        <EditorProvider 
          initialPages={pages} 
          initialOverrides={overrides} 
          initialTheme={theme}
          isPublished={true}
        >
          <div className="w-full min-h-screen bg-[#FDFDFC] dark:bg-[#1F1F1E]">
            <style dangerouslySetInnerHTML={{ __html: getThemeStyles(theme) }} />
            <BlockRenderer blocks={pages[0]?.blocks || []} />
          </div>
        </EditorProvider>
      </AuthProvider>
    );

  } catch (err: any) {
    console.error("Failed to load published page:", err);
    return <div className="p-8 text-center text-red-500">Error loading page.</div>;
  }
}
