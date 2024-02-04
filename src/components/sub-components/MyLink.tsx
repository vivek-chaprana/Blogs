"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface MyLinkParams extends LinkProps {
  append: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function MyLink({
  children,
  append = false,
  href,
  className,
  ...rest
}: MyLinkParams) {
  const pathname = usePathname();
  const [username] = pathname.split("/").filter((path) => path !== "");
  return (
    <Link
      className={className}
      href={append ? `/${username}/${href}` : href}
      {...rest}
    >
      {children}
    </Link>
  );
}
