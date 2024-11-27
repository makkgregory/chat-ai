"use client";

import { Chat } from "@/shared/db/types";
import { Button } from "@/shared/ui/button";
import { ChatList } from "@/widgets/chat-list";
import { Sidebar, SidebarActions, SidebarContent } from "@/widgets/sidebar";
import { IconEdit, IconLayoutSidebar } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNewChat = () => {
    router.push("/chat");
  };

  const handleChatSelect = (chat: Chat) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("chatId", chat.id);
    router.push(`${pathname}?${newSearchParams}`);
  };

  return (
    <div className="flex size-full gap-2">
      <Sidebar>
        <SidebarActions className="flex justify-between px-2 py-1">
          <Button variant="ghost" size="icon-lg">
            <IconLayoutSidebar />
          </Button>

          <Button variant="ghost" size="icon-lg" onClick={handleNewChat}>
            <IconEdit />
          </Button>
        </SidebarActions>
        <SidebarContent>
          <ChatList
            selectedChatId={searchParams.get("chatId")}
            onChatSelect={handleChatSelect}
          />
        </SidebarContent>
      </Sidebar>
      <div className="h-full min-w-0 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
