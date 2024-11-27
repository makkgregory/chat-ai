"use client";

import { Chat } from "@/shared/db/types";
import { cn } from "@/shared/lib/cn";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { IconMessage } from "@tabler/icons-react";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { useChatList } from "../../entities/chat/lib/use-chat-list";

interface ChatListProps extends HTMLAttributes<HTMLDivElement> {
  selectedChatId: string | null;
  onChatSelect: (chat: Chat) => void;
}

export const ChatList: FC<ChatListProps> = ({
  selectedChatId,
  className,
  onChatSelect,
  ...rest
}) => {
  const { data: chats = [] } = useChatList();
  const [filter, setFilter] = useState("");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [chats, filter]);

  return (
    <div {...rest} className={cn("w-full", className)}>
      <Command className="size-full" shouldFilter={false}>
        <CommandInput
          value={filter}
          onValueChange={setFilter}
          placeholder="Search for chats..."
        />

        <CommandList className="max-h-none w-full p-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredChats.map((chat) => (
            <CommandItem
              key={chat.id}
              onSelect={() => onChatSelect(chat)}
              value={chat.id}
              className={cn(
                "px-4 py-2.5",
                selectedChatId === chat.id && "bg-accent",
              )}
            >
              <IconMessage />
              <span>{chat.title}</span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};
