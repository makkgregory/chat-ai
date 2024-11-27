import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const chatTable = pgTable("chat", {
  id: uuid().defaultRandom().primaryKey(),
  createDate: timestamp("create_date").notNull().defaultNow(),
  updateDate: timestamp("update_date")
    .notNull()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
});

export const messageRole = pgEnum("role", ["user", "assistant"]);

export const messageTable = pgTable("message", {
  id: uuid().defaultRandom().primaryKey(),
  createDate: timestamp("create_date").notNull().defaultNow(),
  updateDate: timestamp("update_date")
    .notNull()
    .$onUpdate(() => new Date()),
  chatId: uuid("chat_id").notNull(),
  role: messageRole("role").notNull(),
  content: text("content").notNull(),
  children: uuid("children").array().notNull().default([]),
  feedback: boolean("feedback"),
});
