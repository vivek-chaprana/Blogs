"use client";

import { createComment } from "@/lib/actions/comment";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment text is required.")
    .max(150, "Comment text should be less than 150 characters."),
});

type InputType = z.infer<typeof CommentSchema>;

export default function BlogComment({ blogId }: { blogId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(CommentSchema) });

  const handleComment = async (data: InputType) => {
    setIsLoading(true);
    try {
      await createComment(blogId, data.comment);
      toast.success("Comment created successfully.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
      reset();
      router.refresh();
    }
  };

  return (
    <div className="my-10">
      <form
        className="flex flex-col gap-5 items-end"
        onSubmit={handleSubmit(handleComment)}
      >
        <Input
          type="text"
          variant="bordered"
          label="Comment"
          {...register("comment")}
          isInvalid={!!errors.comment}
          errorMessage={errors.comment?.message}
        />
        <Button
          isLoading={isLoading}
          type="submit"
          color="primary"
          className="w-min bg-dark-200 text-white"
        >
          Comment
        </Button>
      </form>
    </div>
  );
}
