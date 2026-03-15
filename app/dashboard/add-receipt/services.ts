
import { createClient } from "@/lib/supabase/client";

export const uploadReceiptToStorage = async (file: File) => {
  const supabase = createClient();

  return await supabase.storage.from("reciepts").upload(`${Date.now()}-${file.name}`, file);
};
