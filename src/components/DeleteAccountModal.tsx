"use client";
import deleteUserAccount from "@/lib/actions/deleteUserAccount";
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
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CONFIMATION_WORD = "delete";

const InputSchema = z.object({
  confirm: z
    .string()
    .min(1, `Please type ${CONFIMATION_WORD} to confirm`)
    .refine((confirm) => confirm === CONFIMATION_WORD, {
      message: `Please type ${CONFIMATION_WORD} to confirm`,
    }),
});

type InputType = z.infer<typeof InputSchema>;

export default function DeleteAccountModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<InputType>({
    resolver: zodResolver(InputSchema),
  });

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An error occurred");
    } finally {
      await signOut({ callbackUrl: "/register" });
      onOpenChange();
    }
  };

  return (
    <>
      <div
        className="justify-between px-5 py-2 my-5 rounded-xl flex cursor-pointer hover:bg-gray-100 transition-colors duration-150"
        onClick={onOpen}
      >
        <span>
          <h4 className="font-semibold text-red-600">Delete account</h4>
          <p className="text-sm">
            Permanently delete your account and all your content.
          </p>
        </span>
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">
                Delete Account
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="text-sm flex flex-col gap-3 text-gray-700">
                    <p>
                      We&apos;re sorry to see you go. Once your account is
                      deleted, all of your content will be permanently gone,
                      including your profile, stories, publications, notes, and
                      responses.
                    </p>
                    <p>
                      If you&apos;re not sure about that, we suggest you
                      deactivate or submit a request at help.medium.com instead.
                    </p>
                    <p>To confirm deletion, type “delete” below:</p>
                  </div>
                  <Input
                    {...register("confirm")}
                    isInvalid={!!errors.confirm}
                    errorMessage={errors.confirm?.message}
                    type="email"
                    variant="underlined"
                    placeholder={CONFIMATION_WORD}
                  />
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
                  color="danger"
                  variant="solid"
                  disabled={!!errors.confirm}
                  onClick={handleSubmit(handleDeleteAccount)}
                >
                  Delete My Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
