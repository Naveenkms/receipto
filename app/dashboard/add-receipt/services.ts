//     // const result = await response.json();
//     // console.log(result);
// // Make a fetch call to create an extraction job
// // const extractionAgentId = process.env.NEXT_PUBLIC_LLAMA_CLOUD_AGENT_ID;
// // const fileId = "8d850108-f506-45e4-81c1-c1b7d1f7aa3e";

import { createClient } from "../../../lib/supabase/client";

// // const extractionResponse = await fetch(
// //   "https://api.cloud.llamaindex.ai/api/v1/extraction/jobs",
// //   {
// //   method: "POST",
// //   headers: {
// //     Authorization: `Bearer ${apiKey}`,
// //     accept: "application/json",
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({
// //     extraction_agent_id: extractionAgentId,
// //     file_id: fileId,
// //   }),
// //   }
// // );
// // const extractionResult = await extractionResponse.json();
// // console.log(extractionResult);

// // Fetch extraction job result
// // Replace {$JOB_ID} with your actual job ID
// const jobId = "ec5efc08-0b0c-4c1f-8c78-e2c9564cb2f5";
// const resultResponse = await fetch(
//   `https://api.cloud.llamaindex.ai/api/v1/extraction/jobs/${jobId}/result`,
//   {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//   }
// );
// const resultData = await resultResponse.json();
// console.log(resultData);
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
