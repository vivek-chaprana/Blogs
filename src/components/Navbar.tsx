import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_INITIALS, COMPANY_NAME } from "@/lib/constants";
import prisma from "@/prisma";
import {
  Badge,
  Button,
  NavbarBrand,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsBell, BsPencilSquare } from "react-icons/bs";
import { MdInstallMobile, MdOutlineInstallMobile } from "react-icons/md";
import NavbarUserBlock from "./NavbarUserBlock";
import NavbarDropdownAccount from "./sub-components/NavbarDropdownAccount";
import NavbarSearch from "./sub-components/NavbarSearch";
import PwaInstallButton from "./sub-components/PwaInstallButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  const notificationsCount = await prisma.notification.count({
    where: {
      userId: user?.id,
      seen: false,
    },
  });

  return (
    <NavbarComponent className="border-b" maxWidth="xl">
      <NavbarBrand className="flex items-center gap-3 max-w-min">
        <Link
          href="/"
          className="font-extrabold text-inherit font-brand text-2xl "
        >
          <span className="inline sm:hidden">{COMPANY_INITIALS}</span>
          <span className="hidden sm:inline">{COMPANY_NAME}</span>
        </Link>
      </NavbarBrand>

      <NavbarSearch />

      <NavbarContent justify="end">
        {!!user ? (
          <>
            <NavbarItem className="flex items-center">
              <PwaInstallButton
                variant="light"
                className="sm:hidden border-none text-xl"
                isIconOnly
                radius="md"
              >
                <MdInstallMobile className="text-xl" />
              </PwaInstallButton>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex items-center ">
              <PwaInstallButton
                size="sm"
                className="text-sm hidden sm:inline-flex"
                startContent={<MdOutlineInstallMobile className="text-lg" />}
              />
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

              <Badge
                content={notificationsCount > 0 ? notificationsCount : null}
                size="sm"
                color="danger"
                shape="circle"
                placement="top-right"
              >
                <Button
                  radius="full"
                  isIconOnly
                  as={Link}
                  href="/notifications"
                  variant="light"
                >
                  <BsBell className="text-lg" />
                </Button>
              </Badge>
            </NavbarItem>

            <NavbarUserBlock
              user={user}
              notificationsCount={notificationsCount}
            />
          </>
        ) : (
          <NavbarItem className="flex gap-1 xs:gap-3 text-sm items-center ">
            <PwaInstallButton
              size="sm"
              className="text-sm hidden sm:inline-flex"
              startContent={<MdOutlineInstallMobile className="text-lg" />}
            />
            <PwaInstallButton
              variant="light"
              className="sm:hidden border-none text-xl"
              isIconOnly
              radius="md"
            >
              <MdInstallMobile className="text-xl" />
            </PwaInstallButton>

            <Link
              className="hover:text-black underline-offset-1 hover:underline hidden xs:inline-flex"
              href="/about"
            >
              Our Story
            </Link>

            <NavbarDropdownAccount />
          </NavbarItem>
        )}
      </NavbarContent>
    </NavbarComponent>
  );
}
