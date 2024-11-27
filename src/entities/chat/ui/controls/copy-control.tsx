import { WithTooltip } from "@/shared/components/with-tooltip";
import { Message } from "@/shared/db/types";
import { Button } from "@/shared/ui/button";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FC, useState } from "react";

interface CopyControlProps {
  message: Message;
}

export const CopyControl: FC<CopyControlProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCopied(false);
  };

  return (
    <WithTooltip tooltip="Copy">
      <Button variant="ghost" size="icon" onClick={handleCopy}>
        {copied ? <IconCheck /> : <IconCopy />}
      </Button>
    </WithTooltip>
  );
};
