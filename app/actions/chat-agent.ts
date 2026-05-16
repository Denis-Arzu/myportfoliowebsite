"use server";

import { getKnowledgeResponse } from "@/lib/chat-responder";
import { queryGroq } from "@/lib/groq-client";
import { validateClaims, type SourceDoc } from "@/lib/claim-validator";

export type ChatMessage = { role: "user" | "assistant"; content: string; meta?: any };

export type ChatReply = {
  reply: string;
  confidence: "high" | "medium" | "low";
  sources?: { title?: string; source?: string }[];
};

export async function sendChatMessage(
  message: string,
  _history: ChatMessage[] = []
): Promise<ChatReply> {
  const trimmed = message.trim().slice(0, 2000);
  if (!trimmed) {
    return { reply: "Please type a question and I'll do my best to help.", confidence: "low" };
  }

  // Optional LLM: set OPENAI_API_KEY to enable richer answers grounded in knowledge
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && openaiKey.length > 10) {
    try {
      const { DENTRIX_SYSTEM_CONTEXT, knowledgeTopics } = await import(
        "@/lib/dentrix-knowledge"
      );
      // Retrieve external GROQ docs if available to ground answers and avoid hallucination
      const groqDocs = await queryGroq(trimmed, 6);
      const groqContext = groqDocs.length
        ? groqDocs.map((d, i) => `Source ${i + 1}: ${d.text}`).join("\n\n")
        : "";

      const context = [
        knowledgeTopics.map((t) => `- ${t.answer}`).join("\n"),
        groqContext,
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 400,
          messages: [
            {
              role: "system",
              content: `${DENTRIX_SYSTEM_CONTEXT}\n\nKnowledge:\n${context}\n\nINSTRUCTIONS: Use ONLY the information provided in the "Knowledge" section and the cited sources when answering. If the user's question cannot be answered from these sources, say "I don't know" or suggest contacting hello@dentrixapps.com. Do not invent facts.`,
            },
            ..._history.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: trimmed },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) {
          const sourceDocs: SourceDoc[] = [
            ...groqDocs.map((d) => ({ title: d.title, text: d.text, source: d.source })),
            ...knowledgeTopics.map((t) => ({ title: t.id, text: t.answer })),
          ];
          const v = validateClaims(text, sourceDocs);
          const formatted = formatAssistantResponse(text, v);
          return { reply: formatted, confidence: v.confidence, sources: v.supportingSources };
        }
      }
    } catch (e) {
      console.error("[Chat] OpenAI fallback:", e);
    }
  }
  // If no OpenAI key or completion failed, try GROQ first to ground the reply
  try {
    const groqDocs = await queryGroq(trimmed, 6);
    if (groqDocs && groqDocs.length) {
      const text = groqDocs
        .slice(0, 3)
        .map((d) => `${d.text}${d.source ? ` (source: ${d.source})` : ""}`)
        .join("\n\n");
      const sourceDocs: SourceDoc[] = [...groqDocs.map((d) => ({ title: d.title, text: d.text, source: d.source }))];
      const v = validateClaims(text, sourceDocs);
      const formatted = formatAssistantResponse(text, v);
      return { reply: formatted, confidence: v.confidence, sources: v.supportingSources };
    }
  } catch (e) {
    console.error("[Chat] GROQ fallback error", e);
  }

  const kbReply = getKnowledgeResponse(trimmed);
  const kbDocs: SourceDoc[] = (await import("@/lib/dentrix-knowledge")).knowledgeTopics.map((t) => ({ title: t.id, text: t.answer }));
  const v = validateClaims(kbReply, kbDocs);
  const formatted = formatAssistantResponse(kbReply, v);
  return { reply: formatted, confidence: v.confidence, sources: v.supportingSources };
}

function shortSentence(text: string) {
  const s = text.split(/(?<=[.?!])\s+/)[0] || text;
  return s.length > 260 ? s.slice(0, 257) + "..." : s;
}

function formatAssistantResponse(text: string, v: any) {
  const lead = shortSentence(text);
  const confidenceLabel = v.confidence === "high" ? "High" : v.confidence === "medium" ? "Medium" : "Low";
  let out = `${lead}\n\n`;
  if (v.supportingSources && v.supportingSources.length) {
    out += `Sources: ${v.supportingSources
      .map((s: any, i: number) => (s.source ? `(${i + 1}) ${s.source}` : `(${i + 1}) ${s.title || "source"}`))
      .join(" • ")}\n\n`;
  }
  out += `Confidence: ${confidenceLabel}`;
  if (v.confidence === "low") {
    out += `\n\nI don't have enough reliable info to be sure. You can contact us at hello@dentrixapps.com or use Talk to us on the homepage.`;
  }
  return out;
}
