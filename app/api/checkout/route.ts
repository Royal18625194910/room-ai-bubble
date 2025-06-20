import { createCheckout } from "@/lib/creemClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, resp: NextResponse) => {
  const res = await createCheckout();
  return NextResponse.json(res);
};
