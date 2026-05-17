/**
 * Groq chat completion client.
 *
 * Uses the official groq-sdk which wraps Groq's OpenAI-compatible API.
 * Model selection: llama-3.3-70b-versatile — best reasoning on free tier.
 * Fallback model: llama3-8b-8192 — faster, lower latency.
 *
 * Requires GROQ_API_KEY env var. Returns null silently when key is absent
 * so the caller can fall back to the local KB without crashing.
 */

import Groq from "groq-sdk";

export type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type GroqChatResult = {
  text: string;
  model: string;
  usage: { prompt_tokens: number; completion_tokens: number };
};

let _client: Groq | null = null;

function getClient(): Groq | null {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  if (!_client) _client = new Groq({ apiKey: key });
  return _client;
}

export async function groqChat(
  messages: GroqMessage[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  },
): Promise<GroqChatResult | null> {
  const client = getClient();
  if (!client) return null;

  const model =
    options?.model ??
    process.env.GROQ_MODEL ??
    "llama-3.3-70b-versatile";

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: options?.temperature ?? 0.35,
      max_tokens: options?.maxTokens ?? 512,
      messages,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) return null;

    return {
      text,
      model: completion.model,
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens ?? 0,
        completion_tokens: completion.usage?.completion_tokens ?? 0,
      },
    };
  } catch (err: unknown) {
    // Log enough context to debug without leaking the key
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Groq] chat error:", msg);
    return null;
  }
}
