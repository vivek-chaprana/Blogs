"use client";
import { deleteBlog } from "@/lib/actions/blogs";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { FullBlog } from "@/types/prisma";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  UseDisclosureProps,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCopy, BsPencil, BsThreeDots, BsTrash } from "react-icons/bs";

export default function BlogOptionsPopover({ blog }: { blog: FullBlog }) {
  const router = useRouter();

  function copyLinkToClipboard() {
    const link = `${window.location.origin}/${blog.author.username}/${blog.slug}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  }

  // TODO:
  function changePostStatus() {}

  async function handleDeleteBlog() {
    // FIXME: Change the confirm dialog to a modal, and add a text input to confirm the deletion
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      await deleteBlog(blog.id);
      toast.success("Story deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  }

  return (
    <>
      <Popover>
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
              description="edit the story"
            >
              Edit blog
            </ListboxItem>
            <ListboxItem
              key="copy"
              startContent={<BsCopy />}
              onClick={copyLinkToClipboard}
              description="copy link to clipboard"
            >
              Copy link
            </ListboxItem>

            <ListboxItem
              key="copy"
              color="danger"
              onClick={handleDeleteBlog}
              description="permanently delete story"
              startContent={<BsTrash />}
            >
              Delete story
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </>
  );
}

export function DeleteBlogModal({ modal }: { modal: UseDisclosureProps }) {
  const { isOpen, onOpen, onClose } = modal;
  return (
    <Modal isOpen={isOpen}>
      <ModalBody>
        <p>Are you sure you want to delete this story?</p>
        <p>
          This will delete the story and it will be no longer available to any
          user.
        </p>
        <p>To confirm please write the following text : </p>
        <p>
          <strong>delete my story</strong>
        </p>

        <Input label="Confirm" variant="bordered" type="text" />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="danger">Delete</Button>
      </ModalFooter>
    </Modal>
  );
}
