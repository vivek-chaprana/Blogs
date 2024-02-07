"use client";
import updateUserEmail from "@/lib/actions/updateUserEmail";
import { COMPANY_NAME } from "@/lib/constants";
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
import { z } from "zod";

const InputSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type InputType = z.infer<typeof InputSchema>;

export default function EmailModal({ email }: { email: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { update } = useSession();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(InputSchema),
  });
  const router = useRouter();

  const handleUpdateEmail = async (data: InputType) => {
    const { email } = data;
    setIsLoading(true);
    try {
      await updateUserEmail({ email });
      toast.success("Email updated successfully");
    } catch (error) {
      toast.error("Failed to update email");
    } finally {
      await update();
      setIsLoading(false);
      reset();
      onOpenChange();
      router.replace("/auth/verify");
    }
  };

  return (
    <>
      <div
        className="justify-between px-5 py-2 my-5 rounded-xl flex cursor-pointer hover:bg-gray-100 transition-colors duration-150"
        onClick={onOpen}
      >
        <h4 className="font-semibold">Email address</h4>
        <p>{email}</p>
      </div>
      <Modal
        hideCloseButton={isLoading}
        isKeyboardDismissDisabled={isLoading}
        isDismissable={!isLoading}
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">Email address</ModalHeader>
              <ModalBody>
                <form>
                  <Input
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    type="email"
                    variant="underlined"
                    label="Email"
                    defaultValue={email}
                    disabled={isLoading}
                  />
                  <p className="text-gray-400 text-sm my-2">
                    You can sign into {COMPANY_NAME} with this email address.
                  </p>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => !isLoading && onClose()}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onClick={handleSubmit(handleUpdateEmail)}
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
