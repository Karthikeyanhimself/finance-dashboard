"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import { useFinanceStore, Transaction } from "@/store/useFinanceStore";

interface EditTransactionModalProps {
    transaction: Transaction;
}

export function EditTransactionModal({ transaction }: EditTransactionModalProps) {
    const [open, setOpen] = useState(false);
    const updateTransaction = useFinanceStore((s) => s.updateTransaction);
    const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);

    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(transaction.amount.toString());
    const [category, setCategory] = useState(transaction.category);
    const [type, setType] = useState<"income" | "expense">(transaction.type);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount) return;

        updateTransaction({
            ...transaction,
            description,
            amount: parseFloat(amount),
            category,
            type,
        });

        setOpen(false);
    };

    const handleDelete = () => {
        deleteTransaction(transaction.id);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                    <Edit2 className="h-4 w-4 opacity-50" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-xl border-white/10">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Input
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={120}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-amount">Amount ($)</Label>
                            <Input
                                id="edit-amount"
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-type">Type</Label>
                            <Select value={type} onValueChange={(val: any) => setType(val)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="capitalize">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {["food", "transport", "housing", "entertainment", "utilities", "shopping", "salary"].map((cat) => (
                                    <SelectItem key={cat} value={cat} className="capitalize">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="pt-6 flex justify-between sm:justify-between items-center w-full gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                            Update Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}