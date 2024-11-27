import { getChatOrNull } from "./get-chat-or-null";

export const getChat = async (chatId: string) => {
  const chat = await getChatOrNull(chatId);
  if (!chat) {
    throw new Error(`Chat is not found: ${chatId}`);
  }
  return chat;
};
