import { Editor, FloatingMenu } from "@tiptap/react";
import {
  RiCodeBoxLine,
  RiDoubleQuotesL,
  RiH1,
  RiListOrdered,
  RiListUnordered,
} from "react-icons/ri";
import { TooltipButton } from ".";
import AddEditImageBtn from "./AddEditImageBtn";
import YoutubeBtn from "./YoutubeBtn";

export default function Floating({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="border bg-gr rounded-lg translate-x-2 sm:translate-x-20"
    >
      <TooltipButton
        content="Heading 1"
        icon={<RiH1 />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <TooltipButton
        content="Bullet list"
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
        icon={<RiDoubleQuotesL />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <TooltipButton
        content="Code Block"
        icon={<RiCodeBoxLine />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <AddEditImageBtn editor={editor} />
      <YoutubeBtn editor={editor} />
    </FloatingMenu>
  );
}
