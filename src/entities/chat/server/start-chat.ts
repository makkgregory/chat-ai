import { db } from "@/shared/db";
import { chatTable } from "@/shared/db/schema";
import { Chat } from "@/shared/db/types";
import { CompletionEvent, generateCompletion } from "./generate-completion";

export interface StartChatParams {
  prompt: string;
}

export type StartChatEvent = ChatEvent | CompletionEvent;

export interface ChatEvent {
  type: "chat";
  chat: Chat;
}

export async function* startChat({
  prompt,
}: StartChatParams): AsyncGenerator<StartChatEvent> {
  const [chat] = await db
    .insert(chatTable)
    .values({ title: prompt })
    .returning();

  yield { type: "chat", chat };

  const completion = await generateCompletion({ chatId: chat.id, prompt });

  for await (const event of completion) {
    yield event;
  }
}
