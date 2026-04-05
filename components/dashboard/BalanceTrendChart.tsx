"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useFinanceStore } from "@/store/useFinanceStore";
import { mockMonthlyData } from "@/lib/mockData";
import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export function BalanceTrendChart() {
    const transactions = useFinanceStore((s) => s.transactions);

    const chartData = useMemo(() => {
        return mockMonthlyData;
    }, []);

    const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
        const { active, payload, label } = props as any;
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-3 rounded-xl shadow-2xl text-xs">
                    <p className="font-bold mb-1">{label}</p>
                    <p className="text-primary font-medium">
                        Balance: ${(payload[0].value as number).toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Balance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="w-full px-2 sm:px-6 pb-6 overflow-x-auto">
                <div className="min-w-[500px] h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 35, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="month"
                                interval={0}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                width={80}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))" }} />
                            <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "hsl(var(--background))", strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}