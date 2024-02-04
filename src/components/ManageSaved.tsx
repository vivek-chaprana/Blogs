"use client";

import { BlogWithAuthor } from "@/types/prisma";
import { Button, Checkbox, CheckboxGroup, select } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ManageSaved({ blogs }: { blogs: BlogPost[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const manage = searchParams.get("manage");

  return (
    <div className="flex flex-col gap-3 py-10">
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
                //   onClick={() => setSelected([...blogs.map((blog) => blog.id)])} : WILL work for real data
                onClick={() =>
                  setSelected([
                    ...blogs.map((blog, index) => blog.id + "-" + index),
                  ])
                }
              >
                Select All
              </Button>
            ) : (
              <Button
                variant="light"
                color="primary"
                onClick={() => setSelected([])}
              >
                Unselect All
              </Button>
            )}
            <Link className="ms-auto" href={{ pathname: "/saved" }}>
              <Button variant="light" color="warning">
                Cancel
              </Button>
            </Link>
            <Button variant="light" color="danger">
              Remove
            </Button>
          </div>
        )}

        {!!blogs.length &&
          blogs.map((blog, index) => (
            <Checkbox
              key={blog.id}
              value={blog.id + "-" + index}
              classNames={{
                wrapper: manage ? "" : "hidden",
                label: "px-5 ",
              }}
            >
              <BlogCard
                blog={blog as BlogWithAuthor}
                linksDisabled={!!manage}
              />
            </Checkbox>
          ))}
      </CheckboxGroup>
    </div>
  );
}
