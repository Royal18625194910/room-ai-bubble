import { db } from "@/config/db";
import { users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { user } = await req.json();
  const userEmail = user.primaryEmailAddress.emailAddress;
  if (!userEmail) return;
  try {
    const userInfo = await db
      .select()
      .from(users)
      .where(eq(userEmail, users.email));

    console.log("userInfo", userInfo);

    if (userInfo.length) return NextResponse.json({ user: userInfo[0] });

    // if user does not exist, create user
    if (userInfo.length === 0) {
      const res = await db
        .insert(users)
        .values({
          email: userEmail,
          name: user.fullName,
          imageUrl: user.imageUrl,
        })
        .returning();
      console.log("res", res);
      return NextResponse.json({ user: res[0] });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
};
