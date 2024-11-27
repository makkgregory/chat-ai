import { CoreMessage } from "ai";
import { getMessages } from "./get-messages";

export const getChatContext = async (chatId: string) => {
  const messages = await getMessages(chatId);

  return messages
    .filter((current) => !!current.content.trim())
    .map((message) => {
      return {
        role: message.role,
        content: message.content,
      } satisfies CoreMessage;
    });
};
