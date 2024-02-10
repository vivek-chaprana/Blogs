import { SALT_ROUNDS } from "@/lib/constants";
import prisma from "@/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const pass = await hash("1234", SALT_ROUNDS);

  const common = {
    hasCompletedOnboarding: true,
    hashedPassword: pass,
    emailVerified: new Date(),
    isVerified: true,
  };

  const users = <User[]>[
    {
      name: "Son Goku",
      email: "canhebeatmethough@gmail.com",
      username: "goku",
      image:
        "https://i.pinimg.com/564x/6b/ac/5d/6bac5d7194d29328a6a2df949900828f.jpg",
      coverImage:
        "https://i.pinimg.com/564x/18/9d/93/189d938af00b2ea4261fa832a5acf3fe.jpg",
      bio: "Just a Saiyan navigating through the chaos of Earth, with a power level over 9000 and a love for training that's stronger than my Kamehameha. Saving the world one Spirit Bomb at a time, and always ready to power up for a good laugh. When I'm not busy fighting villains, you can catch me enjoying a Senzu Bean smoothie and searching for the next Dragon Ball. Earth's protector by day, Super Saiyan by night – living the Saiyan life with a side of humor!",
      ...common,
    },
  ];

  const user = await prisma.user.createMany({
    data: users,
  });

  return NextResponse.json({
    message: "Hello World",
    user,
  });
}
