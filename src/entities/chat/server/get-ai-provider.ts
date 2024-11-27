import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const getAiProvider = () => {
  return anthropic("claude-3-5-haiku-latest");
};
