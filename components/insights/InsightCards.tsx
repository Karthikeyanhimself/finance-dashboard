"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function InsightCards() {
    const { summary, monthlyData, categoryBreakdown, isLoading } = useFinanceStore();

    if (isLoading || !summary || !monthlyData || !categoryBreakdown) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
                ))}
            </div>
        );
    }

    // Calculations
    const highestCategory = [...categoryBreakdown].sort((a, b) => b.amount - a.amount)[0];
    const bestMonth = [...monthlyData].sort((a, b) => b.income - a.income)[0];

    const totalFlow = summary.totalIncome + summary.totalExpenses;
    const incomeRatio = totalFlow > 0 ? (summary.totalIncome / totalFlow) * 100 : 0;
    const expenseRatio = totalFlow > 0 ? (summary.totalExpenses / totalFlow) * 100 : 0;

    const avgMonthlySpending = summary.totalExpenses / Math.max(monthlyData.length, 1);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8"
        >
            {/* Highest Spending Category */}
            <motion.div variants={item}>
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Highest Spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight mb-1">
                            {highestCategory?.category || "N/A"}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                            {formatCurrency(highestCategory?.amount || 0)}
                        </div>
                        <Progress value={highestCategory?.percentage || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                            {highestCategory?.percentage || 0}% of total expenses
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Best Income Month */}
            <motion.div variants={item}>
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Income Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight mb-1">
                            {bestMonth?.month || "N/A"}
                        </div>
                        <div className="text-sm font-medium text-income">
                            {formatCurrency(bestMonth?.income || 0)}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Income vs Expense Ratio */}
            <motion.div variants={item}>
                <Card className="h-full flex flex-col justify-between">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Cash Flow Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-sm font-medium mb-2">
                            <span className="text-income">In: {Math.round(incomeRatio)}%</span>
                            <span className="text-expense">Out: {Math.round(expenseRatio)}%</span>
                        </div>
                        {/* Custom Split Bar */}
                        <div className="h-3 w-full rounded-full flex overflow-hidden">
                            <div className="bg-income h-full" style={{ width: `${incomeRatio}%` }} />
                            <div className="bg-expense h-full" style={{ width: `${expenseRatio}%` }} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Average Monthly Spending */}
            <motion.div variants={item}>
                <Card className="h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Monthly Spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight mb-1">
                            {formatCurrency(avgMonthlySpending)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Based on the last 6 months
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}