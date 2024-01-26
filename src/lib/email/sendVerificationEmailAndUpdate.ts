import prisma from "@/prisma";
import { sendVerificationEmail } from ".";

const sendVerificationEmailAndUpdate = async ({ id, email }: { id: string, email: string }) => {

    await prisma.user.update({
        where: {
            id,
        },
        data: {
            lastEmailSent: new Date()
        },
    })

    await sendVerificationEmail({ email });

}

export default sendVerificationEmailAndUpdate;