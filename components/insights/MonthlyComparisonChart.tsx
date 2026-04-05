"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { mockMonthlyData } from "@/lib/mockData";
import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export function MonthlyComparisonChart() {
    const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number }>; label?: string | number }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-3 rounded-xl shadow-2xl text-xs">
                    <p className="font-bold mb-2">{label}</p>
                    <div className="space-y-1">
                        <p className="text-emerald-500 font-medium">
                            Income: ${(payload[0].value as number).toLocaleString()}
                        </p>
                        <p className="text-rose-500 font-medium">
                            Expenses: ${(payload[1].value as number).toLocaleString()}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly comparison of your cash flow</CardDescription>
            </CardHeader>
            <CardContent className="w-full px-2 sm:px-6 pb-6 overflow-x-auto">
                <div className="min-w-[500px] h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockMonthlyData} margin={{ top: 10, right: 35, left: 0, bottom: 0 }}>
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
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted)/0.5)" }} />
                            <Legend wrapperStyle={{ paddingTop: "20px" }} />
                            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}