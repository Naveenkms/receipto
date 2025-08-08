import "server-only";

import { InsertReceipt, receipts } from "../db/schema/receipts";
import { db } from "../db";
import { verifyUser } from "./verify-user";

export const addReceipt = async (data: InsertReceipt) => {
  return db.insert(receipts).values(data).returning({ receiptId: receipts.id });
};

export const getReceipts = async () => {
  const { data, error } = await verifyUser();

  if (error || !data?.user) return null;

  try {
    return await db.query.receipts.findMany({
      // columns: {
      //   id: true,
      //   userId: true,
      //   storeName: true,
      // },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
