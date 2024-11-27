import { Chat } from "@/shared/db/types";
import { streamIter } from "@/shared/lib/stream-iter";
import { useMutation } from "@tanstack/react-query";
import { EventSourceMessage } from "eventsource-parser";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { StartChatEvent, StartChatParams } from "../server/start-chat";
import { useSetChat } from "./use-chat";
import { useSetChatList } from "./use-chat-list";
import { useSetMessageList } from "./use-message-list";

interface UseStartChatParams {
  onChatStarted: (chat: Chat) => void;
}

export const useStartChat = ({ onChatStarted }: UseStartChatParams) => {
  const setChatList = useSetChatList();
  const setChat = useSetChat();
  const setMessageList = useSetMessageList();

  return useMutation({
    mutationFn: async ({
      signal,
      ...rest
    }: StartChatParams & { signal: AbortSignal }) => {
      const response = await fetch("/api/chats", {
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
          case "chat": {
            setChat(event.chat.id, () => event.chat);
            setChatList((data) => [event.chat, ...data]);
            onChatStarted(event.chat);
            break;
          }
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
        }
      }
    },
  });
};
