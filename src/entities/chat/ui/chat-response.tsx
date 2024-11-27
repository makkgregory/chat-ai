import { cn } from "@/shared/lib/cn";
import { FC, HTMLAttributes, useState } from "react";
import { MessageNode } from "../models/message-tree";
import { ChatAssistantAvatar } from "./chat-assistant-avatar";
import { ChatMarkdown } from "./chat-markdown";
import { CopyControl } from "./controls/copy-control";
import { ResponseVariantControl } from "./controls/response-variant-control";
import { ThumbsDownControl } from "./controls/thumbs-down-control";
import { ThumbsUpControl } from "./controls/thumbs-up-control";
import { TryAgainControl } from "./controls/try-again-control";

interface ChatResponseProps extends HTMLAttributes<HTMLDivElement> {
  message: MessageNode;
  isGenerating: boolean;
}

export const ChatResponse: FC<ChatResponseProps> = ({
  message,
  isGenerating,
  className,
  ...rest
}) => {
  const [currentVariant, setCurrentVariant] = useState<string>(message.id);
  const variants = [
    message.id,
    ...message.children.map((current) => current.id),
  ];

  return (
    <div {...rest} className={cn("flex w-full gap-4", className)}>
      <ChatAssistantAvatar className="mt-1.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ChatMarkdown
          className={cn(
            "w-full max-w-none",
            isGenerating && "result-streaming",
          )}
          content={message.data.content}
        />

        <div className="-ml-1.5 flex">
          <ResponseVariantControl
            currentVariant={currentVariant}
            variants={variants}
            onVariantChange={setCurrentVariant}
          />
          <CopyControl message={message.data} />
          <ThumbsUpControl message={message.data} />
          <ThumbsDownControl message={message.data} />
          <TryAgainControl message={message.data} />
        </div>
      </div>
    </div>
  );
};
