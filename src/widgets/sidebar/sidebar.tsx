import { cn } from "@/shared/lib/cn";
import { FC, HTMLAttributes } from "react";

export const Sidebar: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div className={cn("flex w-72 flex-col border-r", className)} {...rest} />
  );
};
