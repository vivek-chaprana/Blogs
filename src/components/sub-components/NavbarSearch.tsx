"use client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

export default function NavbarSearch() {
  const [search, setSearch] = useState("");
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!search) return;
    if (e.key === "Enter") {
      const searchIs = search.startsWith("@")
        ? "users"
        : search.startsWith("#")
        ? "tags"
        : "posts";

      const query =
        searchIs === "users" || searchIs === "tags" ? search.slice(1) : search;
      router.push(`/search/${query}/${searchIs}`);
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
      onFocusChange={(focused) => setShowHint(focused)}
      description={
        showHint ? (
          <div className="bg-gray-50 border p-2 flex flex-col text-sm gap-1 rounded-lg">
            <p>
              Use <span className="text-black">@</span> for users{" "}
            </p>
            <p>
              Use <span className="text-black">#</span> for tags
            </p>
          </div>
        ) : (
          ""
        )
      }
    />
  );
}
