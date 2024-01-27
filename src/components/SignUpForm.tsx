"use client";

import registerUser from "@/lib/actions/auth/registerUser";
import { WEBAPP_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgMail } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";

const FormSchema = z.object({
  username: z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9_]+$"), "No special character allowed!")
    .min(1, "Username is required."),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters ")
    .max(50, "Password must be less than 50 characters")
    .refine((password) => /(?=.*[a-z])(?=.*[A-Z])/.test(password), {
      message: "Password must have a mix of uppercase and lowercase letters",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least 1 number",
    }),
});

type InputType = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const signUp = async (data: InputType) => {
    try {
      setIsLoading(true);
      const createdUser = await registerUser(data);
      toast.success("Account created successfully");
      router.push("/auth/verify?email=" + (createdUser.email ?? data.email));
      setIsLoading(false);
      reset();
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(signUp)}>
      <Input
        {...register("username")}
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username}
        type="text"
        label="Username"
        placeholder=""
        labelPlacement="outside"
        variant="bordered"
        autoComplete="off"
        startContent={
          <div className="pointer-events-none flex items-center ">
            <span className="text-default-400 text-sm ">{WEBAPP_URL}/</span>
          </div>
        }
      />
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        type="email"
        label="Email"
        placeholder="you@blogs.write"
        labelPlacement="outside"
        variant="bordered"
        startContent={
          <CgMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Password"
        labelPlacement="outside"
        placeholder="********"
        variant="bordered"
        autoComplete="off"
        startContent={
          <RiLockPasswordFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
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

      <PasswordStrength password={watch().password} />

      <Button
        type="submit"
        color="primary"
        className="w-full p-0"
        isLoading={isLoading}
      >
        Sign up for free
      </Button>
      <Button className="w-full" as={Link} href="/auth/login" >Login Instead</Button>
    </form>
  );
}
