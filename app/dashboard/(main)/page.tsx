import { Suspense } from "react";

import PageHeader from "@/components/page-header";
import SectionCard from "./_components/section-card";
import SectionChart from "./_components/section-chart";
import { getYearlyExpensesForChart } from "@/lib/data/dashboard";
import SectionCardSkeleton from "./_components/section-card-skeleton";
import SectionChartSkeleton from "./_components/section-chart-skeleton";

export default async function DashboardPage() {
  const chartData = getYearlyExpensesForChart();

  return (
    <div className="w-full flex flex-col h-screen">
      <PageHeader>Dashboard</PageHeader>
      <section aria-label="analytics" className="py-4 px-4 md:px-6 flex-1 flex flex-col gap-4 overflow-auto">
        <Suspense fallback={<SectionCardSkeleton />}>
          <SectionCard />
        </Suspense>
        <Suspense fallback={<SectionChartSkeleton />}>
          <SectionChart data={chartData} />
        </Suspense>
      </section>
    </div>
  );
}
