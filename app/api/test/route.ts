import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const res = await request.json();
  console.log("log: ", res);
  console.log("header:", request.headers.get("userId"))


  return NextResponse.json({ message: "success", data: res });
}
