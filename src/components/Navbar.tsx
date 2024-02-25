import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME } from "@/lib/constants";
import {
  Button,
  NavbarBrand,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { MdNotificationsNone } from "react-icons/md";
import NavbarUserBlock from "./NavbarUserBlock";
import NavbarSearch from "./sub-components/NavbarSearch";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <NavbarComponent className="border-b" maxWidth="xl">
      <NavbarBrand className="flex items-center gap-3 max-w-min">
        <Link href="/" className="font-bold text-inherit">
          {COMPANY_NAME}
        </Link>
      </NavbarBrand>

      <NavbarSearch />

      <NavbarContent justify="end">
        {!!user ? (
          <>
            <NavbarItem className="hidden sm:flex">
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
