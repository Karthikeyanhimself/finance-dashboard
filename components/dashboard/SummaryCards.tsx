"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { cn } from "@/lib/utils";

export function SummaryCards() {
    const transactions = useFinanceStore((s) => s.transactions);

    const stats = useMemo(() => {
        const balance = transactions.reduce((acc, t) =>
            t.type === "income" ? acc + t.amount : acc - t.amount, 0);

        const income = transactions
            .filter(t => t.type === "income")
            .reduce((acc, t) => acc + t.amount, 0);

        const expenses = transactions
            .filter(t => t.type === "expense")
            .reduce((acc, t) => acc + t.amount, 0);

        return { balance, income, expenses };
    }, [transactions]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-white/5 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(stats.balance)}</div>
                    <div className="flex items-center mt-1 text-xs text-emerald-500">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+2.5% from last month</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/5 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-emerald-500">{formatCurrency(stats.income)}</div>
                    <div className="flex items-center mt-1 text-xs text-emerald-500">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+12.3% from last month</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/5 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
                    <TrendingDown className="h-4 w-4 text-rose-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-rose-500">{formatCurrency(stats.expenses)}</div>
                    <div className="flex items-center mt-1 text-xs text-rose-500">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        <span>-4.1% from last month</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}