import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import DashboardSidebar from "./_components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <DashboardSidebar />
      <main id="content" tabIndex={-1} className="w-full">{children}</main>
    </div>
  );
}
