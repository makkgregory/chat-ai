import { FC, PropsWithChildren, ReactNode } from "react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface WithTooltipProps extends PropsWithChildren {
  tooltip: ReactNode;
}

export const WithTooltip: FC<WithTooltipProps> = ({ tooltip, children }) => {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          {tooltip}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
