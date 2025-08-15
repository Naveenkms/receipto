"use client";
import { ArrowLeft } from "lucide-react";
import { ComponentProps, useActionState, useState } from "react";
import { redirect } from "next/navigation";

import { SidebarButton, useSidebar } from "@/components/ui/sidebar";
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

function LogoutAlertTrigger({ onClick }: { onClick: () => void }) {
  const { setOpen } = useSidebar();
  return (
    <SidebarButton
      onClick={() => {
        setOpen(false);
        onClick();
      }}
      content={{
        label: "Logout",
        icon: (
          <ArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      }}
    />
  );
}

function LogoutAlertDialog(props: ComponentProps<typeof AlertDialog>) {
  const [state, action, pending] = useActionState(logout, null);

  if (state?.error) {
    redirect("/error");
  }

  return (
    <AlertDialog {...props}>
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
            <Button
              variant="destructive"
              disabled={pending}
              type="submit"
              className="w-full"
            >
              Confirm
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { LogoutAlertTrigger, LogoutAlertDialog };
