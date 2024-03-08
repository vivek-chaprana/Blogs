import ContactForm from "@/components/ContactForm";
import GetInTouch from "@/components/GetInTouch";
import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

export const metadata: Metadata = {
  title: "Contact | " + COMPANY_NAME,
  description:
    "Get in touch with " +
    COMPANY_NAME +
    " for any questions, feedback, or support.",
};

export default async function Contact() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <GetInTouch />
      <ContactForm user={session?.user} />
    </main>
  );
}
