"use client";

import React, { useEffect } from "react";
import { MonthlyComparisonChart } from "@/components/insights/MonthlyComparisonChart";
import { InsightsOverview } from "@/components/insights/InsightsOverview"; // Import new component
import { useFinanceStore } from "@/store/useFinanceStore";
import {
    fetchSummary,
    fetchMonthlyData,
    fetchCategoryBreakdown
} from "@/lib/mockGraphql";
import { Skeleton } from "@/components/ui/skeleton";

export default function InsightsPage() {
    const setLoading = useFinanceStore((s) => s.setLoading);
    const setSummary = useFinanceStore((s) => s.setSummary);
    const setMonthlyData = useFinanceStore((s) => s.setMonthlyData);
    const setCategoryBreakdown = useFinanceStore((s) => s.setCategoryBreakdown);
    const isLoading = useFinanceStore((s) => s.isLoading);

    useEffect(() => {
        async function loadInsightsData() {
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
                console.error("Failed to fetch insights data", error);
            } finally {
                setLoading(false);
            }
        }

        loadInsightsData();
    }, [setLoading, setSummary, setMonthlyData, setCategoryBreakdown]);

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </div>
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">Insights</h2>
                <p className="text-muted-foreground">Strategic analysis of your financial performance.</p>
            </div>

            {/* New Summary Insights Section */}
            <InsightsOverview />

            <MonthlyComparisonChart />
        </div>
    );
}