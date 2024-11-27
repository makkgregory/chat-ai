import { Message } from "@/shared/db/types";

export interface MessageNode {
  id: string;
  data: Message;
  parent: MessageNode | null;
  children: MessageNode[];
}
