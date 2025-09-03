"use client";

import { use, useState } from "react";
import { Area, AreaChart, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

 const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

type ChartData =
  | {
      data: {
        date: string;
        expenses: number;
      }[];
      error?: undefined;
    }
  | {
      error: string;
      data?: undefined;
    };

type TimeRange = "365d" | "30d" | "7d";

function SectionChart({ data }: { data: Promise<ChartData> }) {
  const { data: chartData } = use(data);
  const [timeRange, setTimeRange] = useState<TimeRange>("365d");

  if (!chartData) return null;

  const now = new Date();
  const filteredData = chartData?.filter((item) => {
    const itemDate = new Date(item.date);
    const dayDifference =
      (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);

    if (timeRange === "365d") {
      return dayDifference <= 365;
    } else if (timeRange === "30d") {
      return dayDifference <= 30;
    } else if (timeRange === "7d") {
      return dayDifference <= 7;
    }
    return false;
  });

  return (
    <Card className="@container/card flex-1 from-primary/15 to-card bg-gradient-to-t">
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="365d">Last 12 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="365d" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto min-h-[250px] h-full w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="expenses"
              type="natural"
              stackId="a"
              fill="url(#fillExpenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SectionChart;
