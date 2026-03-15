"use server";

export type Response = {
  id: string;
  created_at: string;
  name: string;
  external_file_id: string;
  file_size: number;
  file_type: string;
  project_id: string;
};

const LLAMA_CLOUD_API_URL = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_URL;
const LLAMA_CLOUD_API_KEY = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_LLAMA_CLOUD_AGENT_ID;

export const uploadFileToExtractionAgent = async (
  file: File,
): Promise<Response> => {
  const formData = new FormData();
  formData.append("upload_file", file);

  const response = await fetch(`${LLAMA_CLOUD_API_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
      accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = response.statusText;
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const createExtractionJob = async (id: string, userId: string) => {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!host) {
    throw new Error("VERCEL_PROJECT_PRODUCTION_URL is not defined");
  }

  const deploymentUrl = `https://${host}`;
  console.log("deploymentUrl", deploymentUrl);

  return await fetch(`${LLAMA_CLOUD_API_URL}/extraction/jobs`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
    },
    body: JSON.stringify({
      extraction_agent_id: AGENT_ID,
      file_id: id,
      webhook_configurations: [
        {
          webhook_events: [
            "extract.pending",
            "extract.success",
            "extract.error",
          ],
          webhook_url: `${deploymentUrl}/api/receipts`,
          webhook_output_format: "json",
          webhook_headers: {
            userId,
          },
        },
      ],
    }),
  });
};
