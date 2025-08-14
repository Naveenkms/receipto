"use client";
import { Area, AreaChart } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartData = [
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-11", desktop: 327 },
  { date: "2024-04-12", desktop: 292 },
  { date: "2024-04-13", desktop: 342 },
  { date: "2024-04-14", desktop: 137 },
  { date: "2024-04-15", desktop: 120 },
  { date: "2024-04-16", desktop: 138 },
  { date: "2024-04-17", desktop: 446 },
  { date: "2024-04-18", desktop: 364 },
  { date: "2024-04-19", desktop: 243 },
  { date: "2024-04-20", desktop: 89 },
  { date: "2024-04-21", desktop: 137 },
  { date: "2024-04-22", desktop: 224 },
  { date: "2024-04-23", desktop: 138 },
  { date: "2024-04-24", desktop: 387 },
  { date: "2024-04-25", desktop: 215 },
  { date: "2024-04-26", desktop: 75 },
  { date: "2024-04-27", desktop: 383 },
  { date: "2024-04-28", desktop: 122 },
  { date: "2024-04-29", desktop: 315 },
  { date: "2024-04-30", desktop: 454 },
  { date: "2024-05-01", desktop: 165 },
  { date: "2024-05-02", desktop: 293 },
  { date: "2024-05-03", desktop: 247 },
  { date: "2024-05-04", desktop: 385 },
  { date: "2024-05-05", desktop: 481 },
  { date: "2024-05-06", desktop: 498 },
  { date: "2024-05-07", desktop: 388 },
  { date: "2024-05-08", desktop: 149 },
  { date: "2024-05-09", desktop: 227 },
  { date: "2024-05-10", desktop: 293 },
  { date: "2024-05-11", desktop: 335 },
  { date: "2024-05-12", desktop: 197 },
  { date: "2024-05-13", desktop: 197 },
  { date: "2024-05-14", desktop: 448 },
  { date: "2024-05-15", desktop: 473 },
  { date: "2024-05-16", desktop: 338 },
  { date: "2024-05-17", desktop: 499 },
  { date: "2024-05-18", desktop: 315 },
  { date: "2024-05-19", desktop: 235 },
  { date: "2024-05-20", desktop: 177 },
  { date: "2024-05-21", desktop: 82 },
  { date: "2024-05-22", desktop: 81 },
  { date: "2024-05-23", desktop: 252 },
  { date: "2024-05-24", desktop: 294 },
  { date: "2024-05-25", desktop: 201 },
  { date: "2024-05-26", desktop: 213 },
  { date: "2024-05-27", desktop: 420 },
  { date: "2024-05-28", desktop: 233 },
  { date: "2024-05-29", desktop: 78 },
  { date: "2024-05-30", desktop: 340 },
  { date: "2024-05-31", desktop: 178 },
  { date: "2024-06-01", desktop: 178 },
  { date: "2024-06-02", desktop: 470 },
  { date: "2024-06-03", desktop: 103 },
  { date: "2024-06-04", desktop: 439 },
  { date: "2024-06-05", desktop: 88 },
  { date: "2024-06-06", desktop: 294 },
  { date: "2024-06-07", desktop: 323 },
  { date: "2024-06-08", desktop: 385 },
  { date: "2024-06-09", desktop: 438 },
  { date: "2024-06-10", desktop: 155 },
  { date: "2024-06-11", desktop: 92 },
  { date: "2024-06-12", desktop: 492 },
  { date: "2024-06-13", desktop: 81 },
  { date: "2024-06-14", desktop: 426 },
  { date: "2024-06-15", desktop: 307 },
  { date: "2024-06-16", desktop: 371 },
  { date: "2024-06-17", desktop: 475 },
  { date: "2024-06-18", desktop: 107 },
  { date: "2024-06-19", desktop: 341 },
  { date: "2024-06-20", desktop: 408 },
  { date: "2024-06-21", desktop: 169 },
  { date: "2024-06-22", desktop: 317 },
  { date: "2024-06-23", desktop: 480 },
  { date: "2024-06-24", desktop: 132 },
  { date: "2024-06-25", desktop: 141 },
  { date: "2024-06-26", desktop: 434 },
  { date: "2024-06-27", desktop: 448 },
  { date: "2024-06-28", desktop: 149 },
  { date: "2024-06-29", desktop: 103 },
  { date: "2024-06-30", desktop: 446 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--accent)",
  },
} satisfies ChartConfig;

function SectionChartSkeleton() {
  return (
    <Card className="@container/card flex-1 from-primary/15 to-card bg-gradient-to-t">
      <CardHeader>
        <Skeleton className="h-4 w-1/6 @[250px]/card:h-[30px]" />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto min-h-[250px] h-full w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              isAnimationActive={false}
              dataKey="desktop"
              type="natural"
              stackId="a"
              fill="var(--color-desktop)"
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SectionChartSkeleton;
