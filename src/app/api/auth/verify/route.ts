import hashToken from "@/lib/auth/hashToken";
import { WEBAPP_URL } from "@/lib/constants";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // FIXME: I can use useEffect to updateSession and redirect to / if user is logged in from verify page!
  // This will only update user once , this workaround is not good enough!

  const token = request.nextUrl.searchParams.get("token");

  if (!token)
    return NextResponse.redirect(
      `${WEBAPP_URL}/auth/verify?error=token-is-missing`
    );

  const hashedToken = hashToken(token);

  const foundToken = await prisma.verificationToken.findUnique({
    where: {
      token: hashedToken,
    },
  });

  if (!foundToken)
    return NextResponse.redirect(
      `${WEBAPP_URL}/auth/verify&error=token-not-found`
    );

  if (foundToken.expires < new Date())
    return NextResponse.redirect(
      `${WEBAPP_URL}/auth/verify?email=${foundToken.identifier}&error=token-expired`
    );

  await prisma.user.update({
    where: {
      email: foundToken.identifier,
    },
    data: {
      emailVerified: new Date(),
      isVerified: true,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: foundToken.id,
    },
  });

  return NextResponse.redirect(
    `${WEBAPP_URL}/auth/verify?email=${foundToken.identifier}&success=true`
  );
}
