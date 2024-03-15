"use client";
import getTopics from "@/lib/actions/getTopics";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Topic } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function TopicsSearchBar() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getTopics().then((topics) => setTopics(topics));
  }, []);

  return (
    <Autocomplete
      defaultItems={topics}
      className="w-4/5 xs:w-3/6"
      radius="full"
      startContent={<BsSearch />}
      placeholder="Search all topics"
      aria-label="Search all topics"
      classNames={{
        selectorButton: "hidden",
      }}
    >
      {(topic) => (
        <AutocompleteItem
          as={Link}
          href={`/topics/${topic.slug}`}
          key={topic.id}
        >
          {topic.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
