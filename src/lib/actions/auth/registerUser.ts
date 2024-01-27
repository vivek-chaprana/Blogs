"use server";

import { sendVerificationEmail } from "@/lib/email";
import prisma from "@/prisma";
import { hash } from "bcrypt";

export default async function registerUser(user: { username: string, email: string, password: string }) {

    try {
        const createdUser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                hashedPassword: await hash(user.password, 10)

            }
        })

        await sendVerificationEmail({ email: user.email });

        return createdUser;

    } catch (error: any) {
        if (error?.code === "P2002") {
            throw new Error("Username or email already exists.")
        }
        throw new Error(error?.message);
    }
};
