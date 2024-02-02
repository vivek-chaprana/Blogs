// Option 1: Using Tiptap Editor

// "use client";
// import { useEditorHook } from "@/lib/hooks/useEditorHook";
// import { Spinner } from "@nextui-org/react";
// import { EditorContent } from "@tiptap/react";

// export default function BlogRenderer({ content }: { content: any }) {
//   const editor = useEditorHook(false, content);

//   if (!editor)
//     return (
//       <div className="flex justify-center items-center min-h-20">
//         <Spinner label="Loading..." color="warning" />
//       </div>
//     );

//   return (
//     <>
//       <EditorContent editor={editor} />
//     </>
//   );
// }

// Option 2: Generating HTML from JSONContent
import { JSONContent } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";

export default function BlogRenderer({ content }: { content: JSONContent }) {
  const output = generateHTML(content, [
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
    Typography,
  ]);

  const purifiedHtml = DOMPurify.sanitize(output);

  return (
    <main
      className="prose"
      dangerouslySetInnerHTML={{ __html: purifiedHtml }}
    ></main>
  );
}
