import { createCheckout } from "@/lib/creemClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, resp: NextResponse) => {
  const userId = req.nextUrl.searchParams.get("userId")
  const productId = req.nextUrl.searchParams.get("productId")
  // Check if userId and productId are provided
  if (!userId || !productId) {
    return NextResponse.json({ error: "Missing userId or productId", status: 400 });
  }
  console.log("req",req.nextUrl.searchParams);
  const res = await createCheckout({metadata: {userId},productId});
  return NextResponse.json(res);
};
