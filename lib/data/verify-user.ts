import { cache } from "react";
import { createClient } from "../supabase/server";

export const verifyUser = cache(async () => {
  const supabase = await createClient();
  
  return await supabase.auth.getUser();
});
