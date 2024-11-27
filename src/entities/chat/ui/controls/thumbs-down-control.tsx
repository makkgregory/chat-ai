import { WithTooltip } from "@/shared/components/with-tooltip";
import { Message } from "@/shared/db/types";
import { Button } from "@/shared/ui/button";
import { IconThumbDown, IconThumbDownFilled } from "@tabler/icons-react";
import { FC } from "react";
import { useChatContext } from "../chat-context";

interface ThumbsDownControlProps {
  message: Message;
}

export const ThumbsDownControl: FC<ThumbsDownControlProps> = ({ message }) => {
  const { provideFeedback } = useChatContext();

  const handleClick = () => {
    if (message.feedback !== false) {
      provideFeedback(message.id, false);
    }
  };

  if (message.feedback === true) {
    return null;
  }

  return (
    <WithTooltip tooltip="Bad response">
      <Button variant="ghost" size="icon" onClick={handleClick}>
        {message.feedback === false ? (
          <IconThumbDownFilled />
        ) : (
          <IconThumbDown />
        )}
      </Button>
    </WithTooltip>
  );
};
