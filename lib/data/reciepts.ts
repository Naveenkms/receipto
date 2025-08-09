import "server-only";
import { eq } from "drizzle-orm";

import { InsertReceipt, receipts, SelectReceipt } from "../db/schema/receipts";
import { db } from "../db";
import { verifyUser } from "./verify-user";

export const addReceipt = async (data: InsertReceipt) => {
  return db.insert(receipts).values(data).returning({ receiptId: receipts.id });
};

export const getReceipts = async () => {
  const { data:userData, error } = await verifyUser();

  if (error || !userData?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await db.query.receipts.findMany({
      columns: {
        id: true,
        date: true,
        total: true,
      },
      where: eq(receipts.userId, userData.user.id),
    });

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to get receipts" };
  }
};
