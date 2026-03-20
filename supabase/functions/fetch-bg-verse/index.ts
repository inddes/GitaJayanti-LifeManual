import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VerseData {
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
  purport: string;
  url: string;
}

function cleanHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|h[1-6])>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

function extractSection(html: string, className: string): string {
  const regex = new RegExp(`<div[^>]*class="[^"]*${className}[^"]*"[^>]*>(.*?)<\/div>`, 'is');
  const match = html.match(regex);
  if (match && match[1]) {
    return cleanHtml(match[1]);
  }
  return '';
}

async function fetchVerse(chapter: number, verse: number): Promise<VerseData> {
  const url = `https://vedabase.io/en/library/bg/${chapter}/${verse}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch verse: ${response.status}`);
    }

    const html = await response.text();

    let sanskrit = extractSection(html, 'verse');
    if (!sanskrit) {
      const versePattern = /<div[^>]*class="[^"]*verse[^"]*"[^>]*>\s*<p[^>]*>(.*?)<\/p>/is;
      const verseMatch = html.match(versePattern);
      if (verseMatch) {
        sanskrit = cleanHtml(verseMatch[1]);
      }
    }

    let translation = extractSection(html, 'translation');
    if (!translation) {
      const translationPattern = /<div[^>]*class="[^"]*translation[^"]*"[^>]*>\s*<p[^>]*>(.*?)<\/p>/is;
      const transMatch = html.match(translationPattern);
      if (transMatch) {
        translation = cleanHtml(transMatch[1]);
      }
    }

    let purport = '';
    const purportPattern = /<div[^>]*class="[^"]*purport[^"]*"[^>]*>(.*?)<\/div>/is;
    const purportMatch = html.match(purportPattern);
    if (purportMatch && purportMatch[1]) {
      const purportHtml = purportMatch[1];
      const paragraphs = purportHtml.match(/<p[^>]*>(.*?)<\/p>/gis);

      if (paragraphs && paragraphs.length > 0) {
        let fullPurport = '';
        for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
          const cleaned = cleanHtml(paragraphs[i]);
          if (cleaned.length > 20) {
            fullPurport += cleaned + ' ';
          }
        }
        purport = fullPurport.trim();

        if (purport.length > 600) {
          purport = purport.substring(0, 600);
          const lastSpace = purport.lastIndexOf(' ');
          if (lastSpace > 500) {
            purport = purport.substring(0, lastSpace) + '...';
          } else {
            purport = purport + '...';
          }
        }
      }
    }

    if (!sanskrit && !translation) {
      const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is);
      if (bodyMatch) {
        const textContent = cleanHtml(bodyMatch[1]);
        const lines = textContent.split('\n').filter(line => line.length > 30 && line.length < 300);

        if (lines.length >= 2) {
          sanskrit = lines[0];
          translation = lines[1];
        }
      }
    }

    if (!sanskrit) {
      sanskrit = `Chapter ${chapter}, Verse ${verse}`;
    }

    if (!translation) {
      translation = `Verse ${chapter}.${verse} from the Bhagavad-gītā. Visit the source link below for the full text.`;
    }

    if (!purport) {
      purport = `This verse from Chapter ${chapter} of the Bhagavad-gītā contains profound spiritual wisdom. Please visit Vedabase.io for the complete translation and commentary.`;
    }

    return {
      chapter,
      verse,
      sanskrit,
      translation,
      purport,
      url,
    };
  } catch (error) {
    console.error("Error fetching verse:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const chapter = parseInt(url.searchParams.get("chapter") || "2");
    const verse = parseInt(url.searchParams.get("verse") || "47");

    if (chapter < 1 || chapter > 18 || verse < 1 || verse > 78) {
      return new Response(
        JSON.stringify({ error: "Invalid chapter or verse number" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const verseData = await fetchVerse(chapter, verse);

    return new Response(
      JSON.stringify(verseData),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch verse",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
