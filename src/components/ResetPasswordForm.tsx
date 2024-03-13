"use client";
import updatePassword from "@/lib/actions/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import resetPassword from "@/lib/actions/auth/resetPassword";

const FormSchema = z
  .object({
    newPassword: z
      .string()
      .min(7, "Password must be at least 7 characters ")
      .max(50, "Password must be less than 50 characters")
      .refine((password) => /(?=.*[a-z])(?=.*[A-Z])/.test(password), {
        message: "Password must have a mix of uppercase and lowercase letters",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least 1 number",
      }),

    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function ResetPasswordForm({ email }: { email: string }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleResetPassword = async (data: InputType) => {
    setIsLoading(true);
    try {
      await resetPassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        email,
      });
      toast.success("Password reset successfully!");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        {...register("newPassword")}
        isInvalid={!!errors.newPassword}
        errorMessage={errors.newPassword?.message}
        label="New Password"
        labelPlacement="outside"
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />

      <PasswordStrength password={watch().newPassword} />

      <Input
        disabled={isLoading}
        {...register("confirmPassword")}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        label="Confirm New Password"
        labelPlacement="outside"
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />

      <Button
        isLoading={isLoading}
        className="bg-dark-200 text-white"
        onClick={handleSubmit(handleResetPassword)}
      >
        Reset password
      </Button>
    </form>
  );
}
