"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { fetchTransactions } from "@/lib/mockGraphql";
import { FilterBar } from "@/components/transactions/FilterBar";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsPage() {
    const { transactions, filters, isLoading, setLoading, setTransactions } = useFinanceStore();

    // 1. Add the mount state to prevent hydration mismatches with localStorage
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (transactions.length > 0) return;

        async function loadData() {
            setLoading(true);
            try {
                const res = await fetchTransactions();
                setTransactions(res.data.transactions);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [transactions.length, setLoading, setTransactions]);

    const processedTransactions = useMemo(() => {
        let result = [...transactions];

        if (filters.search) {
            const lowerQuery = filters.search.toLowerCase();
            result = result.filter(t => t.description.toLowerCase().includes(lowerQuery));
        }

        if (filters.category !== "all") {
            result = result.filter(t => t.category.toLowerCase() === filters.category);
        }

        if (filters.type !== "all") {
            result = result.filter(t => t.type === filters.type);
        }

        result.sort((a, b) => {
            if (filters.sortBy === "date") {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return filters.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            } else {
                return filters.sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
            }
        });

        return result;
    }, [transactions, filters]);

    // 2. Return a skeleton while the server/client are syncing
    if (!isMounted) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between mb-6">
                    <Skeleton className="h-10 w-[200px]" />
                    <Skeleton className="h-10 w-[150px]" />
                </div>
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1">Transactions</h2>
                    <p className="text-muted-foreground">
                        View and manage your recent financial activity.
                    </p>
                </div>
                <AddTransactionModal />
            </div>

            <FilterBar />

            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            ) : (
                <TransactionTable transactions={processedTransactions} />
            )}
        </div>
    );
}