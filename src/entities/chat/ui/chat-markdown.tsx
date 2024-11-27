import { cn } from "@/shared/lib/cn";
import { FC, HTMLAttributes, memo } from "react";
import Markdown from "react-markdown";

interface ChatMarkdownProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

const ChatMarkdown: FC<ChatMarkdownProps> = memo(
  ({ content, className, ...rest }) => {
    return (
      <div {...rest} className={cn("prose dark:prose-dark", className)}>
        <Markdown>{content}</Markdown>
      </div>
    );
  },
);

ChatMarkdown.displayName = "ChatMarkdown";

export { ChatMarkdown };
