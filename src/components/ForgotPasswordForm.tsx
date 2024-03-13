"use client";

import { sendPasswordResetEmail } from "@/lib/actions/auth";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type InputType = z.infer<typeof FormSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const router = useRouter();

  async function onSubmit(data: InputType) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail({
        email: data.email,
      });
      toast.success("Password reset email sent");
      router.push(`/auth/forgot-password?email=${data.email}&sent=true`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        type="email"
        label="Email address"
        variant="bordered"
      />
      <Button
        isLoading={isLoading}
        type="submit"
        className="bg-dark-200 text-gray-50 "
      >
        Send reset email
      </Button>
    </form>
  );
}
