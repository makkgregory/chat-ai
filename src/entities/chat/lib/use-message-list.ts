import { Message } from "@/shared/db/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildMessageTree } from "./build-message-tree";

const messageListQueryKey = (chatId: string) => {
  return ["chats", chatId, "messages"];
};

export const useMessageList = (chatId: string | null) => {
  return useQuery({
    queryKey: messageListQueryKey(chatId ?? "unknown"),
    enabled: !!chatId,
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as Message[];
    },
    select: (data) => buildMessageTree(data),
  });
};

export const useSetMessageList = () => {
  const queryClient = useQueryClient();

  return (chatId: string, updater: (data: Message[]) => Message[]) => {
    queryClient.setQueriesData<Message[]>(
      { queryKey: messageListQueryKey(chatId) },
      (data = []) => updater(data),
    );
  };
};
