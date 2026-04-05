"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useFinanceStore } from "@/store/useFinanceStore";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function InsightsOverview() {
    const categoryBreakdown = useFinanceStore((s) => s.categoryBreakdown);
    const monthlyData = useFinanceStore((s) => s.monthlyData);

    const insights = useMemo(() => {
        if (!categoryBreakdown.length || monthlyData.length < 2) return null;

        // 1. Highest Spending Category
        const topCategory = [...categoryBreakdown].sort((a, b) => b.amount - a.amount)[0];

        // 2. Monthly Comparison (Current vs Previous)
        const currentMonth = monthlyData[monthlyData.length - 1];
        const prevMonth = monthlyData[monthlyData.length - 2];

        const expenseChange = ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100;
        const incomeChange = ((currentMonth.income - prevMonth.income) / prevMonth.income) * 100;

        // 3. Observations
        const observations = [];

        if (expenseChange < 0) {
            observations.push({
                text: `Spending is down ${Math.abs(expenseChange).toFixed(1)}% compared to last month.`,
                type: "success",
                icon: <CheckCircle2 className="text-emerald-500" size={18} />
            });
        } else {
            observations.push({
                text: `Spending increased by ${expenseChange.toFixed(1)}% this month.`,
                type: "warning",
                icon: <AlertCircle className="text-amber-500" size={18} />
            });
        }

        if (topCategory.percentage > 40) {
            observations.push({
                text: `${topCategory.category} accounts for ${topCategory.percentage}% of your total budget.`,
                type: "info",
                icon: <Zap className="text-blue-500" size={18} />
            });
        }

        return { topCategory, expenseChange, incomeChange, observations };
    }, [categoryBreakdown, monthlyData]);

    if (!insights) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Highest Category Card */}
            <Card className="bg-card/50 backdrop-blur-md border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardContent className="pt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Top Expense
                    </p>
                    <h3 className="text-2xl font-bold capitalize">{insights.topCategory.category}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Totaling <span className="text-foreground font-semibold">${insights.topCategory.amount.toLocaleString()}</span> this month.
                    </p>
                </CardContent>
            </Card>

            {/* Monthly Trend Card */}
            <Card className="bg-card/50 backdrop-blur-md border-white/5 relative overflow-hidden">
                <CardContent className="pt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Monthly Trend
                    </p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                            {insights.expenseChange > 0 ? "+" : ""}{insights.expenseChange.toFixed(1)}%
                        </h3>
                        {insights.expenseChange > 0 ? (
                            <TrendingUp className="text-rose-500" size={20} />
                        ) : (
                            <TrendingDown className="text-emerald-500" size={20} />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        In total expenses vs. previous month.
                    </p>
                </CardContent>
            </Card>

            {/* Dynamic Observation Card */}
            <Card className="bg-card/50 backdrop-blur-md border-white/5">
                <CardContent className="pt-6 space-y-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Key Observations
                    </p>
                    <div className="space-y-3">
                        {insights.observations.map((obs, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-0.5">{obs.icon}</div>
                                <p className="text-sm leading-tight">{obs.text}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}