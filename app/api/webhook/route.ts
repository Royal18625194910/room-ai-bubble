import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

  const body = await req.json();
  // 这里只打印收到的 webhook 数据，实际可根据 event 类型处理订单
  console.log("Received Creem webhook:",body);

  // 你可以在这里根据 body 里的 event/order 信息更新数据库

  return NextResponse.json({ received: true });
};

export const GET = async () => {

  // 这里只打印收到的 webhook 数据，实际可根据 event 类型处理订单
  console.log("11111");

  // 你可以在这里根据 body 里的 event/order 信息更新数据库

  return NextResponse.json({ test: '1' });
};