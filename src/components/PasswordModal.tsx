"use client";
import updatePassword from "@/lib/actions/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";

const FormSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required."),

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

export default function PasswordModal() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleUpdatePassword = async (data: InputType) => {
    setIsLoading(true);

    try {
      await updatePassword(data.oldPassword, data.newPassword);
      toast.success("Password changed successfully!");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      reset();
      onOpenChange();
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="w-[700px] justify-between px-5 py-2 my-5 rounded-xl flex cursor-pointer hover:bg-gray-100 transition-colors duration-150"
        onClick={onOpen}
      >
        <span>
          <h4 className="font-semibold">Password</h4>
          <p className="text-sm">Change your password.</p>
        </span>

        <span className="flex items-center gap-3">
          <p className="min-w-fit ">********</p>
        </span>
      </div>
      <Modal
        isDismissable={!isLoading}
        closeButton={!isLoading}
        scrollBehavior="inside"
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">Password</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    {...register("oldPassword")}
                    isInvalid={!!errors.oldPassword}
                    errorMessage={errors.oldPassword?.message}
                    label="Old Password"
                    labelPlacement="outside"
                    variant="underlined"
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

                  <Input
                    {...register("newPassword")}
                    isInvalid={!!errors.newPassword}
                    errorMessage={errors.newPassword?.message}
                    label="New Password"
                    labelPlacement="outside"
                    variant="underlined"
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
                    {...register("confirmPassword")}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                    label="Confirm New Password"
                    labelPlacement="outside"
                    variant="underlined"
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => !isLoading && onClose()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onClick={handleSubmit(handleUpdatePassword)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
