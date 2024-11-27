import { db } from "@/shared/db";
import { chatTable } from "@/shared/db/schema";
import { desc } from "drizzle-orm";

export const listChats = async () => {
  return db.query.chatTable.findMany({
    orderBy: desc(chatTable.createDate),
  });
};
