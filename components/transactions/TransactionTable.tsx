"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Transaction } from "@/lib/mockData";
import { formatCurrency, formatDate, getCategoryColor, cn } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useIsAdmin } from "@/store/useRoleStore";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditTransactionModal } from "./EditTransactionModal";

interface TransactionTableProps {
    transactions: Transaction[];
}

const ITEMS_PER_PAGE = 10;

export function TransactionTable({ transactions }: TransactionTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const { filters, setFilters } = useFinanceStore();
    const isAdmin = useIsAdmin();

    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const paginatedData = transactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSort = (column: "date" | "amount") => {
        if (filters.sortBy === column) {
            setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
        } else {
            setFilters({ sortBy: column, sortOrder: "desc" });
        }
        setCurrentPage(1);
    };

    const renderSortIcon = (column: "date" | "amount") => {
        if (filters.sortBy !== column) return null;
        const iconName = filters.sortOrder === "asc" ? "chevron-up" : "chevron-down";
        return (
            <Image src={`/icons/png/${iconName}.png`} alt="Sort" width={14} height={14} className="ml-1 inline-block opacity-70" />
        );
    };

    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-card rounded-xl border border-border shadow-sm">
                <div className="h-16 w-16 mb-4 opacity-100">
                    <Image src="/icons/png/empty-state.png" alt="Empty" width={64} height={64} />
                </div>
                <p className="text-lg font-medium text-foreground">No transactions found</p>
                <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="cursor-pointer hover:text-foreground transition-colors w-[120px]" onClick={() => handleSort("date")}>
                                Date {renderSortIcon("date")}
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("amount")}>
                                Amount {renderSortIcon("amount")}
                            </TableHead>
                            {/* Only show the Actions column header if admin */}
                            {isAdmin && <TableHead className="w-[50px]"></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((txn) => (
                            <TableRow key={txn.id}>
                                {/* FIX: Added suppressHydrationWarning to handle Server vs Client timezone differences */}
                                <TableCell className="font-medium whitespace-nowrap" suppressHydrationWarning>
                                    {formatDate(txn.date)}
                                </TableCell>
                                <TableCell>{txn.description}</TableCell>
                                <TableCell>
                                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getCategoryColor(txn.category))}>
                                        {txn.category}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={txn.type === "income" ? "default" : "secondary"} className="capitalize">
                                        {txn.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn("text-right font-semibold", txn.type === "income" ? "text-income" : "text-foreground")}>
                                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                                </TableCell>
                                {/* Render the Edit modal button if admin */}
                                {isAdmin && (
                                    <TableCell className="text-right">
                                        <EditTransactionModal transaction={txn} />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, transactions.length)} of {transactions.length} entries
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                            <Image src="/icons/png/chevron-left.png" alt="Prev" width={16} height={16} className="mr-1" /> Prev
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                            Next <Image src="/icons/png/chevron-right.png" alt="Next" width={16} height={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}