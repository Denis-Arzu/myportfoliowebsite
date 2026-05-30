"use server";

import { getKnowledgeResponse } from "@/lib/chat-responder";
import { validateClaims, type SourceDoc } from "@/lib/claim-validator";
import { openrouterChat, type ORMessage } from "@/lib/openrouter-client";
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
      reply: "Hey! What can I help you with?",
      confidence: "high",
    };
  }

  const { DENTRIX_SYSTEM_CONTEXT, knowledgeTopics } =
    await import("@/lib/dentrix-knowledge");

  // Build KB context block injected into every system prompt.
  const kbBlock = knowledgeTopics
    .map((t) => `[${t.id}]: ${t.answer}`)
    .join("\n");

  // Conversation stage detection
  const userMessageCount = history.filter((m) => m.role === "user").length;
  let stageHint = "";
  if (userMessageCount === 0) {
    stageHint =
      "STAGE: First message. Be warm and natural. Do not introduce yourself with a title - just be helpful. If their question is vague, ask a clarifying question about their business type.";
  } else if (userMessageCount <= 2) {
    stageHint =
      "STAGE: Early conversation. They are exploring. Answer their question well, then naturally mention the live demo or ask about their business so you can personalize the conversation.";
  } else if (userMessageCount <= 5) {
    stageHint =
      "STAGE: Engaged. They're interested. Be specific about benefits for their industry. Reference real use cases. Create gentle urgency without being pushy.";
  } else {
    stageHint =
      "STAGE: Deep conversation. They are seriously considering. Address any remaining objections. Push toward the demo link or contact form. Be direct: 'Want me to set you up with a free demo?'";
  }

  const systemPrompt = `${DENTRIX_SYSTEM_CONTEXT}

KNOWLEDGE BASE (your factual reference - use these facts, do not invent):
${kbBlock}

${stageHint}

RESPONSE STYLE:
- Sound like a real person texting a friend who asked for business advice
- Use contractions (you're, we've, don't, it's)
- Short sentences. Punchy. No corporate fluff.
- If they make a joke, acknowledge it naturally
- Match their formality level
- Never start with "Great question!" or "I'd be happy to help!" - just answer
- End with a question or CTA only when it feels natural, not forced`;

  // Build conversation - last 12 turns for better context
  const conversationMessages: ORMessage[] = history
    .slice(-12)
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  conversationMessages.push({ role: "user", content: trimmed });

  const orMessages: ORMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationMessages,
  ];

  // --- PRIMARY: OpenRouter (best reasoning) ---
  const orResult = await openrouterChat(orMessages, {
    temperature: 0.7,
    maxTokens: 800,
  });

  if (orResult) {
    const kbDocs: SourceDoc[] = knowledgeTopics.map((t) => ({
      title: t.id,
      text: t.answer,
    }));
    const v = validateClaims(orResult.text, kbDocs);
    return {
      reply: orResult.text,
      confidence: v.confidence,
      sources: v.supportingSources,
      model: orResult.model,
    };
  }

  // --- FALLBACK: Groq (free, good) ---
  const groqMessages: GroqMessage[] = orMessages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const groqResult = await groqChat(groqMessages, {
    temperature: 0.6,
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

  // --- EMERGENCY: Local keyword KB ---
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
