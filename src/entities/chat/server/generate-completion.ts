import { db } from "@/shared/db";
import { messageTable } from "@/shared/db/schema";
import { Message } from "@/shared/db/types";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import { createMessage } from "./create-message";
import { getAiProvider } from "./get-ai-provider";
import { getChatContext } from "./get-chat-context";
import { getSystemPrompt } from "./get-system-prompt";

export interface GenerateCompletionParams {
  chatId: string;
  prompt: string;
}

export type CompletionEvent =
  | CompletionMessageEvent
  | CompletionDeltaEvent
  | CompletionDoneEvent;

export interface CompletionMessageEvent {
  type: "message";
  message: Message;
}

export interface CompletionDeltaEvent {
  type: "delta";
  chatId: string;
  messageId: string;
  delta: string;
}

export interface CompletionDoneEvent {
  type: "done";
}

export async function* generateCompletion({
  chatId,
  prompt,
}: GenerateCompletionParams): AsyncGenerator<CompletionEvent> {
  const userMessage = await createMessage({
    chatId,
    role: "user",
    content: prompt,
  });

  const assistantMessage = await createMessage({
    chatId,
    role: "assistant",
    content: "",
  });

  const { textStream, text } = streamText({
    model: getAiProvider(),
    system: getSystemPrompt(),
    messages: await getChatContext(chatId),
  });

  yield { type: "message", message: userMessage };
  yield { type: "message", message: assistantMessage };

  for await (const delta of textStream) {
    yield {
      type: "delta",
      delta,
      chatId: assistantMessage.chatId,
      messageId: assistantMessage.id,
    };
  }

  await db
    .update(messageTable)
    .set({ content: await text })
    .where(eq(messageTable.id, assistantMessage.id));

  yield { type: "done" };
}
