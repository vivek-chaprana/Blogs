import { cn } from "@nextui-org/react";
import Link from "next/link";

const Footer = ({ classes }: { classes?: string }) => {
  return (
    <div className={cn("flex gap-2 flex-wrap ", classes)}>
      {[
        "help",
        "status",
        "about",
        "blog",
        "privacy",
        "terms",
        "copyright",
        "contact",
      ].map((elem) => (
        <Link
          href="#"
          key={elem}
          className="text-xs font-normal text-gray-600 capitalize hover:text-black underline-offset-2 hover:underline"
        >
          {elem}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
