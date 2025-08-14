"use client";
import { startTransition, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { deleteReceipt } from "../actions";

function Delete({ id }: { id: number }) {
  const [state, action, pending] = useActionState(deleteReceipt, null);

  return (
    <Button
      onClick={() => startTransition(() => action(id))}
      variant="destructive"
      disabled={pending}
      type="button"
    >
      Delete
    </Button>
  );
}

export default Delete;
