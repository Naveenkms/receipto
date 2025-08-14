"use server";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/lib/data/verify-user";
import { db } from "@/lib/db";
import { receipts } from "@/lib/db/schema/receipts";
import { revalidatePath } from "next/cache";

export const deleteReceipt = async (currState: any, id: number) => {
  try {
    const { data: userData } = await verifyUser();

    await db
      .delete(receipts)
      .where(and(eq(receipts.id, id), eq(receipts.userId, userData.user.id)))
      .returning({ id: receipts.id });
    revalidatePath("/dashboard/history");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete receipt" };
  }
};
