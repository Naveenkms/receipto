import { Suspense } from "react";

import PageHeader from "@/components/page-header";
import DataTable from "./_components/data-table";
import DataTableSkeleton from "./_components/data-table-skeleton";

export default async function HistoryPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader>History</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 overflow-auto">
        <Suspense fallback={<DataTableSkeleton />}>
          <DataTable />
        </Suspense>
      </div>
    </div>
  );
}
