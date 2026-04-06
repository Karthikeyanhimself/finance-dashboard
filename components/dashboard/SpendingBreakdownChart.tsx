"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useFinanceStore } from "@/store/useFinanceStore";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f43f5e", "#f59e0b", "#06b6d4", "#ec4899"];

export function SpendingBreakdownChart() {
    const data = useFinanceStore((s) => s.categoryBreakdown);

    const chartData = React.useMemo(() => {
        return data.map(item => ({
            name: item.category,
            value: item.amount
        }));
    }, [data]);

    // Custom renderer for the text at the end of the lines
    const renderCustomizedLabel = (props: any) => {
        const { x, y, name, value, textAnchor } = props;
        return (
            <text
                x={x}
                y={y}
                fill="hsl(var(--foreground))"
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="text-[10px] sm:text-xs font-medium capitalize"
            >
                {`${name}: $${value.toLocaleString()}`}
            </text>
        );
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5 w-full max-w-full overflow-hidden">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="w-full max-w-full px-2 sm:px-6 pb-6 overflow-x-auto touch-pan-x relative z-10" data-lenis-prevent>
                <div className="h-[350px] w-full min-w-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                /* Reduced radii to make room for the outer labels */
                                innerRadius={45}
                                outerRadius={65}
                                dataKey="value"
                                paddingAngle={5}
                                /* Enable the lines and attach the custom label renderer */
                                labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeOpacity: 0.5 }}
                                label={renderCustomizedLabel}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value) => <span className="text-xs capitalize text-muted-foreground">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}