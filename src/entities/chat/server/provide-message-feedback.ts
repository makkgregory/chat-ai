import { db } from "@/shared/db";
import { messageTable } from "@/shared/db/schema";
import { and, eq } from "drizzle-orm";

export interface ProvideMessageFeedbackParams {
  chatId: string;
  messageId: string;
  feedback: boolean;
}

export const provideMessageFeedback = async ({
  chatId,
  messageId,
  feedback,
}: ProvideMessageFeedbackParams) => {
  const [message] = await db
    .update(messageTable)
    .set({ feedback })
    .where(and(eq(messageTable.chatId, chatId), eq(messageTable.id, messageId)))
    .returning();

  return message;
};
