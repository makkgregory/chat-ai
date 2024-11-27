import { WithTooltip } from "@/shared/components/with-tooltip";
import { Message } from "@/shared/db/types";
import { Button } from "@/shared/ui/button";
import { IconRefresh } from "@tabler/icons-react";
import { FC } from "react";
import { useChatContext } from "../chat-context";

interface TryAgainControlProps {
  message: Message;
}

export const TryAgainControl: FC<TryAgainControlProps> = ({ message }) => {
  const { regenerate } = useChatContext();

  return (
    <WithTooltip tooltip="Try again">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => regenerate(message.id)}
      >
        <IconRefresh />
      </Button>
    </WithTooltip>
  );
};
