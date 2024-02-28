import { footerLinks } from "@/lib/constants";
import { cn } from "@nextui-org/react";
import Link from "next/link";

const Footer = ({ classes }: { classes?: string }) => {
  return (
    <div className={cn("flex gap-2 flex-wrap ", classes)}>
      {footerLinks.map((elem) => (
        <Link
          href={elem.url}
          key={elem.name}
          className="text-xs font-normal text-gray-600 capitalize hover:text-black underline-offset-2 hover:underline"
        >
          {elem.name}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
