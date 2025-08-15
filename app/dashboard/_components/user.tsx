"use client";
import { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";

import { SidebarLink } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";

function User() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await createClient().auth.getUser();
      if (error) {
        console.error(error);
      }

      setEmail(data.user?.email ?? null);
    };
    fetchProfileName();
  }, []);
  return (
    <SidebarLink
      link={{
        label: email ?? "User",
        href: "#",
        icon: (
          <UserIcon className="h-5 w-5 shrink-0 rounded-full text-neutral-700 dark:text-neutral-200" />
        ),
      }}
    />
  );
}

export default User;
