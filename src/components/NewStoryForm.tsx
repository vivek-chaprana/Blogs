"use client";

import Editor from "@/components/editor";
import { useEditorHook } from "@/lib/hooks/useEditorHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import { JSONContent } from "@tiptap/core";
import { User } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiSettings3Fill } from "react-icons/ri";
import { z } from "zod";
import EditorPublishModal from "./EditorPublishModal";
import EditorSettingsModal from "./EditorSettingsModal";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title should be less than 100 characters"),
});

export type NewStoryFormInputType = z.infer<typeof FormSchema>;

type NewStoryFormProps = {
  user: User;
  blog?: BlogPost;
};

export default function NewStoryForm({ user, blog }: NewStoryFormProps) {
  const editor = useEditorHook(true, (blog?.content as JSONContent) || null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewStoryFormInputType>({ resolver: zodResolver(FormSchema) });

  const settingModal = useDisclosure();
  const publishModal = useDisclosure();

  const [showTopbar, setShowTopbar] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [showWordCounter, setShowWordCounter] = useState(true);

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex w-full justify-between items-center px-1 my-5">
        <span className="opacity-85 text-sm">
          <strong>{blog?.status || "Draft"} </strong> in {user.name}
        </span>
        <div className="flex items-center  gap-4">
          {/* Editor Settings */}
          <Button
            variant="light"
            isIconOnly
            className="text-xl"
            onClick={settingModal.onOpen}
          >
            <RiSettings3Fill />
          </Button>
          <Button
            onClick={handleSubmit(() => {
              if (!editor || editor?.isEmpty) {
                return toast.error("Blog content is required!");
              }
              publishModal.onOpen();
            })}
            size="sm"
            color="success"
            className="text-white rounded-full"
          >
            Next
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
        className="mb-10"
        classNames={{
          input: "text-xl sm:text-3xl md:text-4xl leading-loose	",
        }}
        defaultValue={blog?.title || ""}
      />
      {editor && (
        <Editor
          editor={editor}
          showTopbar={showTopbar}
          showBubble={showBubble}
          showFloating={showFloating}
          showWordCounter={showWordCounter}
        />
      )}
      {/* Editor Settings Modal */}
      <EditorSettingsModal
        isOpen={settingModal.isOpen}
        onClose={settingModal.onClose}
        showTopbar={showTopbar}
        setShowTopbar={setShowTopbar}
        showBubble={showBubble}
        setShowBubble={setShowBubble}
        showFloating={showFloating}
        setShowFloating={setShowFloating}
        showWordCounter={showWordCounter}
        setShowWordCounter={setShowWordCounter}
      />
      {/* Publish Modal */}
      <EditorPublishModal
        isOpen={publishModal.isOpen}
        onClose={publishModal.onClose}
        editor={editor}
        title={getValues("title")}
        user={user}
        blog={blog}
      />
    </section>
  );
}
