"use server";

import {
  ContactFormSubmissionAdminEmail,
  ContactFormSubmissionUserEmail,
} from "@/components/email-templates/ContactFormSubmissionEmails";
import { ADMIN_EMAIL } from "../constants";
import { sendEmail } from "../email";

export default async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New contact form submission: ${data.subject}`,
      html: await ContactFormSubmissionAdminEmail(data),
    });

    await sendEmail({
      to: data.email,
      subject: `We received your message will get back to you soon`,
      html: ContactFormSubmissionUserEmail(data),
    });
  } catch (err) {
    throw new Error("Failed to submit contact form");
  }
}
