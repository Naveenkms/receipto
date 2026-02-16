"use server"

export type Response = {
  id: string;
  created_at: string;
  name: string;
  external_file_id: string;
  file_size: number;
  file_type: string;
  project_id: string;
};

const apiKey = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_LLAMA_CLOUD_API_URL;

export const uploadReceipt = async (file: File): Promise<Response> => {
  const formData = new FormData();
  formData.append("upload_file", file);

  const response = await fetch(`${baseUrl}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = response.statusText;
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return result;
};
