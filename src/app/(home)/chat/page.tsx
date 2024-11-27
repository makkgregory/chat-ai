"use client";

import { ChatView } from "@/widgets/chat";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const Page: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  return (
    <ChatView
      key={chatId}
      chatId={chatId}
      onChatStarted={(chat) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("chatId", chat.id);
        router.push(`${pathname}?${newSearchParams}`);
      }}
    />
  );
};

export default Page;
