import prisma from "@/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

import { compare } from "bcrypt";
import { randomBytes } from "crypto";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import { currentTime } from "../constants";


const getUserFromEmail = async ({ email }: { email: string }) =>
    await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            name: true,
            email: true,
            username: true,
            image: true,
            role: true,
            emailVerified: true,
            isVerified: true,
            hasCompletedOnboarding: true,
        }
    });


export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [

        CredentialsProvider({
            name: "credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-cool-username" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },

            // Handler for when a user submits their credentials
            async authorize(credentials) {

                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username
                    }
                })

                if (!user) return null;
                if (!user?.hashedPassword || !credentials?.password || !credentials?.username) return null;

                const isValid = await compare(credentials.password, user.hashedPassword)
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                    isVerified: user.isVerified,
                    emailVerified: user.emailVerified,
                    hasCompletedOnboarding: user.hasCompletedOnboarding,
                }

            }
        }),

        GithubProvider({

            profile(profile) {
                // console.log(profile);
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "user",
                    isVerified: true,
                    emailVerified: new Date(),
                    hasCompletedOnboarding: false,
                }
            },

            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        EmailProvider({
            type: "email",
            sendVerificationRequest: async ({ identifier: email, url, token, provider }) => { console.log(url) },
            // sendVerificationRequest: async (props) => (await import("@/lib/email/sendVerificationEmail")).default(props),
            secret: process.env.NEXTAUTH_SECRET,
            generateVerificationToken() {
                return randomBytes(32).toString("hex");
            }
        }),
    ],

    callbacks: {

        async signIn({ user, account, email }) {

            if (account?.provider === "email") {

                if (!user?.email) return false;

                const verificationRequest = email?.verificationRequest;
                if (verificationRequest) return true;

                await prisma.user.update({
                    where: {
                        email: user?.email ?? account?.providerAccountId
                    },
                    data: {
                        isVerified: true
                    }

                })
            }

            return true;
        },

        async jwt({ token, user, trigger, session }) {

            if (trigger === "update") {

                console.log("Updating data....", currentTime());

                const foundUser = await getUserFromEmail({ email: token.email ?? user?.email ?? session?.user?.email });
                if (!foundUser) return token;

                token.username = foundUser.username;
                token.image = foundUser.image;
                token.role = foundUser.role;
                token.emailVerified = foundUser.emailVerified;
                token.isVerified = foundUser.isVerified;
                token.hasCompletedOnboarding = foundUser.hasCompletedOnboarding;
                return token;
            }

            if (user) {
                token.username = user.username;
                token.image = user.image;
                token.role = user.role;
                token.emailVerified = user.emailVerified;
                token.isVerified = user.isVerified;
                token.hasCompletedOnboarding = user.hasCompletedOnboarding;
            }
            return token;

        },

        // For CLIENT pages only
        async session({ session, token }) {
            if (session?.user) {
                session.user.username = token.username;
                session.user.image = token.image;
                session.user.role = token.role;
                session.user.emailVerified = token.emailVerified;
                session.user.isVerified = token.isVerified;
                session.user.hasCompletedOnboarding = token.hasCompletedOnboarding;
            }
            return session;
        }
    },


    pages: {
        // signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify', // (used for check email message)
        newUser: '/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
}