import { redirect } from "next/navigation";

import { getReceipts } from "@/lib/data/reciepts";
import { createClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const receipts = await getReceipts();

  if (!receipts) return null;

  return (
    <div>
      {receipts.map((receipt) => (
        <div key={receipt.id}>{receipt.storeName}</div>
      ))}
    </div>
  );
}
