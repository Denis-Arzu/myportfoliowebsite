export type GroqDoc = {
  id?: string;
  title?: string;
  text: string;
  source?: string;
};

export async function queryGroq(query: string, topK = 5): Promise<GroqDoc[]> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return [];

  const base = process.env.GROQ_API_URL || "https://api.groq.ai/v1";
  const url = `${base}/search`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        query,
        top_k: topK,
      }),
    });

    if (!res.ok) {
      console.warn("[GROQ] non-ok response", res.status);
      return [];
    }

    const data = await res.json();
    // Attempt to normalize common response shapes
    const hits = data.hits || data.items || data.results || [];

    const docs: GroqDoc[] = hits
      .slice(0, topK)
      .map((h: any) => ({
        id: h.id || h._id || h.document?.id,
        title: h.title || h.name || h.document?.title,
        text: (h.text || h.snippet || h.document?.text || h.document?.body || "").toString(),
        source: h.source || h.document?.source || h.document?.url,
      }))
      .filter((d: GroqDoc) => d.text && d.text.length > 0);

    return docs;
  } catch (e) {
    console.error("[GROQ] query error", e);
    return [];
  }
}
