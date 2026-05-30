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

  const scoringInput = historyContext
    ? `${historyContext}\n${trimmed}`
    : trimmed;

  if (GREETING_PATTERNS.test(trimmed) && trimmed.length < 40) {
    return "Hello! I can tell you about DentrixApps - we build AI chatbot assistants for salons, gyms, and dental practices. Want to know how it works or see a live demo?";
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
