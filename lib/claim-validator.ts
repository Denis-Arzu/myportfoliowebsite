export type SourceDoc = {
  id?: string;
  title?: string;
  text: string;
  source?: string;
};

const STOPWORDS = new Set([
  "the",
  "and",
  "or",
  "a",
  "an",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "by",
  "is",
  "are",
  "was",
  "were",
  "be",
  "it",
  "this",
  "that",
]);

function stem(t: string): string {
  return t.slice(0, 4);
}

function tokenize(s: string, stemmed = false) {
  const tokens = s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t) && t.length > 1);
  return stemmed ? tokens.map((t) => stem(t)) : tokens;
}

export type ValidationResult = {
  confidence: "high" | "medium" | "low";
  supportingSources: { source?: string; title?: string; snippet?: string }[];
  score: number;
  details: { sentence: string; supported: boolean; matches: string[] }[];
  sourceType: "kb" | "llm";
};

const KB_TOPIC_IDS = new Set([
  "what-is-dentrixapps",
  "how-it-works",
  "pricing",
  "salon-benefits",
  "gym-benefits",
  "dental-benefits",
  "lead-capture",
  "demo",
  "setup-time",
  "no-website",
  "cancel",
  "industries",
]);

export function validateClaims(
  response: string,
  sources: SourceDoc[] = [],
): ValidationResult {
  const sentences = response
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (!sentences.length) {
    return { confidence: "low", supportingSources: [], score: 0, details: [], sourceType: "llm" };
  }

  // Detect if this response is sourced from KB topics
  const isKBSourced = sources.some((s) => s.title && KB_TOPIC_IDS.has(s.title));

  const sourceText = sources.map((s) => s.text.toLowerCase()).join(" \n\n");
  const srcTokens = new Set(tokenize(sourceText, true));

  const details = sentences.map((sentence) => {
    const toks = tokenize(sentence, true);
    const matches = toks.filter((t) => srcTokens.has(t));
    const supported =
      matches.length >= Math.min(2, Math.max(1, Math.floor(toks.length / 3)));
    return { sentence, supported, matches };
  });

  const supportedCount = details.filter((d) => d.supported).length;
  const score = supportedCount / details.length;

  // Two-tier confidence:
  // 1. KB-sourced answers start at medium minimum (they came from validated knowledge)
  // 2. LLM-generated answers use standard token-overlap scoring
  let confidence: "high" | "medium" | "low" = "low";
  if (isKBSourced) {
    // KB answers get a floor of medium confidence to avoid embarrassing false "low" ratings
    if (score >= 0.5) confidence = "high";
    else if (score >= 0.1) confidence = "medium";
    else confidence = "medium"; // KB source always at least medium
  } else {
    if (score >= 0.5) confidence = "high";
    else if (score >= 0.2) confidence = "medium";
  }

  // Pick top sources that contain most matched tokens
  const srcScores = sources.map((s) => {
    const toks = new Set(tokenize(s.text, true));
    let matched = 0;
    for (const d of details) {
      for (const m of d.matches) if (toks.has(m)) matched++;
    }
    return { s, matched };
  });

  srcScores.sort((a, b) => b.matched - a.matched);

  const supportingSources = srcScores
    .filter((r) => r.matched > 0)
    .slice(0, 3)
    .map((r) => {
      // try to extract a short evidence snippet from the source text
      const sentences = String(r.s?.text || "")
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      let best = "";
      let bestScore = -1;
      const globalTokens = new Set(tokenize(response || "", true));
      for (const s of sentences) {
        const toks = tokenize(s, true);
        let matched = 0;
        for (const t of toks) if (globalTokens.has(t)) matched++;
        if (matched > bestScore) {
          bestScore = matched;
          best = s;
        }
      }
      const snippet = best.length > 240 ? best.slice(0, 237) + "..." : best;
      return { source: r.s?.source, title: r.s?.title, snippet };
    });

  return {
    confidence,
    supportingSources,
    score,
    details,
    sourceType: isKBSourced ? "kb" : "llm",
  };
}