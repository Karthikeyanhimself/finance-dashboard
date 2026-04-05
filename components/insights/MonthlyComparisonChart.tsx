"use client";

import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-popover text-popover-foreground border border-border p-3 rounded-lg shadow-md">
                <p className="font-medium mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm font-semibold">
                        {entry.name}: {formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function MonthlyComparisonChart() {
    const { monthlyData, isLoading } = useFinanceStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || isLoading || !monthlyData) {
        return <Skeleton className="h-[400px] w-full rounded-xl" />;
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            {/* 1. Add overflow-x-auto here */}
            <CardContent className="w-full px-2 sm:px-6 pb-6 overflow-x-auto">

                {/* 2. Add wrapper div (Note: height is 350px here) */}
                <div className="min-w-[500px] h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 10, right: 35, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />

                            {/* 3. Revert fontSize back to 12 */}
                            <XAxis dataKey="month" interval={0} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />

                            <YAxis width={80} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
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