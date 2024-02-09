import getReadingTime from "@/lib/utils/getReadingTime";
import { cn } from "@nextui-org/react";
import { Editor } from "@tiptap/react";

export default function CharacterContainer({
  editor,
  limit,
}: {
  editor: Editor | null;
  limit?: number;
}) {
  if (!editor) {
    return null;
  }

  const characterCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();

  const minutes = getReadingTime(wordCount);
  return (
    <div className="p-3 text-sm">
      <p>
        <span
          className={cn(
            limit && characterCount > limit ? "text-red-600 font-semibold" : ""
          )}
        >
          {characterCount}
        </span>
        {limit && <span>/{limit}</span>} characters
      </p>
      <p>{wordCount} words</p>
      <p>{minutes} minute read</p>
    </div>
  );
}
