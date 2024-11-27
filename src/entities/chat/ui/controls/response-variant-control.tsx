import { WithTooltip } from "@/shared/components/with-tooltip";
import { Button } from "@/shared/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";

interface ResponseVariantControlProps {
  currentVariant: string;
  variants: string[];
  onVariantChange: (variant: string) => void;
}

export const ResponseVariantControl: FC<ResponseVariantControlProps> = ({
  currentVariant,
  variants,
  onVariantChange,
}) => {
  const currentIndex = variants.indexOf(currentVariant);

  const handlePrevVariant = () => {
    const prevVariant = variants.at(currentIndex - 1);
    onVariantChange(prevVariant ?? currentVariant);
  };

  const handleNextVariant = () => {
    const nextVariant = variants.at(currentIndex + 1);
    onVariantChange(nextVariant ?? currentVariant);
  };

  if (variants.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <WithTooltip tooltip="Prev variant">
        <Button variant="ghost" size="icon" disabled={currentIndex === 0}>
          <IconChevronLeft />
        </Button>
      </WithTooltip>
      <span className="text-sm font-semibold text-muted-foreground">
        {currentIndex + 1} / {variants.length}
      </span>
      <WithTooltip tooltip="Next variant">
        <Button
          variant="ghost"
          size="icon"
          disabled={currentIndex + 1 >= variants.length}
        >
          <IconChevronRight />
        </Button>
      </WithTooltip>
    </div>
  );
};
