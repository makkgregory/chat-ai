import {
  ChatContent,
  ChatInput,
  ChatMessageList,
  ChatRoot,
} from "@/entities/chat";
import { Chat } from "@/shared/db/types";
import { FC } from "react";

interface ChatViewProps {
  chatId: string | null;
  onChatStarted: (chat: Chat) => void;
}

export const ChatView: FC<ChatViewProps> = ({ chatId, onChatStarted }) => {
  return (
    <ChatRoot chatId={chatId} onChatStarted={onChatStarted}>
      <ChatContent>
        <ChatMessageList />
        <ChatInput />
      </ChatContent>
    </ChatRoot>
  );
};
