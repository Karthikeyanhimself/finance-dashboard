"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";

export function FilterBar() {
    const filters = useFinanceStore((s) => s.filters);
    const setFilters = useFinanceStore((s) => s.setFilters);

    const categories = [
        "all",
        "food",
        "transport",
        "housing",
        "entertainment",
        "utilities",
        "shopping",
        "salary",
    ];

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search transactions..."
                    className="pl-10 bg-card/50"
                    value={filters.search}
                    onChange={(e) => setFilters({ search: e.target.value })}
                />
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select
                        value={filters.category}
                        onValueChange={(val) => setFilters({ category: val })}
                    >
                        <SelectTrigger className="w-[140px] bg-card/50 capitalize">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat} className="capitalize">
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Select
                    value={filters.type}
                    onValueChange={(val: any) => setFilters({ type: val })}
                >
                    <SelectTrigger className="w-[120px] bg-card/50">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <Select
                        value={`${filters.sortBy}-${filters.sortOrder}`}
                        onValueChange={(val) => {
                            const [sortBy, sortOrder] = val.split("-") as [any, any];
                            setFilters({ sortBy, sortOrder });
                        }}
                    >
                        <SelectTrigger className="w-[180px] bg-card/50">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date-desc">Newest First</SelectItem>
                            <SelectItem value="date-asc">Oldest First</SelectItem>
                            <SelectItem value="amount-desc">Highest Amount</SelectItem>
                            <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}