"use client";

import React, { useEffect } from "react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingBreakdownChart } from "@/components/dashboard/SpendingBreakdownChart";
import { useFinanceStore } from "@/store/useFinanceStore";
import {
    fetchSummary,
    fetchMonthlyData,
    fetchCategoryBreakdown
} from "@/lib/mockGraphql";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const setLoading = useFinanceStore((s) => s.setLoading);
    const setSummary = useFinanceStore((s) => s.setSummary);
    const setMonthlyData = useFinanceStore((s) => s.setMonthlyData);
    const setCategoryBreakdown = useFinanceStore((s) => s.setCategoryBreakdown);
    const isLoading = useFinanceStore((s) => s.isLoading);

    useEffect(() => {
        async function loadDashboardData() {
            setLoading(true);
            try {
                const [summaryRes, monthlyRes, categoryRes] = await Promise.all([
                    fetchSummary(),
                    fetchMonthlyData(),
                    fetchCategoryBreakdown()
                ]);

                setSummary(summaryRes.data.summary);
                setMonthlyData(monthlyRes.data.monthlyData);
                setCategoryBreakdown(categoryRes.data.categoryBreakdown);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, [setLoading, setSummary, setMonthlyData, setCategoryBreakdown]);

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h2>
                <p className="text-muted-foreground">Welcome back. Here's a summary of your finances.</p>
            </div>

            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BalanceTrendChart />
                <SpendingBreakdownChart />
            </div>
        </div>
    );
}