import { Chat } from "@/shared/db/types";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const chatQueryKey = (chatId: string) => {
  return ["chats", chatId];
};

export const useChat = (chatId: string | null) => {
  return useQuery({
    queryKey: chatQueryKey(chatId ?? "unknown"),
    enabled: !!chatId,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as Chat;
    },
  });
};

export const useSetChat = () => {
  const queryClient = useQueryClient();

  return (chatId: string, updater: (data: Chat | undefined) => Chat) => {
    queryClient.setQueriesData<Chat>(
      { queryKey: chatQueryKey(chatId) },
      (data) => updater(data),
    );
  };
};
