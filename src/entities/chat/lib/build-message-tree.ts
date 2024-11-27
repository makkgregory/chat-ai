import { Message } from "@/shared/db/types";
import { compareAsc } from "date-fns";
import { MessageNode } from "../models/message-tree";

export const buildMessageTree = (messages: Message[]) => {
  const messageMap = new Map<string, MessageNode>();

  for (const message of messages) {
    messageMap.set(message.id, {
      id: message.id,
      parent: null,
      data: message,
      children: [],
    });
  }

  for (const node of messageMap.values()) {
    const children = node.data.children
      .map((id) => messageMap.get(id))
      .filter((child): child is MessageNode => !!child)
      .sort((a, b) => compareAsc(a.data.createDate, b.data.createDate));
    children.forEach((child) => {
      child.parent = node;
    });
    node.children.push(...children);
  }

  return Array.from(messageMap.values())
    .filter((node) => !node.parent)
    .sort((a, b) => compareAsc(a.data.createDate, b.data.createDate));
};
