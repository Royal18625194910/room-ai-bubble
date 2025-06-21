import { db } from "@/config/db";
import { users } from "@/config/schema";
import { creditPackages } from "@/constants/credits";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

  const webhook = (await req.json())
  // 这里只打印收到的 webhook 数据，实际可根据 event 类型处理订单
  console.log("Received Creem webhook:",webhook);

  // 你可以在这里根据 body 里的 event/order 信息更新数据库
  if (webhook.eventType === "checkout.completed") {
    const userId = webhook.object.metadata.userId;
    const productId = webhook.object.product.id;

    if ( !userId || !productId ) return NextResponse.json({ error: "Invalid pay" }, { status: 501 });
    const addCredits = creditPackages.find(
      (creditPackage) => creditPackage.productId === productId
    )?.credits;

    if (!addCredits) return NextResponse.json({ error: "Invalid pay" }, { status: 501 });
    const userCredits = await db.select({ credits: users.credits}).from(users).where(eq(users.id, userId))
    const res = await db.update(users).set({ credits: userCredits[0].credits + addCredits }).where(eq(users.id, userId))
    console.log('res',res.rowCount)
    if ( res.rowCount === 0) return NextResponse.json({ error: "Invalid pay" }, { status: 502 });
    // Create purchase record in database
    return NextResponse.json({
      success: true,
      message: "pay successfully",
      data: {
        userId,
        productId,
      },
    });
  }

  return NextResponse.json({ success: false, message: "pay failed" });
};

export const GET = async () => {

  // 这里只打印收到的 webhook 数据，实际可根据 event 类型处理订单
  console.log("11111");

  // 你可以在这里根据 body 里的 event/order 信息更新数据库

  return NextResponse.json({ test: '1' });
};