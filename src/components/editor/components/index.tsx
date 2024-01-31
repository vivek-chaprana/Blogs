import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  cn,
} from "@nextui-org/react";
import { IconType } from "react-icons/lib";

interface TooltipButtonProps extends ButtonProps {
  content: string;
  icon: JSX.Element;
  className?: string;
  btnClassName?: string;
}

type CustomDropdownProps = {
  triggerIcon: JSX.Element;
  items: { content: string; icon: IconType }[];
};

export const TooltipButton = ({
  content,
  icon,
  className,
  btnClassName,
  ...props
}: TooltipButtonProps) => {
  return (
    <Tooltip
      closeDelay={0}
      content={content}
      className={cn("capitalize", className)}
    >
      <Button
        isIconOnly
        variant="light"
        className={cn("text-xl", btnClassName)}
        {...props}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export const CustomDropdown = ({ triggerIcon, items }: CustomDropdownProps) => {
  return (
    <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
      <DropdownTrigger>
        <Button isIconOnly variant="light" className="text-xl z-50">
          {triggerIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {!!items &&
          items.map((elem, index) => (
            <DropdownItem className="w-min" key={index}>
              <TooltipButton content={elem.content} icon={<elem.icon />} />
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
