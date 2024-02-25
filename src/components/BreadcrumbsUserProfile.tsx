"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";

export default function BreadcrumbsUserProfile() {
  const pathname = usePathname();
  const [username, activePath] = pathname.split("/").filter((p) => p !== "");
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Button as={Link} href={`/${username}`} variant="light">
          @{username}
        </Button>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="capitalize">
              {activePath} <BsChevronDown />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem as={Link} href="followers">
              Followers
            </DropdownItem>
            <DropdownItem as={Link} href="following">
              Following
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
