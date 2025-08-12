import { TrendingUp } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalExpenses, getTotalReceiptsCount } from "@/lib/data/dashboard";
import FallbackText from "@/components/fallback-text";

const formatToCurrency = (number: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

async function SectionCard() {
  const [expenses, receipts] = await Promise.all([
    getTotalExpenses(),
    getTotalReceiptsCount(),
  ]);

  if (expenses.error || receipts.error)
    return (
      <FallbackText variant="destructive">Something went wrong.</FallbackText>
    );

    // @ts-ignore
  const { currentYearTotal, currentMonthTotal } = expenses.data;
  // @ts-ignore
  const { currentYearCount, currentMonthCount } = receipts.data;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t gap-4  grid grid-cols-1 md:grid-cols-2">
      <Card className="">
        <CardHeader>
          <CardDescription> Total expenses in this year</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatToCurrency(currentYearTotal)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total expenses in this month
            <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {formatToCurrency(currentMonthTotal)}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total receipts in this year</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currentYearCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total receipts in this month
            <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{currentMonthCount}</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SectionCard;
