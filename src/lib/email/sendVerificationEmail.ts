import { sendEmail } from "@/lib/email";
import prisma from "@/prisma";
import { WEBAPP_URL } from "@/lib/constants";
import { randomBytes } from "crypto";
import hashToken from "@/lib/auth/hashToken";

export default async function sendVerificationEmail({ email }: { email: string }) {

    const token = randomBytes(32).toString("hex");

    const hashedToken = hashToken(token)

    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token: hashedToken,
            expires: new Date(Date.now() + 3600 * 1000 * 24) // 1 day
        }
    })

    // Query Params
    const queryParams = new URLSearchParams({
        token,
    });

    const url = `${WEBAPP_URL}/api/auth/verify?${queryParams}`

    try {
        console.log("EMAIL SENT:\n", url)
        // await sendEmail({
        //     to: email,
        //     subject: "Verify your email",
        //     html: `
        //     <h1>Verify your email</h1>
        //     <p>Click the link below to verify your email address.</p>
        //     <a href="${url}">Verify email</a>
        //     <p>Or copy and paste the following link into your browser:</p>
        //     <p>${url}</p>
        //     `
        // })
    } catch (error) {
        throw new Error("Could not send verification email.")
    }

}