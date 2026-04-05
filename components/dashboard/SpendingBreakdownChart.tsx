"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Sector,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
    Food: "#f97316", Transport: "#3b82f6", Utilities: "#06b6d4",
    Shopping: "#ec4899", Entertainment: "#a855f7", Other: "#64748b",
};

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <g>
            <Sector
                cx={cx} cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

export function SpendingBreakdownChart() {
    const { categoryBreakdown, isLoading } = useFinanceStore();
    const [activeIndex, setActiveIndex] = useState(0);

    const activeCategory = useMemo(() => {
        if (!categoryBreakdown || categoryBreakdown.length === 0) return null;
        return categoryBreakdown[activeIndex];
    }, [categoryBreakdown, activeIndex]);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted || isLoading || !categoryBreakdown) {
        return <Skeleton className="h-[400px] w-full rounded-xl" />;
    }

    return (
        <Card className="flex flex-col w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center relative pb-6">
                <div className="relative w-full h-[260px] flex items-center justify-center">
                    {activeCategory && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                                {activeCategory.category}
                            </span>
                            <span className="text-xl font-bold text-foreground">
                                {formatCurrency(activeCategory.amount)}
                            </span>
                        </div>
                    )}

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryBreakdown}
                                cx="50%"
                                cy="50%"
                                innerRadius={75}
                                outerRadius={105}
                                paddingAngle={3}
                                dataKey="amount"
                                cursor="pointer"
                                onClick={(_, index) => setActiveIndex(index)}
                                {...({ activeIndex, activeShape: renderActiveShape } as any)}
                            >
                                {categoryBreakdown.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.Other}
                                        className="outline-none hover:opacity-80 transition-opacity duration-200"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => formatCurrency(Number(value) || 0)}
                                contentStyle={{ borderRadius: '8px', backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', zIndex: 50 }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-4 w-full px-2">
                    {categoryBreakdown.map((entry, index) => (
                        <div
                            key={entry.category}
                            className={cn(
                                "flex items-center gap-1.5 text-[11px] sm:text-xs cursor-pointer px-2 py-1 rounded-md transition-colors",
                                activeIndex === index ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/50"
                            )}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.Other }} />
                            <span className="truncate">{entry.category} ({entry.percentage}%)</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}