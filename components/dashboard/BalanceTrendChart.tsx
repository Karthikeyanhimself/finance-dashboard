"use client";

import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
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
                <p className="font-medium mb-1">{label}</p>
                <p className="text-sm font-bold text-primary">
                    Balance: {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export function BalanceTrendChart() {
    const { monthlyData, isLoading } = useFinanceStore();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted || isLoading || !monthlyData) {
        return <Skeleton className="h-[400px] w-full rounded-xl" />;
    }

    return (
        <Card className="flex flex-col w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Balance Trend (6 Months)</CardTitle>
            </CardHeader>
            {/* 1. Add overflow-x-auto here */}
            <CardContent className="w-full px-2 sm:px-6 pb-6 overflow-x-auto">

                {/* 2. Add this wrapper div to force a minimum width for scrolling */}
                <div className="min-w-[500px] h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData} margin={{ top: 10, right: 35, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />

                            {/* 3. Revert fontSize back to 12 */}
                            <XAxis dataKey="month" interval={0} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />

                            <YAxis width={80} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))" }} />
                            <Line type="monotone" dataKey="balance" stroke="hsl(var(--foreground))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--background))", strokeWidth: 2 }} activeDot={{ r: 6, fill: "hsl(var(--foreground))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}