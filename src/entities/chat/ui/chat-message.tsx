import { FC, HTMLAttributes } from "react";
import { MessageNode } from "../models/message-tree";
import { ChatPrompt } from "./chat-prompt";
import { ChatResponse } from "./chat-response";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: MessageNode;
  isGenerating: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  isGenerating,
  ...rest
}) => {
  switch (message.data.role) {
    case "user":
      return <ChatPrompt {...rest} message={message} />;
    case "assistant":
      return (
        <ChatResponse isGenerating={isGenerating} {...rest} message={message} />
      );
  }
};
