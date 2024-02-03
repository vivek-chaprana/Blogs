import { fallbackImageUrl } from "@/lib/constants";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ProfileSidebar() {
  return (
    <aside className="border-l p-3 px-5 flex flex-col gap-5 flex-auto h-min top-[75px] sticky  ">
      <ProfileSection />
      <FollowingSection />
      <Footer />
    </aside>
  );
}

const ProfileSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <Image
        src={fallbackImageUrl}
        alt="profile"
        width={75}
        height={75}
        className="rounded-full"
      />
      <div>
        <h3 className="font-semibold">Vivek Chaprana</h3>
        <Link
          href="followers"
          className="text-sm text-green-400 hover:text-green-700 "
        >
          8.5k followers
        </Link>
      </div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
        architecto nulla explicabo cum aut mollitia.
      </p>

      <Button color="success" className="text-offWhite w-min" radius="full">
        Follow
      </Button>
    </section>
  );
};

const FollowingSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-semibold">Following</h3>

      <div className="flex flex-col gap-2">
        {new Array(5).fill(0).map((_, i) => (
          <Link
            href="#"
            key={i}
            className="flex gap-3 items-center text-sm group "
          >
            <Image
              src={fallbackImageUrl}
              alt="profile"
              width={25}
              height={25}
              className="rounded-full"
            />
            <p className="group-hover:underline underline-offset-2">
              Vivek Chaprana
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="following"
        className="text-green-600 text-sm hover:text-green-800 transition-colors duration-150"
      >
        See all (6)
      </Link>
    </section>
  );
};
