import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  cn,
} from "@nextui-org/react";
import { EditorContentProps } from "@tiptap/react";
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
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiTextWrap,
  RiUnderline,
} from "react-icons/ri";
import { TooltipButton } from ".";
import { colors, fontFamilies, headings, textAlignments } from "../utils";
import LinkUnlinkBtn from "./LinkUnlinkBtn";

const Topbar = ({ editor }: EditorContentProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-evenly gap-2 p-2 border-b-2 border-black flex-wrap ">
      {/* Headings */}
      <Dropdown className="[&>div>ul]:flex-row [&>div>ul]:flex-wrap">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-xl z-50">
            <RiHeading />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!headings &&
            headings.map((elem, index) => (
              <DropdownItem
                key={index}
                className={cn(
                  "w-min",
                  editor.isActive("heading", { level: elem.value })
                    ? "bg-gray-200"
                    : ""
                )}
              >
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
        btnClassName={editor.isActive("paragraph") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Bold"
        icon={<RiBold />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        btnClassName={editor.isActive("bold") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Italic"
        icon={<RiItalic />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        btnClassName={editor.isActive("italic") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Underline"
        icon={<RiUnderline />}
        onClick={() => editor.commands.toggleUnderline()}
        btnClassName={editor.isActive("underline") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Strikethrough"
        icon={<RiStrikethrough />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        btnClassName={editor.isActive("strike") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Code"
        icon={<RiCodeLine />}
        onClick={() => editor.chain().focus().toggleCode().run()}
        btnClassName={editor.isActive("code") ? "bg-gray-200" : ""}
      />

      <LinkUnlinkBtn editor={editor} variant="light" />

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
        btnClassName={editor.isActive("codeBlock") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Unordered list"
        icon={<RiListUnordered />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        btnClassName={editor.isActive("bulletList") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Ordered list"
        icon={<RiListOrdered />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        btnClassName={editor.isActive("orderedList") ? "bg-gray-200" : ""}
      />
      <TooltipButton
        content="Quote"
        icon={<RiDoubleQuotesR />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        btnClassName={editor.isActive("quote") ? "bg-gray-200" : ""}
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
          <Button isIconOnly variant="light" className="text-xl">
            <RiAlignJustify />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!textAlignments &&
            textAlignments.map((elem, index) => (
              <DropdownItem
                key={index}
                className={cn(
                  "w-min",
                  editor.isActive({ textAlign: elem.value })
                    ? "bg-gray-200"
                    : ""
                )}
              >
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
          <Button isIconOnly variant="light" className="text-xl">
            <RiFontFamily />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {!!fontFamilies &&
            fontFamilies.map((elem, index) => (
              <DropdownItem
                key={index}
                className={cn(
                  "w-min",
                  editor.isActive("textStyle", { fontFamily: elem.value })
                    ? "bg-gray-200"
                    : " "
                )}
              >
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
            colors.map((col, index) => (
              <DropdownItem
                key={index}
                className={cn(
                  "w-min",
                  editor.isActive("textStyle", { color: col })
                    ? "bg-gray-200"
                    : " "
                )}
              >
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

export default Topbar;
