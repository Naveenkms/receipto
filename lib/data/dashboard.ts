import { and, asc, count, eq, gte, lt, sql } from "drizzle-orm";

import { verifyUser } from "@/lib/data/verify-user";
import { db } from "@/lib/db";
import { receipts } from "../db/schema/receipts";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January, 11 = December)

// Start of current year
const yearStart = new Date(currentYear, 0, 1); // January 1st of current year
const yearEnd = new Date(currentYear + 1, 0, 1); // January 1st of next year

// Start of current month
const monthStart = new Date(currentYear, currentMonth, 1);
const monthEnd = new Date(currentYear, currentMonth + 1, 1); // First day of next month

export const getTotalExpenses = async () => {
  const { data: userData } = await verifyUser();

  try {
    const yearExpensesResult = await db
      .select({
        totalExpenses: sql<string>`COALESCE(SUM(${receipts.total}), 0)`,
      })
      .from(receipts)
      .where(
        and(
          eq(receipts.userId, userData.user.id),
          gte(receipts.date, yearStart.toISOString().split("T")[0]), // Format as YYYY-MM-DD
          lt(receipts.date, yearEnd.toISOString().split("T")[0])
        )
      );

    const monthExpensesResult = await db
      .select({
        totalExpenses: sql<string>`COALESCE(SUM(${receipts.total}), 0)`,
      })
      .from(receipts)
      .where(
        and(
          eq(receipts.userId, userData.user.id),
          gte(receipts.date, monthStart.toISOString().split("T")[0]),
          lt(receipts.date, monthEnd.toISOString().split("T")[0])
        )
      );

    const data = {
      currentYearTotal: parseFloat(yearExpensesResult[0]?.totalExpenses || "0"),
      currentMonthTotal: parseFloat(
        monthExpensesResult[0]?.totalExpenses || "0"
      ),
    };

    return { data };
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    return { error: "Failed to fetch total expenses" };
  }
};

export const getTotalReceiptsCount = async () => {
  const { data: userData } = await verifyUser();

  try {
    // Query for current year receipt count
    const yearReceiptsResult = await db
      .select({
        totalReceipts: count(receipts.id),
      })
      .from(receipts)
      .where(
        and(
          eq(receipts.userId, userData.user.id),
          gte(receipts.date, yearStart.toISOString().split("T")[0]), // Format as YYYY-MM-DD
          lt(receipts.date, yearEnd.toISOString().split("T")[0])
        )
      );

    // Query for current month receipt count
    const monthReceiptsResult = await db
      .select({
        totalReceipts: count(receipts.id),
      })
      .from(receipts)
      .where(
        and(
          eq(receipts.userId, userData.user.id),
          gte(receipts.date, monthStart.toISOString().split("T")[0]),
          lt(receipts.date, monthEnd.toISOString().split("T")[0])
        )
      );

    const data = {
      currentYearCount: yearReceiptsResult[0]?.totalReceipts || 0,
      currentMonthCount: monthReceiptsResult[0]?.totalReceipts || 0,
    };

    return {
      data,
    };
  } catch (error) {
    console.error("Error fetching total receipts count:", error);
    return { error: "Failed to fetch total receipts count" };
  }
};

export const getYearlyExpensesForChart = async () => {
  const { data: userData } = await verifyUser();

  try {
    const result = await db
      .select({
        date: receipts.date,
        expenses: sql<string>`COALESCE(SUM(${receipts.total}), 0)`,
      })
      .from(receipts)
      .where(
        and(
          eq(receipts.userId, userData.user.id),
          gte(receipts.date, yearStart.toISOString().split("T")[0]),
          lt(receipts.date, yearEnd.toISOString().split("T")[0])
        )
      )
      .groupBy(receipts.date) // Group by date to get daily totals
      .orderBy(asc(receipts.date)); // Order by date ascending

    const data = result.map((row) => ({
      date: row.date,
      expenses: parseFloat(row.expenses || "0"),
    }));

    return {
      data,
    };
  } catch (error) {
    console.error("Error fetching yearly expenses data:", error);
    return { error: "Failed to fetch yearly expenses data" };
  }
};
