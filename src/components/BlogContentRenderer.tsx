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
import { WEBAPP_URL } from "@/lib/constants";
import { JSONContent } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";

export default function BlogContentRenderer({
  content,
}: {
  content: JSONContent;
}) {
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
    Image.configure({
      allowBase64: true,
    }),
    Superscript,
    Subscript,
    Highlight.configure({
      multicolor: true,
    }),
    Youtube.configure({
      controls: true,
      allowFullscreen: false,
      autoplay: false,
      origin: WEBAPP_URL,
      progressBarColor: "black",
    }),
  ]);

  const purifiedHtml = DOMPurify.sanitize(output, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <main
      className="prose my-5"
      dangerouslySetInnerHTML={{ __html: purifiedHtml }}
    ></main>
  );
}
