"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";

export default function ParamsTabs({
  base,
  links,
  activeStyles = "bg-gray-200 ",
}: {
  base: string;
  links: { name: string; params: string }[];
  activeStyles?: string;
}) {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter");

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" className="capitalize">
            {!activeFilter || activeFilter === "/" ? "All" : activeFilter}{" "}
            <BsChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {links.map((link) => (
            <DropdownItem
              key={link.params}
              className={`${
                activeFilter === link.params ||
                (!activeFilter && link.params === "/")
                  ? activeStyles
                  : ""
              }`}
            >
              <Link
                key={link.params}
                href={
                  link.params === "/"
                    ? base
                    : {
                        pathname: base,
                        query: {
                          filter: link.params,
                        },
                      }
                }
                className="flex"
              >
                {link.name}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
