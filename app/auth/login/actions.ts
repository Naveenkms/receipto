"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

import { createClient } from "@/lib/supabase/server";
import { Schema, schema } from "../schema";

export async function login(currState: any, data: Schema) {
  try {
    const supabase = await createClient();
    const validateFields = schema.safeParse(data);

    if (!validateFields.success) {
      return {
        message: "Invalid inputs",
        errors: z.flattenError(validateFields.error).fieldErrors,
      };
    }

    const { error } = await supabase.auth.signInWithPassword(
      validateFields.data,
    );

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
    return { error: "Failed to login" };
  }

  redirect("/dashboard");
}
