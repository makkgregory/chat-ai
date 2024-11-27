import { Chat } from "@/shared/db/types";
import { useRef } from "react";
import { useChat } from "./use-chat";
import { useGenerateCompletion } from "./use-generate-completion";
import { useMessageList } from "./use-message-list";
import { useProvideMessageFeedback } from "./use-provide-message-feedback";
import { useStartChat } from "./use-start-chat";

interface UseChatControllerParams {
  chatId: string | null;
  onChatStarted: (chat: Chat) => void;
}

export const useChatController = ({
  chatId,
  onChatStarted,
}: UseChatControllerParams) => {
  const { data: chat = null } = useChat(chatId);
  const { data: messages = null } = useMessageList(chatId);
  const stopRef = useRef<AbortController | null>(null);

  const { mutate: provideMessageFeedback } = useProvideMessageFeedback();

  const { mutate: generateCompletion, isPending: isGenerateCompletionPending } =
    useGenerateCompletion();

  const { mutate: startChat, isPending: isStartChatPending } = useStartChat({
    onChatStarted,
  });

  const isNewChat = !chatId;
  const isGenerating = isGenerateCompletionPending || isStartChatPending;
  const isReady = !isNewChat || (!!chat && !!messages);

  const provideFeedback = (messageId: string, feedback: boolean) => {
    if (chatId) {
      provideMessageFeedback({ chatId, messageId, feedback });
    }
  };

  const generate = (prompt: string) => {
    stopRef.current = new AbortController();
    if (isNewChat) {
      startChat({ prompt, signal: stopRef.current.signal });
      return;
    }
    generateCompletion({
      chatId,
      prompt,
      signal: stopRef.current.signal,
    });
  };

  const regenerate = (messageId: string) => {
    const index = messages?.findIndex((message) => message.id === messageId);
  };

  const stopGenerating = () => {
    stopRef.current?.abort();
    stopRef.current = null;
  };

  return {
    isNewChat,
    isReady,
    chat,
    messages,
    isGenerating,
    generate,
    regenerate,
    stopGenerating,
    provideFeedback,
  };
};
