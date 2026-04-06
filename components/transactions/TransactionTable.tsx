"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Transaction } from "@/store/useFinanceStore";
import { useRoleStore } from "@/store/useRoleStore";
import { cn } from "@/lib/utils";
import { EditTransactionModal } from "./EditTransactionModal";

interface TransactionTableProps {
    transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const role = useRoleStore((s) => s.role);
    const isAdmin = role === "admin";

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = transactions.slice(startIndex, startIndex + itemsPerPage);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            food: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
            transport: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
            housing: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
            entertainment: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
            utilities: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
            shopping: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
            salary: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        };
        return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    };

    return (
        <div className="space-y-4 w-full">
            {/* Scroll container to prevent mobile page enlarging */}
            <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-x-auto">
                <Table className="min-w-[700px] w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell className="font-medium whitespace-nowrap" suppressHydrationWarning>
                                    {formatDate(txn.date)}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {txn.description}
                                </TableCell>
                                <TableCell>
                                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap", getCategoryColor(txn.category))}>
                                        {txn.category}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={txn.type === "income" ? "default" : "secondary"} className="capitalize">
                                        {txn.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn("text-right font-semibold whitespace-nowrap", txn.type === "income" ? "text-emerald-500" : "text-foreground")}>
                                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                                </TableCell>
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of {transactions.length}
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}