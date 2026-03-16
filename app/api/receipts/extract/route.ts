import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { urlToFile } from "@/lib/utils";
import { createExtractionJob, uploadFileToExtractionAgent } from "./service";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      redirect("/auth/login");
    }

    const { filePath } = await request.json();

    const {
      data: { publicUrl },
    } = supabase.storage.from("reciepts").getPublicUrl(filePath);

    if (!publicUrl) {
      throw new Error("Failed to get public url");
    }

    const file = await urlToFile(publicUrl);

    const { id } = await uploadFileToExtractionAgent(file);

    const response = await createExtractionJob(id, data.user.id);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating extraction job:", errorData);
      throw new Error(errorData.error);
    }

    const receipt: { id: string } = await response.json();
    console.log("receipt: ", receipt);

    return new Response(JSON.stringify(receipt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create job" }), {
      status: 500,
    });
  }
}



