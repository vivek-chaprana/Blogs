import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_INITIALS, COMPANY_NAME } from "@/lib/constants";
import {
  Button,
  NavbarBrand,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsBell, BsPencilSquare } from "react-icons/bs";
import NavbarUserBlock from "./NavbarUserBlock";
import NavbarSearch from "./sub-components/NavbarSearch";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <NavbarComponent className="border-b" maxWidth="xl">
      <NavbarBrand className="flex items-center gap-3 max-w-min">
        <Link href="/" className="font-bold text-inherit font-brand text-2xl">
          <span className="inline sm:hidden">{COMPANY_INITIALS}</span>
          <span className="hidden sm:inline">{COMPANY_NAME}</span>
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
                <BsBell className="text-lg" />
              </Button>
            </NavbarItem>

            <NavbarUserBlock user={user} />
          </>
        ) : (
          <NavbarItem className="flex gap-2 text-sm items-center ">
            <Link
              className="hover:text-black underline-offset-1 hover:underline hidden xs:inline-flex"
              href="/about"
            >
              Our Story
            </Link>
            <Button
              as={Link}
              href="/auth/login"
              variant="light"
              className="hidden sm:inline-flex"
            >
              Sign in{" "}
            </Button>
            <Button
              as={Link}
              href="/register"
              className="text-white bg-dark-200"
              radius="full"
            >
              Get started
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </NavbarComponent>
  );
}
