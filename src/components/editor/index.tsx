"use client";

import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bubble from "./components/Bubble";
import CharacterContainer from "./components/CharacterContainer";
import Topbar from "./components/Topbar";

const CHARACTER_LIMIT = 20;

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Text,
      TextStyle,
      Document,
      Paragraph,
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
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    injectCSS: true,
    editorProps: {
      attributes: {
        class:
          "rounded-lg p-5 py-10 bg-gray-100  overflow-y-auto outline-none focus:ring-0 focus:shadow-none focus:border-transparent focus:outline-none max-w-none prose ",
      },
    },
  });

  return (
    <section className="max-w-5xl mx-auto rounded-lg border">
      <Topbar editor={editor} />
      {editor && <Bubble editor={editor} />}
      <EditorContent editor={editor} />
      <CharacterContainer editor={editor} limit={CHARACTER_LIMIT} />
    </section>
  );
};

export default Editor;
