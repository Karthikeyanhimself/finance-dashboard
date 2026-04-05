"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/lib/mockData";

interface EditTransactionModalProps {
    transaction: Transaction;
}

export function EditTransactionModal({ transaction }: EditTransactionModalProps) {
    const { editTransaction } = useFinanceStore();

    const [open, setOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Pre-fill form with transaction data
    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(transaction.amount.toString());
    // Slice date to get YYYY-MM-DD format for input type="date"
    const [date, setDate] = useState(transaction.date.split("T")[0]);
    const [category, setCategory] = useState(transaction.category);
    const [type, setType] = useState<"income" | "expense">(transaction.type);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date || !category || !type) return;
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return;

        editTransaction(transaction.id, {
            description,
            amount: numAmount,
            date: new Date(date).toISOString(),
            category,
            type,
        });

        setIsSuccess(true);
        setTimeout(() => {
            setOpen(false);
            setIsSuccess(false);
        }, 1000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    {/* TODO: Add edit.svg to your public/icons/svg folder */}
                    <Image src="/icons/svg/edit.svg" alt="Edit" width={16} height={16} />
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogDescription className="sr-only">
                        Update the details of your transaction below.
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-8 text-center text-income font-medium animate-in fade-in zoom-in duration-300">
                        Transaction updated!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount ($)</label>
                                <Input type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <Select value={type} onValueChange={(val: any) => setType(val)} required>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="income">Income</SelectItem>
                                        <SelectItem value="expense">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Food">Food</SelectItem>
                                        <SelectItem value="Transport">Transport</SelectItem>
                                        <SelectItem value="Utilities">Utilities</SelectItem>
                                        <SelectItem value="Shopping">Shopping</SelectItem>
                                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                                        <SelectItem value="Salary">Salary</SelectItem>
                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}