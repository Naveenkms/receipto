"use client";
import { ArrowLeft } from "lucide-react";
import { useActionState, useState } from "react";
import { redirect } from "next/navigation";

import { SidebarButton } from "@/components/ui/sidebar";
import { logout } from "../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function LogoutButton() {
  const [open, setOpen] = useState(false);

  const [state, action, pending] = useActionState(logout, null);

  if (state?.error) {
    redirect("/error");
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <SidebarButton
        onClick={() => {
          console.log("logout");
          setOpen(true);
        }}
        content={{
          label: "Logout",
          icon: (
            <ArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          ),
        }}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You will be logged out of your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={action}>
            <Button variant="destructive" disabled={pending}>
              Confirm
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutButton;
