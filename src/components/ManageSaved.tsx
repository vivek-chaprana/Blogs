"use client";

import removeMultipleFromSaved from "@/lib/actions/removeMultipleFromSaved";
import { FullBlog } from "@/types/prisma";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";

export default function ManageSaved({
  blogs,
  userId,
}: {
  blogs: FullBlog[];
  userId: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const manage = searchParams.get("manage");
  const router = useRouter();

  const handleRemoveFromSaved = async () => {
    if (!selected.length) return;
    setIsLoading(true);
    try {
      await removeMultipleFromSaved({ blogs: selected });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
      setSelected([]);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-3 py-5 sm:py-10">
      <CheckboxGroup
        label={manage && "Select stories to remove "}
        value={selected}
        color="primary"
        onValueChange={setSelected}
      >
        {manage && (
          <div className="flex ">
            {selected.length !== blogs.length ? (
              <Button
                variant="light"
                color="primary"
                onClick={() =>
                  !isLoading && setSelected([...blogs.map((blog) => blog.id)])
                }
              >
                Select All
              </Button>
            ) : (
              <Button
                variant="light"
                color="primary"
                onClick={() => !isLoading && setSelected([])}
              >
                Unselect All
              </Button>
            )}
            <Button
              className="ms-auto"
              variant="light"
              color="warning"
              as={Link}
              href="/saved"
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              color="danger"
              onClick={handleRemoveFromSaved}
              isLoading={isLoading}
              disabled={!selected.length}
            >
              Remove
            </Button>
          </div>
        )}

        {!!blogs.length &&
          blogs.map((blog) => (
            <Checkbox
              key={blog.id}
              value={blog.id}
              color="primary"
              classNames={{
                wrapper: manage ? "" : "hidden",
                label: "px-5 ",
              }}
            >
              <BlogCard blog={blog} userId={userId} linksDisabled={!!manage} />
            </Checkbox>
          ))}
      </CheckboxGroup>
    </div>
  );
}
