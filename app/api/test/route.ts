import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const res = await request.json();
  console.log("log: ", res);

  return NextResponse.json({ message: "success", data: res });
}