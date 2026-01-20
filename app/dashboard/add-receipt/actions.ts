"use server";

import z, { set } from "zod";
import { schema } from "./schema";

export const uploadReciept = async (
  initialState: any,
  values: z.infer<typeof schema>
) => {
  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { fieldErrors: z.flattenError(validatedFields.error).fieldErrors };
  }

  try {
    // const response = await fetch("/api/extract-receipt", {
    //   method: "POST",
    //   body: formData,
    // });
    // if (!response.ok) {
    //   throw new Error("Failed to extract receipt");
    // }
    // const data = await response.json();
    // return data;
  } catch (error) {
    console.error("Error extracting receipt:", error);
    throw error;
  }
};
