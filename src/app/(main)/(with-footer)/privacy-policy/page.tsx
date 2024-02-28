import { COMPANY_NAME } from "@/lib/constants";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="prose prose-headings:font-serif max-w-3xl mx-auto py-10 px-2">
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy outlines how {COMPANY_NAME} collects, uses, and
          protects your personal information on our website.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect both personally identifiable and non-personally
          identifiable information through various means, such as user
          registrations, cookies, and analytics tools. The types of information
          collected may include:
        </p>

        <article className="ps-5">
          <h3>1.1 Personal Information</h3>
          <p>
            We may collect personal information when you create an account or
            interact with our services. This includes, but is not limited to,
            your name, email address, and other contact details. This
            information is used for authentication, communication, and
            personalized user experiences.
          </p>
        </article>

        <article className="ps-5">
          <h3>1.2 Usage Information</h3>
          <p>
            We automatically collect information about how you interact with our
            website. This includes data such as the pages you visit, the time
            spent on each page, and other analytics information. We utilize this
            data to enhance our services, improve user experience, and analyze
            trends.
          </p>
        </article>

        <article className="ps-5">
          <h3>1.3 Device and Browser Information</h3>
          <p>
            For security and optimization purposes, we may collect information
            about the device and browser you use to access our website. This may
            include your IP address, device type, and browser type. This data
            helps us ensure the security of your account and customize the
            presentation of our content to suit your device.
          </p>
        </article>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>
          We collect information to enhance your experience on our platform.
          This includes personal information you provide voluntarily and data
          collected through automated means, such as cookies. We use this
          information to customize content, improve our services, and
          communicate with you about updates, new features, or relevant content.
        </p>
      </section>

      <section>
        <h2>4. Information Sharing</h2>
        <p>
          Your privacy is important to us. We do not sell, trade, or otherwise
          transfer your personal information to third parties without your
          explicit consent. However, we may share aggregated, non-personal
          information for analytical purposes.
        </p>
      </section>

      <section>
        <h2>5. Security</h2>
        <p>
          We take the security of your information seriously. We implement
          industry-standard measures to protect your data from unauthorized
          access, disclosure, alteration, and destruction. However, no method of
          transmission over the internet or electronic storage is entirely
          secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can manage your privacy settings and preferences
          within your account. If you have any questions or concerns regarding
          your data, please contact our support team.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this page periodically for the
          latest information on our privacy practices.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions, comments, or concerns regarding this
          Privacy Policy or our privacy practices, please don't hesitate to{" "}
          <Link href="/contact">Contact Us</Link> .
        </p>
      </section>

      <footer>
        <p>
          This Privacy Policy page was last updated on{" "}
          <strong>28 feb 2024</strong>.
        </p>
      </footer>
    </main>
  );
}
