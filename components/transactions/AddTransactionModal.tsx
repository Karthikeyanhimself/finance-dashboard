"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useIsAdmin } from "@/store/useRoleStore";
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

export function AddTransactionModal() {
    const isAdmin = useIsAdmin();
    const { addTransaction } = useFinanceStore();

    const [open, setOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<"income" | "expense" | "">("");

    const resetForm = () => {
        setDescription("");
        setAmount("");
        setDate("");
        setCategory("");
        setType("");
        setIsSuccess(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date || !category || !type) return;
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return;

        const newTransaction: Transaction = {
            id: `t_${Date.now()}`,
            description,
            amount: numAmount,
            date: new Date(date).toISOString(),
            category,
            type: type as "income" | "expense",
        };

        addTransaction(newTransaction);
        setIsSuccess(true);

        setTimeout(() => {
            setOpen(false);
            resetForm();
        }, 1000);
    };

    if (!isAdmin) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Image src="/icons/png/plus.png" alt="Add" width={16} height={16} />
                    Add Transaction
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription className="sr-only">
                        Fill out the form below to add a new transaction to your dashboard.
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-8 text-center text-income font-medium animate-in fade-in zoom-in duration-300">
                        Transaction added successfully!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Grocery Store" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount ($)</label>
                                <Input type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
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
                            <Button type="submit">Save Transaction</Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}