import { FileClock, LayoutDashboard, Upload, UserIcon } from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarLogo,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./_components/logout-button";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Add Reciept",
    href: "/dashboard/add-receipt",
    icon: (
      <Upload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "History",
    href: "/dashboard/history",
    icon: (
      <FileClock className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

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
      <Sidebar animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <SidebarLogo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <LogoutButton />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: data.user.email || "User",
                href: "#",
                icon: (
                  <UserIcon className="h-5 w-5 shrink-0 rounded-full text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
