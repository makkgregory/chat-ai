import { WithTooltip } from "@/shared/components/with-tooltip";
import { Message } from "@/shared/db/types";
import { Button } from "@/shared/ui/button";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { FC } from "react";
import { useChatContext } from "../chat-context";

interface ThumbsUpControlProps {
  message: Message;
}

export const ThumbsUpControl: FC<ThumbsUpControlProps> = ({ message }) => {
  const { provideFeedback } = useChatContext();

  const handleClick = () => {
    if (message.feedback !== true) {
      provideFeedback(message.id, true);
    }
  };

  if (message.feedback === false) {
    return null;
  }

  return (
    <WithTooltip tooltip="Good response">
      <Button variant="ghost" size="icon" onClick={handleClick}>
        {message.feedback === true ? <IconThumbUpFilled /> : <IconThumbUp />}
      </Button>
    </WithTooltip>
  );
};
