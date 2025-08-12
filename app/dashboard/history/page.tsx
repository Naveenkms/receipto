import { Suspense } from "react";

import PageHeader from "@/components/page-header";
import DataTable from "./_components/data-table";

export default async function HistoryPage() {
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
