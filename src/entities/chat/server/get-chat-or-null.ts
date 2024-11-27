import { db } from "@/shared/db";
import { chatTable } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export const getChatOrNull = async (chatId: string) => {
  const chat = await db.query.chatTable.findFirst({
    where: eq(chatTable.id, chatId),
  });
  return chat ?? null;
};
