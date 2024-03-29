"use client";

import { CHARACTER_LIMIT } from "@/lib/constants";
import { EditorContent, Editor as EditorType } from "@tiptap/react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const Bubble = dynamic(() => import("@/components/editor/components/Bubble"));
const CharacterContainer = dynamic(
  () => import("@/components/editor/components/CharacterContainer")
);
const Floating = dynamic(
  () => import("@/components/editor/components/Floating")
);
const Topbar = dynamic(() => import("@/components/editor/components/Topbar"));

interface EditorProps {
  editor: EditorType;
  showTopbar?: boolean;
  showBubble?: boolean;
  showFloating?: boolean;
  showWordCounter?: boolean;
}

const Editor = ({
  editor,
  showTopbar,
  showBubble,
  showFloating,
  showWordCounter,
}: EditorProps) => {
  if (!editor) return <Loading label="Loading Editor" />;

  return (
    <section className="max-w-5xl mx-auto rounded-lg border ">
      {showTopbar && <Topbar editor={editor} />}
      {showBubble && (
        <div>
          <Bubble editor={editor} />
        </div>
      )}
      {showFloating && (
        <div>
          <Floating editor={editor} />
        </div>
      )}
      <EditorContent editor={editor} />
      {showWordCounter && (
        <CharacterContainer editor={editor} limit={CHARACTER_LIMIT} />
      )}
    </section>
  );
};

export default Editor;
