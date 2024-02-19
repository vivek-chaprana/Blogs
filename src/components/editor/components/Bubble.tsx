import { BubbleMenu, Editor } from "@tiptap/react";
import {
  RiBold,
  RiCodeSSlashLine,
  RiFontColor,
  RiH1,
  RiH2,
  RiH3,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiQuoteText,
  RiStrikethrough,
} from "react-icons/ri";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { colors } from "../utils";
import LinkUnlinkBtn from "./LinkUnlinkBtn";

function Bubble({ editor }: { editor: Editor }) {
  const [selectedKeys, setSelectedKeys] = useState("text");

  const currentlyActive = useCallback(
    function () {
      return editor.isActive("heading", { level: 1 })
        ? "h1"
        : editor.isActive("heading", { level: 2 })
        ? "h2"
        : editor.isActive("heading", { level: 3 })
        ? "h3"
        : editor.isActive("bulletList")
        ? "ul"
        : editor.isActive("orderedList")
        ? "li"
        : editor.isActive("codeBlock")
        ? "code"
        : editor.isActive("blockquote")
        ? "quote"
        : "text";
    },
    [editor]
  );

  useEffect(() => {
    setSelectedKeys(currentlyActive());
  }, [currentlyActive]);

  if (!editor) return null;

  return (
    <BubbleMenu
      tippyOptions={{ duration: 100 }}
      className="rounded-lg p-2 m-3 flex gap-3 bg-gr flex-wrap sm:flex-nowrap sm:min-w-max"
      editor={editor}
    >
      <Dropdown className="border">
        <DropdownTrigger>
          <Button endContent={<BsChevronDown />} className="capitalize ">
            {selectedKeys}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="text-type"
          disallowEmptySelection
          selectedKeys={selectedKeys}
        >
          <DropdownItem
            startContent={<RiParagraph />}
            key="text"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "bg-gray-200" : ""}
          >
            Text
          </DropdownItem>
          <DropdownItem
            startContent={<RiH1 />}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
            }
            key="h1"
          >
            Heading 1
          </DropdownItem>
          <DropdownItem
            startContent={<RiH2 />}
            key="h2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }
          >
            Heading 2
          </DropdownItem>
          <DropdownItem
            startContent={<RiH3 />}
            key="h3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
            }
          >
            Heading 3
          </DropdownItem>
          <DropdownItem
            startContent={<RiListUnordered />}
            key="ul"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
          >
            Bullet List
          </DropdownItem>
          <DropdownItem
            startContent={<RiListOrdered />}
            key="li"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            Numbered List
          </DropdownItem>
          <DropdownItem
            startContent={<RiCodeSSlashLine />}
            key="code"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-gray-200" : ""}
          >
            Code block
          </DropdownItem>
          <DropdownItem
            startContent={<RiQuoteText />}
            key="quote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
          >
            Quote
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-black text-white" : ""}
      >
        <RiBold />
      </Button>
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-black text-white" : ""}
      >
        <RiItalic />
      </Button>
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-black text-white" : ""}
      >
        <RiStrikethrough />
      </Button>
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-black text-white" : ""}
      >
        <RiCodeSSlashLine />
      </Button>

      <LinkUnlinkBtn editor={editor} />

      {/* Color Selection */}
      <Dropdown className="border">
        <DropdownTrigger>
          <Button
            isIconOnly
            endContent={<BsChevronDown />}
            className="capitalize"
          >
            {<RiFontColor />}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="color-type" variant="flat">
          {!!colors &&
            colors.map((col, index) => (
              <DropdownItem
                onClick={() => {
                  col !== "default"
                    ? editor.commands.setColor(col)
                    : editor.commands.unsetColor();
                }}
                startContent={<RiFontColor fill={col} />}
                key={index}
                className={cn(
                  "capitalize",
                  editor.isActive("textStyle", { color: col })
                    ? "bg-gray-200"
                    : ""
                )}
              >
                {col}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </BubbleMenu>
  );
}

export default Bubble;
