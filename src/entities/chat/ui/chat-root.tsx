"use client";

import { Chat } from "@/shared/db/types";
import { FC, PropsWithChildren } from "react";
import { useChatController } from "../lib/use-chat-controller";
import { ChatContextProvider } from "./chat-context";

interface ChatRootProps extends PropsWithChildren {
  chatId: string | null;
  onChatStarted: (chat: Chat) => void;
}

export const ChatRoot: FC<ChatRootProps> = ({
  chatId,
  children,
  onChatStarted,
}) => {
  const controller = useChatController({ chatId, onChatStarted });

  return (
    <ChatContextProvider value={controller}>{children}</ChatContextProvider>
  );
};
