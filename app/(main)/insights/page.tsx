"use client";

import React, { useEffect } from "react";
import { MonthlyComparisonChart } from "@/components/insights/MonthlyComparisonChart";
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
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">Insights</h2>
                <p className="text-muted-foreground">Deep dive into your spending habits and financial health.</p>
            </div>

            <MonthlyComparisonChart />
        </div>
    );
}