import { db } from "@/shared/db";
import { messageTable } from "@/shared/db/schema";
import { MessageRole } from "@/shared/db/types";

export interface CreateMessageParams {
  chatId: string;
  role: MessageRole;
  content: string;
}

export const createMessage = async ({
  chatId,
  role,
  content,
}: CreateMessageParams) => {
  const [message] = await db
    .insert(messageTable)
    .values({ chatId, role, content })
    .returning();
  return message;
};
