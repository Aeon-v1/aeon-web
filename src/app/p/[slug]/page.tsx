import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { BlockRenderer } from "@/components/BlockRenderer";
import { EditorProvider } from "@/components/EditorProvider";
import { AuthProvider } from "@/components/AuthProvider";

interface PageProps {
  params: { slug: string };
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
