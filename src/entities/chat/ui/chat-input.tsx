"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import {
  IconArrowUp,
  IconPaperclip,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { FC, HTMLAttributes, useState } from "react";
import { useChatContext } from "./chat-context";

export const ChatInput: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const { isGenerating, generate, stopGenerating } = useChatContext();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    generate(prompt);
    setPrompt("");
  };

  return (
    <div {...rest} className={cn("flex w-full max-w-3xl flex-col gap-1")}>
      <div
        className={cn("flex min-h-24 flex-col gap-2 rounded-3xl bg-accent p-2")}
      >
        <div className="grid max-h-96 grid-cols-1 grid-rows-1 overflow-auto px-2.5 pt-1">
          <span
            className="invisible whitespace-pre-wrap text-base"
            style={{ gridArea: "1/1/2/2" }}
          >
            {prompt || " "}
          </span>
          <Textarea
            autoFocus
            placeholder="How can I help you?"
            className="resize-none overflow-hidden rounded-none border-none p-0 text-base shadow-none focus-visible:ring-0"
            style={{ gridArea: "1/1/2/2", minHeight: "unset" }}
            value={prompt}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-200"
            disabled
          >
            <IconPaperclip />
          </Button>

          {!isGenerating && (
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
            >
              <IconArrowUp />
            </Button>
          )}

          {isGenerating && (
            <Button
              size="icon"
              className="rounded-full"
              onClick={() => stopGenerating()}
            >
              <IconPlayerStopFilled />
            </Button>
          )}
        </div>
      </div>

      <span className="select-none text-center text-sm text-muted-foreground">
        Assistant can make mistakes. Check important information.
      </span>
    </div>
  );
};
