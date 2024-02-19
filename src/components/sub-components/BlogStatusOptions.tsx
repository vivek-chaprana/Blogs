"use client";

import { changeStatus } from "@/lib/actions/blogs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCheck, BsToggles } from "react-icons/bs";

export default function BlogStatusOptions({
  blogStatus,
  blogId,
}: {
  blogStatus: string;
  blogId: string;
}) {
  const route = useRouter();
  const handleChangeStatus = async (status: PostStatus) => {
    try {
      await changeStatus(blogId, status);
      toast.success("Status changed to " + status.toLocaleLowerCase());
      route.refresh();
    } catch (e) {
      toast.error("Failed to change status");
    }
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly className="capitalize">
          <BsToggles className="text-lg" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
      >
        {Object.values(PostStatus).map((status) => (
          <DropdownItem
            onClick={() => handleChangeStatus(status)}
            className={cn("capitalize", blogStatus === status && "bg-gray-200")}
            key={status}
            endContent={
              status === blogStatus && <BsCheck className="text-lg" />
            }
          >
            {status.toLocaleLowerCase()}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
