import { authOptions } from "@/lib/auth/auth-options";
import {
  Button,
  Input,
  NavbarBrand,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import NavbarUserBlock from "./NavbarUserBlock";
import { MdNotificationsNone, MdOutlineNotifications } from "react-icons/md";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <NavbarComponent className="border-b" maxWidth="xl">
      <NavbarBrand className="flex items-center gap-3">
        <Link href="/" className="font-bold text-inherit">
          BLOGS
        </Link>
        <Input
          radius="full"
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-gr/50 ",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<RiSearch2Line size={18} />}
          type="search"
        />
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {!!user ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                href="/new-story"
                variant="light"
                startContent={
                  <BsPencilSquare fill="#101010" className="text-lg" />
                }
              >
                Write
              </Button>
              <Button isIconOnly as={Link} href="#" variant="light">
                <MdNotificationsNone className="text-lg" />
              </Button>
            </NavbarItem>
            <NavbarUserBlock user={user} />
          </>
        ) : (
          <NavbarItem className="flex gap-2">
            <Button as={Link} color="primary" href="/register" variant="flat">
              Sign Up
            </Button>
            <Button
              as={Link}
              color="secondary"
              href="/auth/login"
              variant="flat"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </NavbarComponent>
  );
}
