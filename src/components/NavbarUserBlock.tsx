"use client";
import { fallbackImageUrl } from "@/lib/constants";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarUserBlock(props: { user: User }) {
  const {
    user: { name, image, email, username, isVerified },
  } = props ?? {};
  const router = useRouter();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={name ?? username ?? "Anonymous"}
          size="sm"
          src={image ?? fallbackImageUrl}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem as={Link} href={`/${username}`} key="profile">
          My Profile
        </DropdownItem>
        <DropdownItem as={Link} href="/saved" key="saved">
          Saved
        </DropdownItem>
        <DropdownItem as={Link} href="/settings" key="settings">
          Settings
        </DropdownItem>
        <DropdownItem as={Link} href="#" key="help_and_feedback">
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={async () => {
            await signOut({ redirect: false });
            router.refresh();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
