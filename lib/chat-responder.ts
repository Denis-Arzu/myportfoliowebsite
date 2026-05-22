import {
  knowledgeTopics,
  CHAT_FALLBACK,
  type KnowledgeTopic,
} from "./dentrix-knowledge";

const GREETING_PATTERNS = /^(hi|hello|hey|yo|good morning|good afternoon|good evening|sup)\b/i;

function scoreTopic(message: string, topic: KnowledgeTopic): number {
  const lower = message.toLowerCase();
  let score = 0;
  for (const keyword of topic.keywords) {
    if (lower.includes(keyword.toLowerCase())) {
      score += keyword.split(/\s+/).length * 2;
    }
  }
  return score;
}

export function getKnowledgeResponse(message: string, historyContext?: string): string {
  const trimmed = message.trim();
  if (!trimmed) return CHAT_FALLBACK;

  // Use history context to disambiguate follow-up questions
  // e.g., "what about the monthly cost?" after a pricing discussion
  const scoringInput = historyContext
    ? `${historyContext}\n${trimmed}`
    : trimmed;

  if (GREETING_PATTERNS.test(trimmed) && trimmed.length < 40) {
    return "Hello! I can explain what Dentrix Apps does, how our real estate chatbots work, or how the proof-before-pay preview works. What would you like to know?";
  }

  let best: KnowledgeTopic | null = null;
  let bestScore = 0;

  for (const topic of knowledgeTopics) {
    const score = scoreTopic(scoringInput, topic);
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  if (best && bestScore > 0) {
    return best.answer;
  }

  return CHAT_FALLBACK;
}
