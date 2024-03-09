"use client";
import { fallbackImageUrl } from "@/lib/constants";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BsBell,
  BsBookmark,
  BsBoxArrowRight,
  BsGear,
  BsPencil,
  BsPerson,
  BsQuestionCircle,
  BsStar,
  BsStars,
} from "react-icons/bs";

export default function NavbarUserBlock(props: {
  user: User;
  notificationsCount: number;
}) {
  const {
    user: { name, image, email, username },
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
        <DropdownItem key="profile-details" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>

        <DropdownSection showDivider className="sm:hidden">
          <DropdownItem
            as={Link}
            href="/new-story"
            key="new-story"
            startContent={<BsPencil />}
          >
            New Story
          </DropdownItem>

          <DropdownItem
            as={Link}
            href="/notifications"
            key="notifications"
            startContent={
              <Badge
                content={
                  props.notificationsCount > 0 ? props.notificationsCount : null
                }
                size="sm"
                color="danger"
                placement="top-right"
              >
                <BsBell />
              </Badge>
            }
          >
            Notifications
          </DropdownItem>

          <DropdownItem
            as={Link}
            startContent={<BsStar />}
            href="/recommendations"
            key="recommendations"
          >
            Recommendations
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          as={Link}
          href={`/${username}`}
          key="profile"
          startContent={<BsPerson />}
        >
          My Profile
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/saved"
          key="saved"
          startContent={<BsBookmark />}
        >
          Saved
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/settings"
          key="settings"
          startContent={<BsGear />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/help"
          key="help_and_feedback"
          startContent={<BsQuestionCircle />}
        >
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={async () => {
            await signOut({ redirect: false });
            router.refresh();
          }}
          startContent={<BsBoxArrowRight />}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
