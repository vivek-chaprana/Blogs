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
import { EditorContentProps } from "@tiptap/react";
import { IconType } from "react-icons/lib";
import { MdRedo, MdUndo } from "react-icons/md";
import {
  RiAlignJustify,
  RiBold,
  RiCodeBoxLine,
  RiCodeLine,
  RiDoubleQuotesR,
  RiFontColor,
  RiFontFamily,
  RiFormatClear,
  RiHeading,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiTextWrap,
  RiUnderline,
} from "react-icons/ri";
import { colors, fontFamilies, headings, textAlignments } from "../utils";

const Topbar = ({ editor }: EditorContentProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-evenly gap-2 p-2 border-b-2 border-black ">
      {/* Headings */}
      <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-xl z-50">
            <RiHeading />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!headings &&
            headings.map((elem) => (
              <DropdownItem className="w-min">
                <TooltipButton
                  content={elem.content}
                  icon={<elem.icon />}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({
                        level: elem.value as 1 | 2 | 3 | 4,
                      })
                      .run()
                  }
                />
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>

      <TooltipButton
        content="paragraph"
        icon={<RiParagraph />}
        onClick={() => {
          editor.chain().focus().setParagraph().run();
        }}
      />
      <TooltipButton
        content="Bold"
        icon={<RiBold />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <TooltipButton
        content="Italic"
        icon={<RiItalic />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <TooltipButton
        content="Underline"
        icon={<RiUnderline />}
        onClick={() => editor.commands.toggleUnderline()}
      />
      <TooltipButton
        content="Strikethrough"
        icon={<RiStrikethrough />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <TooltipButton
        content="Code"
        icon={<RiCodeLine />}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      {/* TODO: Link  */}
      <TooltipButton content="Link" icon={<RiLink />} />
      <TooltipButton
        content="Clear format"
        icon={<RiFormatClear />}
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      />

      <TooltipButton
        content="Code block"
        icon={<RiCodeBoxLine />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <TooltipButton
        content="Unordered list"
        icon={<RiListUnordered />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <TooltipButton
        content="Ordered list"
        icon={<RiListOrdered />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <TooltipButton
        content="Quote"
        icon={<RiDoubleQuotesR />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />

      <TooltipButton
        content="Line break"
        icon={<RiTextWrap />}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      />
      <TooltipButton
        content="Horizontal rule"
        icon={<RiSeparator />}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      {/* Text Alignments  */}
      {/* FIXME: Will find a way... to minimize the code like that with funcitons  */}
      {/* <CustomDropdown triggerIcon={<RiAlignJustify />} items={textAlignments} /> */}

      <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-xl z-50">
            <RiAlignJustify />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!textAlignments &&
            textAlignments.map((elem) => (
              <DropdownItem className="w-min">
                <TooltipButton
                  content={elem.content}
                  icon={<elem.icon />}
                  onClick={() =>
                    editor.chain().focus().setTextAlign(elem.value).run()
                  }
                />
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>

      {/* Font Family */}
      <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-xl z-50">
            <RiFontFamily />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!fontFamilies &&
            fontFamilies.map((elem) => (
              <DropdownItem className="w-min">
                <TooltipButton
                  content={elem.content}
                  icon={<elem.icon />}
                  onClick={() =>
                    editor.chain().focus().setFontFamily(elem.value).run()
                  }
                />
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>

      {/* Colors */}
      <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-xl">
            <RiFontColor />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {colors &&
            colors.map((col) => (
              <DropdownItem className="w-min">
                <Tooltip content={col} className="capitalize">
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-xl"
                    onClick={() => {
                      col !== "default"
                        ? editor.commands.setColor(col)
                        : editor.commands.unsetColor();
                    }}
                  >
                    <RiFontColor fill={col} />
                  </Button>
                </Tooltip>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>

      <TooltipButton
        content="Undo"
        icon={<MdUndo />}
        btnClassName="disabled:opacity-25 disabled:cursor-not-allowed"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />
      <TooltipButton
        content="Redo"
        icon={<MdRedo />}
        btnClassName="disabled:opacity-25 disabled:cursor-not-allowed"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />
    </div>
  );
};

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

const TooltipButton = ({
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

const CustomDropdown = ({ triggerIcon, items }: CustomDropdownProps) => {
  return (
    <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
      <DropdownTrigger>
        <Button isIconOnly variant="light" className="text-xl z-50">
          {triggerIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {!!items &&
          items.map((elem) => (
            <DropdownItem className="w-min">
              <TooltipButton content={elem.content} icon={<elem.icon />} />
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Topbar;
