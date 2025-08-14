"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const logout = async (currState: any, formData: FormData) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return { error: error.message };
  }

  redirect("/auth/login");
};
