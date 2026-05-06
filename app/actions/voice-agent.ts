"use server";

/**
 * GENERATE SECURE CONVERSATION TOKEN
 * Required for agents with authentication enabled.
 * Uses WebRTC for the lowest latency possible.
 */
export async function getConversationToken() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_4001kqw0pj09f788pg9n9xcmtmwt";
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    console.error("ELEVENLABS_API_KEY is missing. Auth-enabled agents require an API key.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to get conversation token.");
    }

    const data = await response.json();
    return data.token as string;
  } catch (error) {
    console.error("Voice Agent Token Error:", error);
    throw new Error("Could not authorize voice studio session.");
  }
}
