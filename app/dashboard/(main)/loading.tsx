import PageHeader from "@/components/page-header";
import SectionCardSkeleton from "./_components/section-card-skeleton";
import SectionChartSkeleton from "./_components/section-chart-skeleton";

export default function loading() {
  return (
    <div className="w-full flex flex-col">
      <PageHeader>Dashboard</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 flex flex-col gap-4 overflow-auto">
        <SectionCardSkeleton />
        <SectionChartSkeleton />
      </div>
    </div>
  );
}
