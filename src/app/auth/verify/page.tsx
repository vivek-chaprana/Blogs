"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  const { data, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 5); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && !!success && update();
    window.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

  if (data?.user?.isVerified) {
    alert("Email Verified!");
    router.push("/");
  }

  if (error) return <h1>{error}</h1>;

  return (
    <main>
      <h1>Verify page</h1>
      <br />
      <p>Verifying {email}</p>
      <br />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <br />
      {/* <button onClick={handleEmailResend}>Resend</button> */}
    </main>
  );
}
