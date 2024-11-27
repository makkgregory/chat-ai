import { db } from "@/shared/db";
import { messageTable } from "@/shared/db/schema";
import { asc, eq } from "drizzle-orm";

export interface GetMessagesParams {
  limit?: number;
}

export const getMessages = (
  chatId: string,
  { limit = 100 }: GetMessagesParams = {},
) => {
  return db.query.messageTable.findMany({
    where: eq(messageTable.chatId, chatId),
    orderBy: asc(messageTable.createDate),
    limit,
  });
};
