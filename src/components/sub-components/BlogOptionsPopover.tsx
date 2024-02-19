"use client";
import { deleteBlog } from "@/lib/actions/blogs";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { FullBlog } from "@/types/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  UseDisclosureProps,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCopy, BsPencil, BsThreeDots, BsTrash } from "react-icons/bs";
import { z } from "zod";

const CONFIRM_TEXT = "delete my story";

export default function BlogOptionsPopover({ blog }: { blog: FullBlog }) {
  const deleteBlogModal = useDisclosure();
  const [popOverIsOpen, setPopOverIsOpen] = useState(false);

  function copyLinkToClipboard() {
    const link = `${window.location.origin}/${blog.author.username}/${blog.slug}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <Popover
        isOpen={popOverIsOpen}
        onOpenChange={(open) => setPopOverIsOpen(open)}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="text-lg text-gray-500"
          >
            <BsThreeDots />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox className="capitalize">
            <ListboxItem
              as={Link}
              href={`/${blog.author.username}/${blog.slug}/edit`}
              startContent={<BsPencil />}
              key="edit"
            >
              Edit blog
            </ListboxItem>
            <ListboxItem
              key="copy"
              startContent={<BsCopy />}
              onClick={copyLinkToClipboard}
            >
              Copy link
            </ListboxItem>

            <ListboxItem
              key="copy"
              color="danger"
              onClick={() => {
                setPopOverIsOpen(false);
                deleteBlogModal.onOpen();
              }}
              startContent={<BsTrash />}
            >
              Delete story
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>

      <DeleteBlogModal modal={deleteBlogModal} blogId={blog.id} />
    </>
  );
}

export function DeleteBlogModal({
  modal,
  blogId,
}: {
  modal: UseDisclosureProps;
  blogId: string;
}) {
  const FormSchema = z.object({
    confirm: z.string().refine((v) => v === CONFIRM_TEXT, {
      message: "Please write " + CONFIRM_TEXT + " to confirm.",
    }),
  });

  type InputType = z.infer<typeof FormSchema>;

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteBlog() {
    setIsLoading(true);
    try {
      await deleteBlog(blogId);
      toast.success("Story deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      reset();
      modal?.onClose && modal.onClose();
      setIsLoading(false);
    }
  }

  return (
    <Modal
      size="lg"
      isOpen={modal.isOpen}
      hideCloseButton={isLoading}
      onClose={modal.onClose}
      isKeyboardDismissDisabled={isLoading}
      isDismissable={!isLoading}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Story
            </ModalHeader>
            <ModalBody className="flex flex-col gap-3 text-base">
              <p>Are you sure you want to delete this story?</p>
              <p>
                This will delete the story and it will be no longer available to
                any user.
              </p>
              <p>
                To confirm please write the following text:
                <strong> delete my story</strong>
              </p>

              <Input
                {...register("confirm")}
                errorMessage={errors.confirm?.message}
                isInvalid={!!errors.confirm}
                variant="bordered"
                type="text"
                placeholder={CONFIRM_TEXT}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onClick={() => !isLoading && modal?.onClose && modal.onClose()}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                isLoading={isLoading}
                onClick={handleSubmit(handleDeleteBlog)}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
