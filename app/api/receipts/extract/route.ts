import { s } from "motion/react-client";
import { NextRequest } from "next/server";

const LLAMA_CLOUD_API_URL = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_URL;
const LLAMA_CLOUD_API_KEY = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_LLAMA_CLOUD_AGENT_ID;

export async function POST(request: NextRequest) {
  const { fileId } = await request.json();

  // run extraction job
  const response = await fetch(`${LLAMA_CLOUD_API_URL}/extraction/jobs`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
    },
    body: JSON.stringify({
      extraction_agent_id: AGENT_ID,
      file_id: fileId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error creating extraction job:", errorData);
    return new Response(JSON.stringify({ error: "Failed to create job" }), {
      status: response.status,
    });
  }

  const receipt: { id: string } = await response.json();

  // we are not awaiting for the extraction job to complete here. This is intentional.
  handleExtractionResult(receipt.id);

  return new Response(JSON.stringify(receipt), { status: 201 });
}

type STATUS = "PENDING" | "SUCCESS" | "ERROR" | "PARTIAL_SUCCESS" | "CANCELLED";

const pollForExtractionStatus = async (jobId: string) => {
  let status: STATUS = "PENDING";
  let result = null;
  const maxRetries = 10;
  let retries = 0;

  while (status === "PENDING" && retries < maxRetries) {
    retries += 1;
    const response = await fetch(
      `${LLAMA_CLOUD_API_URL}/extraction/jobs/${jobId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error polling extraction job:", await response.text());
      throw new Error("Failed to poll extraction job status");
    }

    result = await response.json();
    status = result.status;

    if (status === "PENDING") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (status === "PENDING") {
    throw new Error("Extraction job timed out after maximum retries");
  }

  return status;
};

type ExtractionData = {
  receiptId: string;
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
  total: number;
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
};

type ExtractionResult = {
  run_id: string;
  extraction_agent_id: string;
  data: ExtractionData;
};

const getExtractionResult = async (
  jobId: string
): Promise<ExtractionResult> => {
  const response = await fetch(
    `${LLAMA_CLOUD_API_URL}/extraction/jobs/${jobId}/result`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Error fetching extraction result:", await response.text());
    throw new Error("Failed to fetch extraction result");
  }

  return await response.json();
};

const handleExtractionResult = async (jobId: string) => {
  try {
    const status = await pollForExtractionStatus(jobId);

    if (status === "SUCCESS") {
      console.log("Extraction job completed successfully:", jobId);
      const result = await getExtractionResult(jobId);
      console.log("Extraction result:", result);
    }
  } catch (error) {
    console.error(error);
  }
};
