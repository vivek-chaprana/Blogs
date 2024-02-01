"use client";

import Editor from "@/components/editor";
import { useEditorHook } from "@/lib/hooks/useEditorHook";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import { User } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiSettings3Fill } from "react-icons/ri";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTopbar, setShowTopbar] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [showWordCounter, setShowWordCounter] = useState(true);

  async function handleBlogPublish(data: InputType) {
    const { title } = data ?? {};
    const body = editor?.getJSON() ?? {};

    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, status: PostStatus.PUBLISHED }),
      };
      const res = await fetch("/api/blogs", fetchOptions);
      if (!res.ok) throw new Error("Something went wrong!");
      toast.success("Blog published successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      reset();
      // TODO: Reset editor
    }
  }

  async function handleBlogSaveAsDraft(data: InputType) {
    const { title } = data ?? {};
    const body = editor?.getJSON() ?? {};

    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      };
      const res = await fetch("/api/blogs", fetchOptions);
      if (!res.ok) throw new Error("Something went wrong!");
      toast.success("Blog saved as draft successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      reset();
    }
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex w-full justify-between items-center px-1">
        <span className="opacity-85 text-sm">Draft in {user.name}</span>
        <div className="flex items-center  gap-4">
          <Button
            variant="light"
            isIconOnly
            className="text-xl"
            onClick={onOpen}
          >
            <RiSettings3Fill />
          </Button>
          <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Editor settings
                  </ModalHeader>
                  <ModalBody>
                    <div className=" flex flex-col gap-2 ">
                      <Switch
                        size="sm"
                        className="capitalize"
                        isSelected={showTopbar}
                        onValueChange={setShowTopbar}
                      >
                        Topbar
                      </Switch>
                      <Switch
                        size="sm"
                        className="capitalize"
                        isSelected={showBubble}
                        onValueChange={setShowBubble}
                      >
                        Bubble Menu
                      </Switch>
                      <Switch
                        size="sm"
                        className="capitalize"
                        isSelected={showFloating}
                        onValueChange={setShowFloating}
                      >
                        Floating Menu
                      </Switch>
                      <Switch
                        size="sm"
                        className="capitalize"
                        isSelected={showWordCounter}
                        onValueChange={setShowWordCounter}
                      >
                        Word Counter
                      </Switch>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Done
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button
            size="sm"
            variant="light"
            onClick={handleSubmit(handleBlogSaveAsDraft)}
          >
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
        className=""
        classNames={{
          input: "text-4xl leading-loose	",
        }}
      />
      <br />
      {editor && (
        <Editor
          editor={editor}
          showTopbar={showTopbar}
          showBubble={showBubble}
          showFloating={showFloating}
          showWordCounter={showWordCounter}
        />
      )}
    </section>
  );
}
