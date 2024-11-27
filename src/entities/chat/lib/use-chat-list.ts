import { Chat } from "@/shared/db/types";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const chatListQueryKey = () => {
  return ["chats"];
};

export const useChatList = () => {
  return useQuery({
    queryKey: chatListQueryKey(),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch("/api/chats");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as Chat[];
    },
  });
};

export const useSetChatList = () => {
  const queryClient = useQueryClient();

  return (updater: (data: Chat[]) => Chat[]) => {
    queryClient.setQueriesData<Chat[]>(
      { queryKey: chatListQueryKey() },
      (data) => updater(data ?? []),
    );
  };
};
