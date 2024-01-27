import { authOptions } from "@/lib/auth/auth-options";
import {
  Button,
  NavbarBrand,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import NavbarUserBlock from "./NavbarUserBlock";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <NavbarComponent>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          BLOGS
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem>Write</NavbarItem>
        {!!user ? (
          <NavbarUserBlock user={user} />
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
