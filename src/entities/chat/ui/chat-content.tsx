import { cn } from "@/shared/lib/cn";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const ChatContent: FC<
  HTMLAttributes<HTMLDivElement> & PropsWithChildren
> = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "flex h-full flex-col items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};
