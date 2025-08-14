import PageHeader from "@/components/page-header";
import DataTableSkeleton from "./_components/data-table-skeleton";

export default function loading() {
  return (
    <div className="w-full flex flex-col">
      <PageHeader>History</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 overflow-auto">
        <DataTableSkeleton />
      </div>
    </div>
  );
}
