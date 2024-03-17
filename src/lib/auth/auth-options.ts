import { currentTime, providers } from "@/lib/constants";
import prisma from "@/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { randomBytes } from "crypto";
import { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const getUserFromId = async ({ id }: { id: string }) =>
  await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      role: true,
      emailVerified: true,
      isVerified: true,
      hasCompletedOnboarding: true,
      provider: true,
    },
  });

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },

      // Handler for when a user submits their credentials
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            username: {
              equals: credentials.username,
              mode: "insensitive",
            },
          },
        });

        if (!user) return null;
        if (
          !user?.hashedPassword ||
          !credentials?.password ||
          !credentials?.username
        )
          return null;

        const isValid = await compare(
          credentials.password,
          user.hashedPassword
        );
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
          provider: user.provider,
        } as User;
      },
    }),

    GithubProvider({
      async profile(profile) {
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
          provider: providers.GITHUB,
        };
      },

      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,

      async profile(profile) {
        // console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.email.split("@")[0],
          email: profile.email,
          image: profile.picture,
          role: "user",
          isVerified: true,
          emailVerified: new Date(),
          hasCompletedOnboarding: false,
          provider: providers.GOOGLE,
        };
      },
    }),

    EmailProvider({
      type: "email",
      sendVerificationRequest: async ({ url }) => {
        console.log(url);
      },
      secret: process.env.NEXTAUTH_SECRET,
      generateVerificationToken() {
        return randomBytes(32).toString("hex");
      },
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
            email: user?.email ?? account?.providerAccountId,
          },
          data: {
            isVerified: true,
          },
        });
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        console.log("Updating data....", currentTime());

        const foundUser = await getUserFromId({
          id: token.id ?? user?.id ?? session?.user?.id,
        });

        if (!foundUser) return token;
        return { ...token, ...foundUser } as JWT;
      }

      if (user) {
        return { ...token, ...user } as JWT;
      }
      return token;
    },

    // For CLIENT pages only
    async session({ session, token }) {
      if (session?.user) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    // signOut: '/auth/signout',
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify", // (used for check email message)
    // newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
