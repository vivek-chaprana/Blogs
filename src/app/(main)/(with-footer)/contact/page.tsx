import ContactForm from "@/components/ContactForm";
import GetInTouch from "@/components/GetInTouch";
import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | " + COMPANY_NAME,
  description:
    "Get in touch with " +
    COMPANY_NAME +
    " for any questions, feedback, or support.",
};

export default function Contact() {
  return (
    <main>
      <GetInTouch />
      <ContactForm />
    </main>
  );
}
