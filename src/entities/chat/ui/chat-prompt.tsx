import { cn } from "@/shared/lib/cn";
import { FC, HTMLAttributes } from "react";
import { MessageNode } from "../models/message-tree";

interface ChatPromptProps extends HTMLAttributes<HTMLDivElement> {
  message: MessageNode;
}

export const ChatPrompt: FC<ChatPromptProps> = ({
  message,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        "max-w-[75%] self-end overflow-hidden whitespace-pre-wrap rounded-xl bg-accent px-4 py-2 text-accent-foreground",
        className,
      )}
    >
      {message.data.content}
    </div>
  );
};
