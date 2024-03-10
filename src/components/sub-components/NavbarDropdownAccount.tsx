"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";

export default function NavbarDropdownAccount() {
  return (
    <Dropdown
      aria-label="Account"
      size="sm"
      classNames={{
        content: "py-1 px-1 text-start min-w-max ",
      }}
    >
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <BsPerson className="text-xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Acoount Menu">
        <DropdownItem
          aria-label="Sign in"
          as={Link}
          href="/auth/login"
          className=" data-[hover]:bg-dark-200 data-[hover]:text-gray-100 capitalize"
        >
          Sign in
        </DropdownItem>

        <DropdownItem
          aria-label="Get started"
          as={Link}
          href="/register"
          className=" data-[hover]:bg-dark-200 data-[hover]:text-gray-100 capitalize"
        >
          Get started
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
