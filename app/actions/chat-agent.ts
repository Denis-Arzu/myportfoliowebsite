"use server";

import { getKnowledgeResponse } from "@/lib/chat-responder";
import { validateClaims, type SourceDoc } from "@/lib/claim-validator";
import { groqChat, type GroqMessage } from "@/lib/groq-client";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  meta?: {
    confidence?: "high" | "medium" | "low";
    sources?: { title?: string; source?: string; snippet?: string }[];
    model?: string;
  };
};

export type ChatReply = {
  reply: string;
  confidence: "high" | "medium" | "low";
  sources?: { title?: string; source?: string; snippet?: string }[];
  model?: string;
};

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = [],
): Promise<ChatReply> {
  const trimmed = message.trim().slice(0, 2000);
  if (!trimmed) {
    return {
      reply: "Please type a question and I'll do my best to help.",
      confidence: "low",
    };
  }

  const { DENTRIX_SYSTEM_CONTEXT, knowledgeTopics } =
    await import("@/lib/dentrix-knowledge");

  // Build KB context block injected into every Groq system prompt.
  // Structured so the model can cite specific answers without hallucinating.
  const kbBlock = knowledgeTopics
    .map((t) => `[${t.id}]: ${t.answer}`)
    .join("\n");

  const systemPrompt = `${DENTRIX_SYSTEM_CONTEXT}

KNOWLEDGE BASE (use only these facts — do not invent):
${kbBlock}

RULES:
- Answer in 2–4 short sentences unless more detail is clearly needed.
- If the question is outside the knowledge base, say so and direct the user to ceo@dentrixapps.com or the Contact page.
- Never fabricate pricing, timelines, or feature claims not listed above.
- Do not repeat the question back to the user.`;

  // Build conversation messages for Groq.
  // Keep last 8 turns (4 exchanges) to stay within token budget.
  const conversationMessages: GroqMessage[] = history
    .slice(-8)
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  conversationMessages.push({ role: "user", content: trimmed });

  const groqMessages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationMessages,
  ];

  // --- Primary: Groq LLM ---
  const groqResult = await groqChat(groqMessages, {
    temperature: 0.3,
    maxTokens: 400,
  });

  if (groqResult) {
    const kbDocs: SourceDoc[] = knowledgeTopics.map((t) => ({
      title: t.id,
      text: t.answer,
    }));
    const v = validateClaims(groqResult.text, kbDocs);
    return {
      reply: groqResult.text,
      confidence: v.confidence,
      sources: v.supportingSources,
      model: groqResult.model,
    };
  }

  // --- Fallback: local keyword KB (no key set or Groq errored) ---
  const kbReply = getKnowledgeResponse(trimmed);
  const kbDocs: SourceDoc[] = knowledgeTopics.map((t) => ({
    title: t.id,
    text: t.answer,
  }));
  const v = validateClaims(kbReply, kbDocs);
  return {
    reply: kbReply,
    confidence: v.confidence,
    sources: v.supportingSources,
  };
}
