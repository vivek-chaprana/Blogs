import Link from "next/link";
import { BsDot } from "react-icons/bs";

export default function ProfileAbout() {
  return (
    <div className="my-5">
      {/* About */}
      <div className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        deleniti culpa unde perferendis tempora totam. Tempora iusto,
        repudiandae voluptatum reiciendis temporibus recusandae similique
        veniam! Dignissimos numquam veritatis quisquam est laudantium!
      </div>

      {/* Footer */}
      <div className="flex flex-col py-5 gap-5">
        <p className="text-sm">Member since January 2024.</p>
        <span className="flex gap-2 items-center text-sm text-green-700 ">
          <Link
            className="hover:text-green-900 transition-colors duration-150"
            href="followers"
          >
            2.5K Followers
          </Link>
          <BsDot />
          <Link
            className="hover:text-green-900 transition-colors duration-150"
            href="following"
          >
            8.5K Following
          </Link>
        </span>
      </div>
    </div>
  );
}
