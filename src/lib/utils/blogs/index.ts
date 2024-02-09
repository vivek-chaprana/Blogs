import { EditorPublishModalInputType } from "@/components/EditorPublishModal";
import { JSONContent } from "@tiptap/core";

export const saveBlog = async (
  data?: EditorPublishModalInputType & {
    content: JSONContent;
    title: string;
    readingTime: number;
  }
) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch("/api/blogs", fetchOptions);

  const result = await res.json();

  if (!result.success)
    throw new Error(result?.message || "Something went wrong!");
};
