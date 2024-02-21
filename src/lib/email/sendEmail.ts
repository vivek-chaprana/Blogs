import nodemailer, {
  SendMailOptions,
  SentMessageInfo,
  Transporter,
} from "nodemailer";

export default async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const options: SendMailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: to ?? process.env.EMAIL_SERVER_USER,
    subject,
    html,
  };

  // transporter.sendMail(
  //   options,
  //   function (err: Error | null, info: SentMessageInfo) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log("Email sent: " + info.response);
  //     return true;
  //   }
  // );

  // To fix on vercel deployment, trying this!
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      options,
      function (err: Error | null, info: SentMessageInfo) {
        if (err) {
          reject(err);
          throw err;
        }
        console.info("Email sent: " + info.response);
        resolve(info);
        return true;
      }
    );
  });
}
