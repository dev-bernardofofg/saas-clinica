"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type BaseAreaChartProps<T extends Record<string, any>> = {
  title: string;
  description: string;
  data: T[];
  config: ChartConfig;
  xAxisKey: keyof T;
  xAxisFormatter?: (value: string) => string;
  trendingValue?: number;
  dateRange?: string;
  showFooter?: boolean;
  className?: string;
};

export function BaseAreaChart<T extends Record<string, any>>({
  title,
  description,
  data,
  config,
  xAxisKey,
  xAxisFormatter = (value) => value.slice(0, 3),
  trendingValue,
  dateRange,
  showFooter = true,
  className,
}: BaseAreaChartProps<T>) {
  const dataKeys = Object.keys(config);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="border-border max-h-[200px] w-full"
          config={config}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={String(xAxisKey)}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={xAxisFormatter}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {dataKeys.map((key) => (
                <linearGradient
                  key={key}
                  id={`fill${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key.toLowerCase()})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key.toLowerCase()})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {dataKeys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key.toLowerCase()})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {showFooter && (trendingValue || dateRange) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {trendingValue && (
                <div className="flex items-center gap-2 leading-none font-medium">
                  {trendingValue > 0 ? "Aumento" : "Redução"} de{" "}
                  {Math.abs(trendingValue)}% no período
                  <TrendingUp className="size-4" />
                </div>
              )}
              {dateRange && (
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  {dateRange}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
