"use client";

import { cn } from "@/shared/lib/cn";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { FC, HTMLAttributes, useEffect } from "react";
import { useChatContext } from "./chat-context";
import { ChatMessage } from "./chat-message";

export const ChatMessageList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const { messages, isGenerating } = useChatContext();
  const lastMessage = messages?.at(-1);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    document.getElementById(lastMessage.id)?.scrollIntoView();
  }, [lastMessage?.id, lastMessage?.data.content]);

  return (
    <div {...rest} className={cn("min-h-0 w-full flex-1", className)}>
      <ScrollArea className="size-full">
        <div className="h-4 w-full" />
        <div className="m-auto flex w-full max-w-3xl flex-col gap-6">
          {messages?.map((message) => (
            <ChatMessage
              id={message.id}
              key={message.id}
              message={message}
              isGenerating={isGenerating && message === lastMessage}
            />
          ))}
        </div>
        <div className="h-24 w-full" />
      </ScrollArea>
    </div>
  );
};
