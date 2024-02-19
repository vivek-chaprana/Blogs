"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function BlogSortOptions({ isOwner = false }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {/* <Sortoptions /> */}
      {isOwner && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="capitalize ">
              {searchParams.get("status") || "All"}
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            {["All", ...Object.values(PostStatus)].map((status) => (
              <DropdownItem className="capitalize" key={status}>
                <Link
                  className="flex"
                  href={
                    status === "All"
                      ? pathname
                      : {
                          query: { status: status.toLocaleLowerCase() },
                        }
                  }
                >
                  {status.toLocaleLowerCase()}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

function Sortoptions() {}
