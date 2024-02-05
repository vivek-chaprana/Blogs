"use client";
import updateUserInfo from "@/lib/actions/updateUserInfo";
import { WEBAPP_URL } from "@/lib/constants";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgDanger } from "react-icons/cg";
import { z } from "zod";

const InputSchema = z.object({
  username: z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9_-]+$"), "No special character allowed!")
    .min(1, "Username is required.")
    .max(45, "Username should be less than 45 characters."),
});

type InputType = z.infer<typeof InputSchema>;

export default function UsernameModal({ username }: { username: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(InputSchema),
  });

  const handleUpdateUsername = async (data: InputType) => {
    const { username } = data;
    setIsLoading(true);

    try {
      await updateUserInfo({ username });
      toast.success("Username updated successfully");
    } catch (error) {
      toast.error("Failed to update username");
    } finally {
      await update();
      setIsLoading(false);
      onOpenChange();
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="justify-between px-5 py-2 my-5 rounded-xl flex cursor-pointer hover:bg-gray-100 transition-colors duration-150"
        onClick={onOpen}
      >
        <h4 className="font-semibold">Username</h4>
        <p>{username}</p>
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">Username</ModalHeader>
              <ModalBody>
                <form>
                  <Input
                    {...register("username")}
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    type="text"
                    variant="underlined"
                    label="Email"
                    defaultValue={username}
                  />
                  <p className="text-gray-400 text-sm my-2">
                    {WEBAPP_URL}/{username}
                  </p>

                  <span className="text-danger-500 text-sm">
                    <CgDanger className="inline me-2 text-base" />
                    This action will cause your profile URL to change & hence
                    all the links shared with this URL will be broken.
                  </span>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onClick={handleSubmit(handleUpdateUsername)}
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
