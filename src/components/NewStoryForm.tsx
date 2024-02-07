"use client";

import Editor from "@/components/editor";
import { useEditorHook } from "@/lib/hooks/useEditorHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { User } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiSettings3Fill } from "react-icons/ri";
import { z } from "zod";
import EditorPublishModal from "./EditorPublishModal";
import EditorSettingsModal from "./EditorSettingsModal";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title should be less than 50 characters"),
});

export type NewStoryFormInputType = z.infer<typeof FormSchema>;

export default function NewStoryForm({ user }: { user: User }) {
  const editor = useEditorHook();
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
        <span className="opacity-85 text-sm">Draft in {user.name}</span>
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
            size="sm"
            variant="light"
            onClick={handleSubmit(publishModal.onOpen)}
          >
            Save as draft
          </Button>
          <Button
            onClick={handleSubmit(publishModal.onOpen)}
            size="sm"
            color="success"
            className="text-white rounded-full"
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
        className="mb-10"
        classNames={{
          input: "text-4xl leading-loose	",
        }}
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
      />
    </section>
  );
}
