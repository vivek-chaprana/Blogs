"use client";

import { EditorContent, Editor as EditorType } from "@tiptap/react";

import Bubble from "./components/Bubble";
import CharacterContainer from "./components/CharacterContainer";
import Topbar from "./components/Topbar";

const CHARACTER_LIMIT = 2000;

/*
  TODO: In future might add.. 
  - Subscript
  - Superscipt
  - Highlight
  - Images support
  - A guide for keyboard shortcuts

  This looks like an overkill to me though! Still we'll see. 
*/

const Editor = ({ editor }: { editor: EditorType }) => {
  if (!editor) return <div className="text-center">Loading Editor...</div>;

  return (
    <section className="max-w-5xl mx-auto rounded-lg border ">
      <Topbar editor={editor} />
      <Bubble editor={editor} />
      {/* {editor && <Floating editor={editor} />} */}
      <EditorContent editor={editor} />
      <CharacterContainer editor={editor} limit={CHARACTER_LIMIT} />
    </section>
  );
};

export default Editor;
