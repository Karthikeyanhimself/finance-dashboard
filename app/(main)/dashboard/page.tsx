"use client";

import React, { useEffect } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import {
    fetchSummary,
    fetchMonthlyData,
    fetchCategoryBreakdown
} from "@/lib/mockGraphql";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingBreakdownChart } from "@/components/dashboard/SpendingBreakdownChart";

export default function DashboardPage() {
    const {
        setLoading,
        setSummary,
        setMonthlyData,
        setCategoryBreakdown,
        summary
    } = useFinanceStore();

    useEffect(() => {
        // Only fetch if we haven't loaded the data yet to avoid re-fetching on tab switches
        if (summary) return;

        async function loadDashboardData() {
            setLoading(true);
            try {
                // Simulate concurrent GraphQL queries
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
    }, [setLoading, setSummary, setMonthlyData, setCategoryBreakdown, summary]);

    return (
        <div className="w-full relative">
            <div className="mb-8 pt-2">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
                <p className="text-muted-foreground">
                    Here is an overview of your finances for the last 6 months.
                </p>
            </div>

            <SummaryCards />

            {/* Grid for Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BalanceTrendChart />
                <SpendingBreakdownChart />
            </div>
        </div>
    );
}