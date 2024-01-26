"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

const FormSchema = z.object({
  username: z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9_]+$"), "No special character allowed!")
    .min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

type InputType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const loginUser = async (data: InputType) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/",
      });
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(loginUser)} className="grid gap-4 ">
      <Input
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username}
        {...register("username")}
        label="Username"
        labelPlacement="outside"
        placeholder=" "
        variant="bordered"
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        label="Password"
        labelPlacement="outside"
        placeholder=" "
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
        type="submit"
        color="primary"
        className="w-full p-0"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}
