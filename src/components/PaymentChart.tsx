"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import getPaymentChartsData, {
  GetPaymentChartsDataResponse,
} from "@/actions/getPaymentChartsData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PaymentChart() {
  const [chartData, setChartData] = useState<
    { status: string; count: number }[]
  >([]);

  async function fetchPaymentChartsData() {
    const res = await getPaymentChartsData();
    if (res?.success) {
      const data = res.data as GetPaymentChartsDataResponse["data"];
      const counts = Object.entries(data).map(([status, count]) => ({
        status,
        count,
      }));
      setChartData(counts);
    }
  }

  useEffect(() => {
    fetchPaymentChartsData();
  }, []);

  return (
    <Card className="w-[500px] h-auto">
      <CardHeader>
        <CardTitle className="mb-4">Payment Analytics</CardTitle>
        <CardDescription>
          Total Payments Submitted :{" "}
          {chartData?.reduce((a, b) => a + b.count, 0)}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
