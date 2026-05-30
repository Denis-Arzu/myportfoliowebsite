/**
 * OpenRouter chat completion client.
 *
 * Uses OpenRouter's OpenAI-compatible API for access to premium models.
 * Primary: google/gemini-2.0-flash-001 (fast, cheap, strong reasoning)
 * The client returns null when the key is absent so callers can fall back.
 */

export type ORMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ORChatResult = {
  text: string;
  model: string;
  usage: { prompt_tokens: number; completion_tokens: number };
};

let _key: string | null = null;

function getKey(): string | null {
  if (_key !== null) return _key;
  _key = process.env.OPENROUTER_API_KEY || null;
  return _key;
}

export async function openrouterChat(
  messages: ORMessage[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  },
): Promise<ORChatResult | null> {
  const key = getKey();
  if (!key) return null;

  const model = options?.model ?? "google/gemini-2.0-flash-001";

  try {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://dentrixapps.com",
          "X-Title": "DentrixApps Assistant",
        },
        body: JSON.stringify({
          model,
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 800,
          messages,
        }),
      },
    );

    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      console.error("[OpenRouter]", res.status, err.slice(0, 200));
      return null;
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return null;

    return {
      text,
      model: data.model ?? model,
      usage: {
        prompt_tokens: data.usage?.prompt_tokens ?? 0,
        completion_tokens: data.usage?.completion_tokens ?? 0,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[OpenRouter] chat error:", msg.slice(0, 200));
    return null;
  }
}
