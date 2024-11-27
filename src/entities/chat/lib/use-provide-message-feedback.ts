import { Message } from "@/shared/db/types";
import { useMutation } from "@tanstack/react-query";
import { ProvideMessageFeedbackParams } from "../server";
import { useSetMessageList } from "./use-message-list";

export const useProvideMessageFeedback = () => {
  const setMessageList = useSetMessageList();

  return useMutation({
    mutationFn: async ({
      chatId,
      messageId,
      ...rest
    }: ProvideMessageFeedbackParams) => {
      const response = await fetch(
        `/api/chats/${chatId}/messages/${messageId}/feedback`,
        {
          method: "PUT",
          body: JSON.stringify(rest),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return data as Message;
    },
    onMutate: async ({ chatId, messageId, feedback }) => {
      setMessageList(chatId, (data) =>
        data.map((message) => {
          if (message.id === messageId) {
            return {
              ...message,
              feedback,
            };
          }

          return message;
        }),
      );
    },
    onSuccess: (message) => {
      setMessageList(message.chatId, (data) =>
        data.map((current) => {
          if (current.id === message.id) {
            return message;
          }

          return current;
        }),
      );
    },
  });
};
