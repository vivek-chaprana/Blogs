import ContactForm from "@/components/ContactForm";
import GetInTouch from "@/components/GetInTouch";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export default async function Help() {
  const session = await getServerSession(authOptions);
  return (
    <main className="">
      <section className="py-10 flex flex-col gap-5 max-w-4xl mx-auto  ">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center">
          How can we help you ?
        </h1>
        <p className=" text-sm xs:text-base text-center text-gray-500 ">
          Welcome to our Help Center! Discover comprehensive solutions and
          guides for everything from account setup to advanced features. If you
          have any questions or require assistance, our dedicated support team
          is at your service.
        </p>
      </section>

      <GetInTouch />

      <ContactForm user={session?.user} />
    </main>
  );
}
