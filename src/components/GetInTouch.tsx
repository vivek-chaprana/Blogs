import Link from "next/link";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const contactDetails = [
  {
    icon: <MdLocationOn className="text-3xl xs:text-4xl sm:text-5xl " />,
    title: "ADDRESS",
    descHead: "Visit Us.",
    description: "Mehrauli, New Delhi - 110030",
    url: "https://maps.app.goo.gl/8yPAhzNrLGapdwaY6",
  },
  {
    icon: <MdPhone className="text-3xl xs:text-4xl sm:text-5xl " />,
    title: "PHONE",
    descHead: "Call us.",
    description: "Call us at +91 9999999999 for any queries or support.",
    url: "tel:+919999999999",
  },
  {
    icon: <MdEmail className="text-3xl xs:text-4xl sm:text-5xl " />,
    title: "EMAIL",
    descHead: "Email us.",
    description:
      "Send us an email at help@blogs.com and get a response within 24 hours.",
    url: "mailto:help@blogs.com",
  },
];

export default function GetInTouch() {
  return (
    <section id="get-in-touch" className="bg-[#136207]  p-10">
      <h2 className="text-2xl xs:text-3xl font-bold font-serif text-center text-gray-200 my-10">
        Get In Touch
      </h2>

      <div className="flex justify-evenly ">
        <div className="max-w-3xl flex justify-evenly gap-0 lg:gap-10 text-gray-200 flex-col md:flex-row ">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-center items-center max-w-60 px-1 py-3 xs:p-3"
            >
              {/* Icon */}
              <Link
                href={item.url}
                className="rounded-full w-min p-3 sm:p-5 bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm  border border-gray-200 "
              >
                {item.icon}
              </Link>
              <h3 className="font-bold text-lg uppercase my-3">{item.title}</h3>

              <h4 className="text-base font-semibold">{item.descHead}</h4>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
