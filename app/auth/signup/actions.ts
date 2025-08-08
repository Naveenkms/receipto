"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

import { createClient } from "@/lib/supabase/server";
import { schema, Schema } from "../schema";

export async function signup(currState: any, data: Schema) {
  const supabase = await createClient();

  const validateFields = schema.safeParse(data);
  if (!validateFields.success) {
    return {
      message: "Invalid inputs",
      errors: z.flattenError(validateFields.error).fieldErrors,
    };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup error:", error);
    return {
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
