import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { addReceipt } from "@/lib/data/receipts";

const LLAMA_CLOUD_API_URL = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_URL;
const LLAMA_CLOUD_API_KEY = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_KEY;

export type ExtractionData = Partial<{
  storeName: string;
  storeAddress: any;
  phoneNumber: string;
  date: string;
  time: any;
  items: Array<{
    name: string;
    quantity: any;
    price: number;
    discount: any;
  }>;
  subtotal: number;
  tax: number;
  paymentMethod: string;
  cardNumber: any;
  transactionId: any;
  cashier: any;
  customerName: string;
  customerEmail: string;
  rewardsPointsEarned: any;
  returnsPolicy: any;
  barcode: any;
  notes: string;
}> & { receiptId: string; total: number };

type ExtractionResult = {
  run_id: string;
  extraction_agent_id: string;
  data: ExtractionData;
};

const schema = z.object({
  data: z.object({
    job_id: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  const result = schema.safeParse(await request.json());

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: result.error },
      { status: 400 },
    );
  }
  const {
    data: { job_id: jobId },
  } = result.data;

  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${LLAMA_CLOUD_API_URL}/extraction/jobs/${jobId}/result`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    console.error("Error fetching extraction result:", await response.text());
    throw new Error("Failed to fetch extraction result");
  }

  const { data } = (await response.json()) as ExtractionResult;

  await addReceipt({
    userId: userId,
    total: data?.total.toString(),
    storeName: data?.storeName,
    storeAddress: data?.storeAddress,
    phoneNumber: data?.phoneNumber,
    date: data?.date || new Date().toISOString().split("T")[0], // if date is not provided, use current date
    time: data?.time,
    items: data?.items,
    subtotal: data?.subtotal?.toString(),
    tax: data?.tax?.toString(),
    paymentMethod: data?.paymentMethod,
    cashier: data?.cashier,
    customerName: data?.customerName,
    customerEmail: data?.customerEmail,
  });

  return NextResponse.json({ message: "Receipts updated successfully" });
}
