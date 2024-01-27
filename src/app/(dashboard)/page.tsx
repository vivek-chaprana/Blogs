import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};
  console.log("Session : ", session);

  let task = !user?.isVerified ? "Verify Email" : !user?.hasCompletedOnboarding ? "Getting Started" : "Home";

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
    </main>
  );
}
