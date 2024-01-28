import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const GettingStarted = dynamic(() => import("@/components/GettingStarted"));

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};
  console.log("Session : ", session);

  let task = !user?.isVerified
    ? "Verify Email"
    : !user?.hasCompletedOnboarding
    ? "Getting Started"
    : "Home";

  return (
    <main>
      <h1>{task}</h1>
      <br />
      <br />
      <div className="flex">
        Name : {user?.name}
        <br />
        Email : {user?.email}
        <br />
        Username : {user?.username}
        <br />
        Role : {user?.role}
        <br />
        Image : {user?.image}
        <br />
        Is Verified : {user?.isVerified ? "Yes" : "No"}
        <br />
        Email Verified : {user?.emailVerified?.toString() ?? "Null"}
      </div>
      {user && !user.hasCompletedOnboarding && (
        <GettingStarted
          shouldOpen={true}
          image={user?.image}
          name={user?.name}
        />
      )}
    </main>
  );
}
