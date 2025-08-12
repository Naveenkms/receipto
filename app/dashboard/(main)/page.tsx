import { Suspense } from "react";

import PageHeader from "@/components/page-header";
import SectionCard from "./_components/section-card";
import SectionChart from "./_components/section-chart";
import { getYearlyExpensesForChart } from "@/lib/data/dashboard";

export default function DashboardPage() {
  const chartData = getYearlyExpensesForChart();

  return (
    <div className="w-full flex flex-col">
      <PageHeader>Dashboard</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 flex flex-col gap-4 overflow-auto">
        <Suspense fallback={<div>Loading table...</div>}>
          <SectionCard />
        </Suspense>
        <Suspense fallback={<div>Loading chart...</div>}>
          <SectionChart data={chartData} />
        </Suspense>
      </div>
    </div>
  );
}
