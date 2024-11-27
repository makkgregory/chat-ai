import { cn } from "@/shared/lib/cn";
import { IconRobot } from "@tabler/icons-react";
import { FC, HTMLAttributes } from "react";

export const ChatAssistantAvatar: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border",
        className,
      )}
    >
      <IconRobot className="size-5" />
    </div>
  );
};
