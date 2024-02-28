import { COMPANY_NAME } from "@/lib/constants";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <main className="prose prose-headings:font-serif max-w-3xl mx-auto py-10 px-2">
      <h1>Terms and Conditions</h1>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to <strong>{COMPANY_NAME}</strong>. By accessing or using our
          website, you agree to comply with and be bound by these Terms and
          Conditions. If you do not agree with any part of these terms, please
          do not use our platform.
        </p>
      </section>

      <section>
        <h2>2. User Conduct</h2>
        <p>
          You agree to use {COMPANY_NAME} responsibly and in compliance with all
          applicable laws. You must not engage in any activities that may harm
          the integrity or functionality of the platform, including but not
          limited to hacking, distributing malware, or violating any
          intellectual property rights.
        </p>
      </section>

      <section>
        <h2>3. Content Ownership and Copyright</h2>
        <p>
          All content published on {COMPANY_NAME}, including articles, images,
          and user-generated content, is protected by copyright laws. You retain
          ownership of the content you submit, but by posting it on our
          platform, you grant {COMPANY_NAME} a non-exclusive, royalty-free,
          worldwide license to use, display, and distribute your content.
        </p>
      </section>

      <section>
        <h2>4. User Accounts</h2>
        <p>
          To access certain features of our platform, you may need to create a
          user account. You are responsible for maintaining the confidentiality
          of your account credentials and for all activities that occur under
          your account. You agree to notify us immediately of any unauthorized
          use of your account.
        </p>
      </section>

      <section>
        <h2>5. Privacy</h2>
        <p>
          Your privacy is important to us. We collect, use, and protect your
          personal information in accordance with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>. By using{" "}
          {COMPANY_NAME}, you consent to the practices outlined in the Privacy
          Policy.
        </p>
      </section>

      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          {COMPANY_NAME} is provided on an "as-is" and "as-available" basis. We
          make no warranties or representations about the accuracy,
          completeness, or reliability of the content on our platform. In no
          event shall {COMPANY_NAME} be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or in any
          way connected with your use of our platform.
        </p>
      </section>

      <section>
        <h2>7. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access
          to {COMPANY_NAME} at our discretion, without notice, for any reason,
          including but not limited to a violation of these Terms and
          Conditions.
        </p>
      </section>
      <section>
        <h2>7. Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of our jurisdiction. Any legal action or
          proceeding arising out of or related to these terms shall be brought
          exclusively in the courts located within our jurisdiction.
        </p>
      </section>
      <section>
        <h2>7. Changes to Terms and Conditions</h2>
        <p>
          We may revise these Terms and Conditions from time to time. The
          revised terms will be effective upon posting on this page. By
          continuing to use {COMPANY_NAME} after the effective date of any
          modifications, you agree to be bound by the revised terms.
        </p>
      </section>

      <section>
        <h2>10. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please don't hesitate to{" "}
          <Link href="/contact">Contact Us</Link> .
        </p>
      </section>

      <footer>
        <p>
          This Terms and Conditions page was last updated on{" "}
          <strong>28 feb 2024</strong>.
        </p>
      </footer>
    </main>
  );
}
