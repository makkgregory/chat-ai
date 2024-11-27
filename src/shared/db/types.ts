import type { chatTable, messageTable } from "./schema";

export type Chat = typeof chatTable.$inferSelect;
export type Message = typeof messageTable.$inferSelect;
export type MessageRole = Message["role"];
