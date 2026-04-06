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
    // Use props object to avoid "Property does not exist on type" error during destructuring
    const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
        const { active, payload: payloadArray, label } = props as any;

        if (active && payloadArray && payloadArray.length) {
            return (
                <div className="bg-popover/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl text-xs pointer-events-none">
                    <p className="font-bold mb-2 text-foreground">{label}</p>
                    <div className="space-y-1">
                        <p className="text-[#471396] font-bold">Income: ${(payloadArray[0].value as number).toLocaleString()}</p>
                        <p className="text-[#B13BFF] font-bold">Expenses: ${(payloadArray[1].value as number).toLocaleString()}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5 w-full max-w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly comparison of your cash flow</CardDescription>
            </CardHeader>
            <CardContent
                className="w-full max-w-full px-2 sm:px-6 pb-6 overflow-x-auto touch-pan-x relative z-10"
                data-lenis-prevent
            >
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
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted)/0.3)" }} />
                            <Legend
                                wrapperStyle={{ paddingTop: "20px" }}
                                formatter={(value) => <span className="text-xs font-medium capitalize">{value}</span>}
                            />
                            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

// FIXED: Property 'payload' Type Error & Interaction Layer