"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Explicitly type as Variants so TS knows "spring" is a valid animation type
const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function SummaryCards() {
    const { summary, isLoading } = useFinanceStore();

    if (isLoading || !summary) {
        return (
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
                ))}
            </div>
        );
    }

    const cards = [
        {
            title: "Total Balance",
            value: summary.totalBalance,
            isPositive: summary.changeFromLastMonth >= 0,
            trend: `${Math.abs(summary.changeFromLastMonth)}%`,
        },
        {
            title: "Total Income",
            value: summary.totalIncome,
            isPositive: true, // Income is inherently positive for styling here
            trend: "from last month",
        },
        {
            title: "Total Expenses",
            value: summary.totalExpenses,
            isPositive: false, // Expenses represent money out
            trend: "from last month",
        },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-3 mb-8"
        >
            {cards.map((card, index) => (
                <motion.div key={index} variants={item}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">
                                {formatCurrency(card.value)}
                            </div>
                            <div className="flex items-center mt-1 text-xs">
                                {card.title === "Total Balance" && (
                                    <span className="mr-1 opacity-70">
                                        <Image
                                            src={`/icons/png/trend-${card.isPositive ? "up" : "down"}.png`}
                                            alt="Trend indicator"
                                            width={16}
                                            height={16}
                                            className={cn(card.isPositive ? "invert-0" : "invert-0")} // Optional invert logic depending on your SVG colors
                                            style={{
                                                filter: card.isPositive
                                                    ? "invert(50%) sepia(85%) saturate(1402%) hue-rotate(117deg) brightness(96%) contrast(89%)"
                                                    : "invert(35%) sepia(74%) saturate(4067%) hue-rotate(345deg) brightness(101%) contrast(90%)"
                                            }}
                                        />
                                    </span>
                                )}
                                <span
                                    className={cn(
                                        "mr-2 font-medium",
                                        card.isPositive ? "text-income" : "text-expense",
                                        card.title !== "Total Balance" && "ml-0" // Align text when no icon
                                    )}
                                >
                                    {card.title === "Total Balance" ? (card.isPositive ? "+" : "-") : ""}
                                    {card.trend}
                                </span>
                                {card.title === "Total Balance" && <span className="text-muted-foreground">vs last month</span>}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}