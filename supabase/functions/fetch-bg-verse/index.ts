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
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

function stripHeading(text: string, heading: string): string {
  const lc = text.toLowerCase();
  const headingLc = heading.toLowerCase();
  if (lc.startsWith(headingLc)) {
    return text.substring(heading.length).trim();
  }
  return text;
}

function extractSection(html: string, className: string): string {
  const startIdx = html.indexOf(`class="${className}"`);
  if (startIdx === -1) return '';

  const afterStart = html.indexOf('>', startIdx);
  if (afterStart === -1) return '';

  let depth = 1;
  let pos = afterStart + 1;
  let endIdx = -1;

  while (pos < html.length && depth > 0) {
    const openTag = html.indexOf('<div', pos);
    const closeTag = html.indexOf('</div>', pos);

    if (closeTag === -1) break;
    if (openTag !== -1 && openTag < closeTag) {
      depth++;
      pos = openTag + 4;
    } else {
      depth--;
      if (depth === 0) {
        endIdx = closeTag;
        break;
      }
      pos = closeTag + 6;
    }
  }

  if (endIdx === -1) return '';

  const inner = html.substring(afterStart + 1, endIdx);

  const contentDivs = inner.match(/<div[^>]*class="[^"]*em-mb-4[^"]*"[^>]*>([\s\S]*?)<\/div>/gis);
  if (contentDivs && contentDivs.length > 0) {
    let result = '';
    for (const div of contentDivs) {
      const cleaned = cleanHtml(div);
      if (cleaned.length > 10) {
        result += cleaned + ' ';
      }
    }
    if (result.trim().length > 0) {
      return result.trim();
    }
  }

  const paragraphs = inner.match(/<p[^>]*>([\s\S]*?)<\/p>/gis);
  if (paragraphs && paragraphs.length > 0) {
    let result = '';
    for (const p of paragraphs) {
      const cleaned = cleanHtml(p);
      if (cleaned.length > 10) {
        result += cleaned + ' ';
      }
    }
    if (result.trim().length > 0) {
      return result.trim();
    }
  }

  const emMatch = inner.match(/<em>([\s\S]*?)<\/em>/i);
  if (emMatch) {
    return cleanHtml(emMatch[1]);
  }

  return cleanHtml(inner);
}

async function fetchVerse(chapter: number, verse: number): Promise<VerseData> {
  const url = `https://vedabase.io/en/library/bg/${chapter}/${verse}/`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; BoltApp/1.0)',
      'Accept': 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch verse: ${response.status}`);
  }

  const html = await response.text();

  let sanskrit = extractSection(html, 'av-verse_text');
  sanskrit = stripHeading(sanskrit, 'Verse text');

  let translation = extractSection(html, 'av-translation');
  translation = stripHeading(translation, 'Translation');

  let purport = extractSection(html, 'av-purport');
  purport = stripHeading(purport, 'Purport');

  if (purport.length > 600) {
    purport = purport.substring(0, 600);
    const lastSpace = purport.lastIndexOf(' ');
    if (lastSpace > 500) {
      purport = purport.substring(0, lastSpace) + '...';
    } else {
      purport = purport + '...';
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

    try {
      const verseData = await fetchVerse(chapter, verse);

      return new Response(
        JSON.stringify(verseData),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch {
      return new Response(
        JSON.stringify({
          chapter,
          verse,
          sanskrit: `Chapter ${chapter}, Verse ${verse}`,
          translation: `Verse ${chapter}.${verse} from the Bhagavad-gītā. Visit the source link below for the full text.`,
          purport: `This verse from Chapter ${chapter} of the Bhagavad-gītā contains profound spiritual wisdom. Please visit Vedabase.io for the complete translation and commentary.`,
          url: `https://vedabase.io/en/library/bg/${chapter}/${verse}/`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
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
