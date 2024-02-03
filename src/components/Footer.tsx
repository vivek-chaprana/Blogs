import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      {[
        "help",
        "status",
        "about",
        "blog",
        "privacy",
        "terms",
        "copyright",
        "contact",
      ].map((elem, index) => (
        <Link
          href="#"
          key={index}
          className="text-xs font-normal text-gray-600 capitalize hover:text-black underline-offset-2 hover:underline"
        >
          {elem}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
