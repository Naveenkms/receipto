import { redirect } from "next/navigation";
import { Suspense } from "react";

import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/page-header";
import DataTable from "./_components/data-table";

export default async function HistoryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full flex flex-col">
      <PageHeader>History</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 overflow-auto">
        <Suspense fallback={<div>Loading table...</div>}>
          <DataTable />
        </Suspense>
      </div>
    </div>
  );
}
