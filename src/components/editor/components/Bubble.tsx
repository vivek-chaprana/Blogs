import { BubbleMenu, Editor } from "@tiptap/react";
import {
  RiBold,
  RiCodeSSlashLine,
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
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

function Bubble({ editor }: { editor: Editor }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <BubbleMenu
      className="bg-[#333333] text-white rounded-lg p-2 m-3 flex gap-3 min-w-max "
      editor={editor}
    >
      <Dropdown className="border min-w-10">
        <DropdownTrigger>
          <Button endContent={<BsChevronDown />} className="capitalize ">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="text-type"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          // TODO: fix this type
          onSelectionChange={setSelectedKeys as any}
        >
          <DropdownItem
            startContent={<RiParagraph />}
            key="text"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Text
          </DropdownItem>
          <DropdownItem
            startContent={<RiH1 />}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
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
          >
            Heading 2
          </DropdownItem>
          <DropdownItem
            startContent={<RiH3 />}
            key="h3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            Heading 3
          </DropdownItem>
          <DropdownItem
            startContent={<RiListUnordered />}
            key="ul"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
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
          >
            Code
          </DropdownItem>
          <DropdownItem
            startContent={<RiQuoteText />}
            key="quote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            Quote
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <RiBold />
      </Button>
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <RiItalic />
      </Button>
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <RiStrikethrough />
      </Button>
      {/* <div
        className="rounded-md text-xl flex justify-center items-center text-white hover:bg-[#555555] cursor-pointer disabled:pointer-events-none disabled:opacity-50 ms-1 first:ms-0"
        onClick={() =>
          isSelectionOverLink
            ? editor.chain().focus().unsetLink().run()
            : setLink(editor)
        }
      >
        {isSelectionOverLink ? <RiLinkUnlink /> : <RiLink />}
      </div> */}
      <Button
        isIconOnly
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <RiCodeSSlashLine />
      </Button>
    </BubbleMenu>
  );
}

export default Bubble;
