// import { authOptions } from "@/lib/auth/auth-options";
// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth/next";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.url === "/api/auth/session?update") {

        


//         // Session call updates cookie, redirect to / afterwards
//         const endResponse = res.end as (cb?: () => void) => void;
//         res.end = (cb: () => void) => {
//             res.setHeader("Location", "/");
//             res.status(301);
//             return endResponse.apply(res, [cb]);
//         };
//         return NextAuth(req, res, authOptions);
//     } else {
//         return NextAuth(req, res, authOptions);
//     }
// }