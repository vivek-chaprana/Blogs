"use client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

export default function NavbarSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/${search}/posts`);
    }
  };

  return (
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
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
