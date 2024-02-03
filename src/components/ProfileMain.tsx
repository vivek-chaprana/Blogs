import { fallbackCoverImageUrl } from "@/lib/constants";
import { Button, Image, Spinner, Tab, Tabs } from "@nextui-org/react";
import { BsCopy } from "react-icons/bs";
import TabsComponent from "@/components/TabsComponent";

export default function ProfileMain() {
  return (
    <div className="py-10 border ">
      {/* Cover Image */}
      <Image src={fallbackCoverImageUrl} alt="Cover Image" radius="none" />

      <section className="p-5 my-10">
        {/* Main profile */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Vivek Chaprana</h1>
          <Button variant="light" color="success" isIconOnly>
            <BsCopy className="text-teal-700 text-lg" />
          </Button>
        </div>

        {/* Tabs */}
        <TabsComponent />
      </section>
    </div>
  );
}
