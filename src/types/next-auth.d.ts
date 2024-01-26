import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            username: string;
            role: string;
            isVerified: boolean;
            emailVerified: Date | null | undefined;
            image: string | null | undefined;
        } & DefaultUser;
    }

    interface User extends DefaultUser {
        username: string;
        role: string;
        isVerified: boolean;
        emailVerified: Date | null | undefined;
        image: string | null | undefined;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        email: string;
        role: string;
        username: string;
        emailVerified: Date | null | undefined;
        isVerified: boolean;
        image: string | null | undefined;
    }
}