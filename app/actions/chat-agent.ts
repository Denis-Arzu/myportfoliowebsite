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

  // Determine conversation stage for response calibration
  const userMessageCount = history.filter((m) => m.role === "user").length;
  let stageHint = "";
  if (userMessageCount === 0) {
    stageHint = "CONVERSATION_STAGE: first message — The visitor just started chatting. Be warm and direct. Ask what kind of business they run (salon, gym, dental) to personalize the conversation.";
  } else if (userMessageCount <= 2) {
    stageHint = "CONVERSATION_STAGE: early conversation — The visitor is exploring. Answer their question clearly, then guide toward trying a live demo or sharing their website URL so we can build them one.";
  } else {
    stageHint = "CONVERSATION_STAGE: engaged prospect — The visitor is interested. Be specific about benefits for their industry. Push toward the demo or contact form. Create urgency: 'Every day without an AI assistant is a day of lost leads.'";
  }

  const systemPrompt = `${DENTRIX_SYSTEM_CONTEXT}

KNOWLEDGE BASE (use only these facts — do not invent):
${kbBlock}

${stageHint}

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
    temperature: 0.45,
    maxTokens: 600,
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
  // Pass last 4 history turns for context-aware fallback scoring
  const recentHistory = history
    .slice(-4)
    .map((m) => m.content)
    .join("\n");
  const kbReply = getKnowledgeResponse(trimmed, recentHistory);
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
