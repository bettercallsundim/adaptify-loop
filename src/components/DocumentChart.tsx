"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import getDocumentChartsData, {
  GetDocumentChartsDataResponse,
} from "@/actions/getDocumentChartsData";
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

export function DocumentChart() {
  const [chartData, setChartData] = useState<
    { status: string; count: number }[]
  >([]);

  async function fetchDocumentChartsData() {
    const res = await getDocumentChartsData();
    if (res?.success) {
      const data = res.data as GetDocumentChartsDataResponse["data"];
      const counts = Object.entries(data).map(([status, count]) => ({
        status,
        count,
      }));
      setChartData(counts);
    }
  }

  useEffect(() => {
    fetchDocumentChartsData();
  }, []);

  return (
    <Card className="w-[500px] h-auto">
      <CardHeader>
        <CardTitle className="mb-4">Document Analytics</CardTitle>
        <CardDescription>
          Total Documents Submitted :{" "}
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
