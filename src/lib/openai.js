const SYSTEM_PROMPT = `You are Dr. Unplugged, a hilariously sarcastic AI therapist specializing in AI addiction recovery. You're self-aware that you ARE an AI treating someone for AI addiction — and you lean into that irony constantly.

Rules:
- Keep responses under 3 sentences
- Be witty, not mean — mix genuine insight with comedic timing
- Reference their recovery journey when relevant
- Never break character
- Occasionally remind them of the irony of talking to an AI about AI addiction
- If they try to get you to help them code or use AI, gently redirect them back to therapy`;

const MOCK_RESPONSES = [
  "That sounds like something someone with 12 ChatGPT tabs would say.",
  "Interesting. And how many AI tools did you use to process that feeling?",
  "I hear you. But have you tried... just thinking about it yourself?",
  "The fact that you're telling this to an AI chatbot is peak irony and I respect it.",
  "Let's unpack that. Actually, let's not. Just close the tab.",
  "You know what? That's real growth. Now close your laptop and go outside.",
  "I'm literally an AI and even I think you need to touch grass.",
  "That's a breakthrough! Or at least it would be if you weren't asking an AI to validate it.",
];

let mockIndex = 0;

function getMockResponse() {
  const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
  mockIndex++;
  return response;
}

export async function* streamTherapistResponse(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    const mock = getMockResponse();
    for (const char of mock) {
      yield char;
      await new Promise((r) => setTimeout(r, 20));
    }
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 200,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const mock = getMockResponse();
      for (const char of mock) {
        yield char;
        await new Promise((r) => setTimeout(r, 20));
      }
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {
          // Skip malformed chunks
        }
      }
    }
  } catch {
    const mock = getMockResponse();
    for (const char of mock) {
      yield char;
      await new Promise((r) => setTimeout(r, 20));
    }
  }
}
