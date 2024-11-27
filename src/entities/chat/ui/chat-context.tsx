import { createContext, useContext } from "react";
import { useChatController } from "../lib/use-chat-controller";

type ChatContext = ReturnType<typeof useChatController>;

const ChatContext = createContext<ChatContext | null>(null);

export const ChatContextProvider = ChatContext.Provider;

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }

  return context;
};
