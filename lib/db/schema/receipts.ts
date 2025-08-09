import {
  date,
  decimal,
  jsonb,
  pgPolicy,
  pgTable,
  serial,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

import { timestamps } from "../helpers/columns";
import { ExtractionData } from "@/app/api/receipts/extract/route";
import { eq, sql } from "drizzle-orm";

export const receipts = pgTable(
  "receipts",
  {
    id: serial().primaryKey(),
    userId: uuid()
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    storeName: text(),
    storeAddress: text(),
    phoneNumber: text(),
    date: date().notNull(),
    time: text(),
    items: jsonb().$type<ExtractionData["items"]>(),
    subtotal: decimal({ precision: 10, scale: 2 }),
    tax: decimal({ precision: 10, scale: 2 }),
    total: decimal({ precision: 10, scale: 2 }).notNull(),
    paymentMethod: varchar({ length: 100 }),
    cashier: varchar("cashier", { length: 255 }),
    customerName: varchar("customer_name", { length: 255 }),
    customerEmail: varchar("customer_email", { length: 255 }),
    ...timestamps,
  },
  (table) => [
    pgPolicy("users can create their own receipts", {
      for: "insert",
      to: authenticatedRole,
      withCheck: eq(table.userId, authUid),
    }),
    pgPolicy("users can see their own receipts", {
      for: "select",
      to: authenticatedRole,
      using: eq(table.userId, authUid),
    }),
    pgPolicy("users can update their own receipts", {
      for: "update",
      to: authenticatedRole,
      using: eq(table.userId, authUid),
      withCheck: eq(table.userId, authUid),
    }),
    pgPolicy("users can delete their own receipts", {
      for: "delete",
      to: authenticatedRole,
      using: eq(table.userId, authUid),
    }),
  ]
);

export type InsertReceipt = typeof receipts.$inferInsert;
export type SelectReceipt = typeof receipts.$inferSelect;
