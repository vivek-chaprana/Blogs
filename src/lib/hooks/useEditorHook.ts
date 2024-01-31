import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const useEditorHook = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      CharacterCount,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Link.configure({
        protocols: ["ftp", "mailto", "tel"],
        openOnClick: false,
        autolink: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?";
          }
          return "Once upon a time in a galaxy far, far away...";
        },
      }),
      Typography,
    ],
    injectCSS: true,
    editorProps: {
      attributes: {
        class:
          "rounded-lg p-5 py-10 bg-none overflow-y-auto outline-none focus:ring-0 focus:shadow-none focus:border-transparent focus:outline-none max-w-none prose h-full  min-h-[60vh] ",
      },
    },
  });

  return editor;
};