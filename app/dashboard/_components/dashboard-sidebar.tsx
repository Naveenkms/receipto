"use client";
import { FileClock, LayoutDashboard, Upload } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarLogo,
} from "@/components/ui/sidebar";

import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { LogoutAlertTrigger, LogoutAlertDialog } from "./logout";
import User from "./user";

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

function DashboardSidebar() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Sidebar animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <SidebarLogo />
            <nav>
              <ul className="mt-8 flex flex-col gap-2">
                <li>
                  <Link
                    ref={ref}
                    href="#content"
                    className="sr-only focus:not-sr-only"
                  >
                    Skip to main content
                  </Link>
                </li>
                {links.map((link, idx) => (
                  <li key={idx}>
                    <SidebarLink link={link} />
                  </li>
                ))}
                <li>
                  <LogoutAlertTrigger onClick={() => setIsAlertOpen(true)} />
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex gap-x-2 justify-between items-center">
            <User />
            <DarkModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>
      <LogoutAlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} />
    </>
  );
}

export default DashboardSidebar;
