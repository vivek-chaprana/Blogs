"use client";

import Editor from "@/components/editor";
import publishBlog from "@/lib/actions/blogs/publishBlog";
import { useEditorHook } from "@/lib/hooks/useEditorHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title should be less than 50 characters"),
});

type InputType = z.infer<typeof FormSchema>;

export default function NewStoryForm({ user }: { user: User }) {
  const editor = useEditorHook();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  async function handleBlogPublish(data: InputType) {
    const { title } = data ?? {};
    const body = editor?.getJSON() ?? {};

    try {
      // FIXME: Cannot use server actions with JSON, so we have to create a new API route & make a post request to it
      await publishBlog({ title, content: body });
      toast.success("Blog published successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      reset();
      editor?.destroy();
    }
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex w-full justify-between items-center px-1">
        <span className="opacity-85 text-sm">Draft in {user.name}</span>
        <div className="flex gap-4">
          <Button size="sm" variant="light">
            Save as draft
          </Button>
          <Button
            size="sm"
            color="success"
            className="text-white rounded-full"
            onClick={handleSubmit(handleBlogPublish)}
          >
            Publish
          </Button>
        </div>
      </div>
      <Input
        {...register("title")}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
        type="text"
        variant="underlined"
        placeholder="Title of your blog"
        className="[&>div>div>div>input]:text-4xl "
      />
      <br />
      {editor && <Editor editor={editor} />}
    </section>
  );
}
