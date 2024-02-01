"use client";
import { useEditorHook } from "@/lib/hooks/useEditorHook";
import { Spinner } from "@nextui-org/react";
import { EditorContent } from "@tiptap/react";

export default function BlogRenderer({ content }: { content: any }) {
  const editor = useEditorHook(false, content);

  if (!editor)
    return (
      <div className="flex justify-center items-center min-h-20">
        <Spinner label="Loading..." color="warning" />
      </div>
    );

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}
