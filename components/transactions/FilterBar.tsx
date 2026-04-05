"use client";

import React from "react";
import Image from "next/image";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
    "Food", "Transport", "Utilities", "Shopping",
    "Entertainment", "Salary", "Freelance", "Other"
];

export function FilterBar() {
    const { filters, setFilters, resetFilters } = useFinanceStore();

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none opacity-50">
                    {/* TODO: replace with your icon file at public/icons/svg/search.svg */}
                    <Image src="/icons/svg/search.svg" alt="Search" width={16} height={16} className="dark:invert" />
                </div>
                <Input
                    placeholder="Search descriptions..."
                    value={filters.search}
                    onChange={(e) => setFilters({ search: e.target.value })}
                    className="pl-9"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Select
                    value={filters.category}
                    onValueChange={(val) => setFilters({ category: val })}
                >
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.type}
                    onValueChange={(val: "all" | "income" | "expense") => setFilters({ type: val })}
                >
                    <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" onClick={resetFilters} className="shrink-0">
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}