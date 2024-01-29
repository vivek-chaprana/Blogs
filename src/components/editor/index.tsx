"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import  from "@tiptap/extension-color"
// import exrens from "@tiptap/extension-floating-menu"
// import exrens from "@tiptap/extension-focus"
// import exrens from "@tiptap/extension-font-family"
// import exrens from "@tiptap/extension-image"
// import exrens from "@tiptap/extension-link"
// import exrens from "@tiptap/extension-list-item"
// import exrens from "@tiptap/extension-placeholder"
// import exrens from "@tiptap/extension-text-align"
// import exrens from "@tiptap/extension-text-style"
// import exrens from "@tiptap/extension-typography"
// import exrens from "@tiptap/extension-underline"
import Topbar from "./components/topbar";
import Bubble from "./components/Bubble";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    injectCSS: true,
    editorProps: {
      attributes: {
        class:
          "rounded-lg p-5 py-10 bg-gray-100 border overflow-y-auto outline-none focus:ring-0 focus:shadow-none focus:border-transparent focus:outline-none max-w-none prose",
      },
    },
  });

  return (
    <section className="max-w-5xl mx-auto rounded-lg border">
      <Topbar editor={editor} />
      {editor && <Bubble editor={editor} />}
      <EditorContent editor={editor} />
    </section>
  );
};

export default Editor;
