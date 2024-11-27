import { streamIter } from "@/shared/lib/stream-iter";
import { useMutation } from "@tanstack/react-query";
import { EventSourceMessage } from "eventsource-parser";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { StartChatEvent } from "../server";
import { GenerateCompletionParams } from "../server/generate-completion";
import { useSetMessageList } from "./use-message-list";

export const useGenerateCompletion = () => {
  const setMessageList = useSetMessageList();

  return useMutation({
    mutationFn: async ({
      chatId,
      signal,
      ...rest
    }: GenerateCompletionParams & { signal: AbortSignal }) => {
      const response = await fetch(`/api/chats/${chatId}`, {
        signal,
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const stream = response.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new EventSourceParserStream())
        .pipeThrough(
          new TransformStream<EventSourceMessage, StartChatEvent>({
            transform(chunk, controller) {
              const message = JSON.parse(chunk.data);
              controller.enqueue(message);
            },
          }),
        );

      for await (const event of streamIter(stream)) {
        switch (event.type) {
          case "message": {
            setMessageList(event.message.chatId, (data) => [
              ...data,
              event.message,
            ]);
            break;
          }
          case "delta": {
            setMessageList(event.chatId, (data) => {
              return data.map((message) => {
                if (message.id === event.messageId) {
                  return {
                    ...message,
                    content: message.content + event.delta,
                  };
                }
                return message;
              });
            });
            break;
          }
          case "done":
            return;
        }
      }
    },
  });
};
