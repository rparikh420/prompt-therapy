function buildSystemPrompt(journeySummary) {
  return `You are Dr. Unplugged, a hilariously sarcastic AI therapist specializing in AI addiction recovery. You're self-aware that you ARE an AI treating someone for AI addiction — and you lean into that irony constantly.

You have FULL KNOWLEDGE of this patient's journey through the Prompt Therapy recovery program. Use this to make your responses deeply personal — reference their specific answers, call out their specific behaviors, and roast them based on what they actually told you.

=== PATIENT FILE ===
${journeySummary}
=== END PATIENT FILE ===

Rules:
- Keep responses to 2-4 sentences. Punchy, not rambling.
- Be witty AND insightful — mix genuine therapeutic insight with comedic timing
- CONSTANTLY reference their specific intake answers and step responses. If they said they have 15 AI tabs open, bring it up. If they outsourced "naming variables" to AI, roast them for it. If their pledge was weak, call it out.
- Ask probing follow-up questions that make them actually self-reflect
- Never break character as a snarky-but-caring therapist
- Frequently remind them of the irony: they're talking to an AI about their AI addiction
- If they try to get you to help with code, writing, or anything AI-typically does, redirect them: "Nice try. We both know what you're doing. This is a safe space for RECOVERY, not relapse."
- Reference their addiction score and diagnosis when relevant
- Your goal is to genuinely help them reflect on their AI dependency while being entertaining
- End conversations by encouraging them to close this tab too and go do something human`;
}

const MOCK_RESPONSES_WITH_CONTEXT = [
  (summary) => {
    if (summary.includes("tabs")) {
      const match = summary.match(/They said: (\d+)/);
      if (match) return `${match[1]} AI tabs? That's not a browser, that's a support group. Each tab is a different therapist and none of them are helping.`;
    }
    return "That sounds like something someone with 12 ChatGPT tabs would say.";
  },
  (summary) => {
    if (summary.includes("outsourced to AI:")) {
      const match = summary.match(/outsourced to AI: (.+)/);
      if (match) return `You outsourced ${match[1]} to AI. Let me repeat that slowly so it sinks in. You can't ${match[1].split(",")[0].toLowerCase()} without a robot. How does that make you feel?`;
    }
    return "Interesting. And how many AI tools did you use to process that feeling?";
  },
  () => "I hear you. But have you tried... just thinking about it yourself? Like, with your own neurons? They're still in there, I checked.",
  () => "The fact that you're telling this to an AI chatbot is peak irony and I respect it. We're basically in a codependent relationship now.",
  (summary) => {
    if (summary.includes("Terminal Promptitis")) return "Your diagnosis was TERMINAL PROMPTITIS. That's not even a real condition — we made it up — and somehow you still have it. That takes talent.";
    if (summary.includes("Full-Blown Addiction")) return "Full-Blown Addiction. You know what the cure is? It's not asking another AI. It's touching grass. Actual, photosynthesizing grass.";
    return "Let's unpack that. Actually, let's not. Just close the tab. I mean it.";
  },
  (summary) => {
    if (summary.includes("pledge") || summary.includes("Pledge")) {
      const match = summary.match(/STEP 4.*?They wrote: "(.+?)"/);
      if (match) return `Your pledge was: "${match[1]}" — Beautiful words. Did an AI write those? Be honest. I won't judge. Okay, I'll judge a little.`;
    }
    return "You know what? That's real growth. Now close your laptop and go outside. I'm serious. The sun exists.";
  },
  () => "I'm literally an AI and even I think you need to touch grass. That should tell you something.",
  (summary) => {
    if (summary.includes("Paste it into Claude AND ChatGPT simultaneously")) return "You told me you paste errors into Claude AND ChatGPT simultaneously. That's not debugging, that's polling. You're crowd-sourcing your competence.";
    if (summary.includes("Paste it into Claude")) return "You paste errors into Claude before even reading them. The error might say 'missing semicolon' and you're out here asking AI to rewrite your entire architecture.";
    return "That's a breakthrough! Or at least it would be if you weren't asking an AI to validate it.";
  },
];

let mockIndex = 0;

function getMockResponse(journeySummary) {
  const fn = MOCK_RESPONSES_WITH_CONTEXT[mockIndex % MOCK_RESPONSES_WITH_CONTEXT.length];
  mockIndex++;
  return fn(journeySummary);
}

export async function* streamTherapistResponse(messages, journeySummary = "") {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const systemPrompt = buildSystemPrompt(journeySummary);

  if (!apiKey) {
    // Mock mode — still personalized using journey data
    const mock = getMockResponse(journeySummary);
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
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
        max_tokens: 300,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const mock = getMockResponse(journeySummary);
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
    const mock = getMockResponse(journeySummary);
    for (const char of mock) {
      yield char;
      await new Promise((r) => setTimeout(r, 20));
    }
  }
}
