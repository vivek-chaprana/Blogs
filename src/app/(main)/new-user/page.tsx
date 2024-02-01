import { authOptions } from "@/lib/auth/auth-options"
import { getServerSession } from "next-auth"

export default async function NewUser() {
    const { user } = await getServerSession(authOptions) ?? {};
    return (
        <main>
            <h1>Hi, {user?.username}</h1>
        </main>
    )
};
