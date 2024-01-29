import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultUser & {
            id: string;
            name: string;
            email: string;
            role: string;
            username: string;
            emailVerified: Date | null;
            isVerified: boolean;
            image: string | null;
            hasCompletedOnboarding: boolean;
            provider: string;
        };
    }

    interface User extends DefaultUser {
        id: string;
        name: string;
        email: string;
        role: string;
        username: string;
        emailVerified: Date | null;
        isVerified: boolean;
        image: string | null;
        hasCompletedOnboarding: boolean;
        provider: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        name: string;
        email: string;
        role: string;
        username: string;
        emailVerified: Date | null;
        isVerified: boolean;
        image: string | null;
        hasCompletedOnboarding: boolean;
        provider: string;
    }
}