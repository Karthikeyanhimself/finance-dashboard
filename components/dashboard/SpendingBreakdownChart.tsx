"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Sector,
    Legend
} from "recharts";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f43f5e", "#f59e0b", "#06b6d4", "#ec4899"];

export function SpendingBreakdownChart() {
    const data = useFinanceStore((s) => s.categoryBreakdown);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const chartData = React.useMemo(() => {
        return data.map(item => ({
            name: item.category,
            value: item.amount
        }));
    }, [data]);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props: PieSectorDataItem) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

        return (
            <g>
                <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm font-medium capitalize">
                    {payload.name}
                </text>
                <text x={cx} y={cy} dy={15} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-xs">
                    ${value?.toLocaleString()}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={(outerRadius || 0) + 8}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
        payload?: Array<{
            name?: string | number;
            value?: number | string;
        }>;
    }

    const CustomTooltip = (props: CustomTooltipProps) => {
        const { active, payload } = props;
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-2 rounded-lg shadow-xl text-xs">
                    <p className="font-bold capitalize">{payload[0].name}</p>
                    <p className="text-primary">${(payload[0].value as number).toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie<any>
                                activeShape={renderActiveShape}
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                                paddingAngle={5}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
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

// FIXED: Recharts Tooltip Type Error: SpendingBreakdownChart.tsx