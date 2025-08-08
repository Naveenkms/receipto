import PageHeader from "@/components/page-header";
import SectionCard from "./_components/section-card";
import SectionChart from "./_components/section-chart";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col">
      <PageHeader>Dashboard</PageHeader>
      <div className="py-4 px-4 md:px-6 flex-1 flex flex-col gap-4">
        <SectionCard />
        <SectionChart />
      </div>
    </div>
  );
}
