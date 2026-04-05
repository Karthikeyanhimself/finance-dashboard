"use client";

import React, { useEffect } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { fetchSummary, fetchMonthlyData, fetchCategoryBreakdown } from "@/lib/mockGraphql";
import { InsightCards } from "@/components/insights/InsightCards";
import { MonthlyComparisonChart } from "@/components/insights/MonthlyComparisonChart";

export default function InsightsPage() {
    const {
        setLoading,
        setSummary,
        setMonthlyData,
        setCategoryBreakdown,
        summary
    } = useFinanceStore();

    useEffect(() => {
        if (summary) return; // Skip fetch if already loaded via dashboard

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
    }, [setLoading, setSummary, setMonthlyData, setCategoryBreakdown, summary]);

    return (
        <div className="w-full">
            <div className="mb-8 pt-2">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Insights</h2>
                <p className="text-muted-foreground">
                    Here&apos;s a breakdown of your financial activity over the last 6 months.
                </p>
            </div>

            <InsightCards />

            <div className="mt-8">
                <MonthlyComparisonChart />
            </div>
        </div>
    );
}