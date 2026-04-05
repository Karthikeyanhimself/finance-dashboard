import { create } from "zustand";
import {
    mockTransactions,
    mockSummary,
    mockMonthlyData,
    mockCategoryBreakdown,
    FinanceSummary,
    MonthlyData,
    CategoryBreakdown
} from "@/lib/mockData";

export type Transaction = {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
};

export type Filters = {
    search: string;
    category: string;
    type: "all" | "income" | "expense";
    sortBy: "date" | "amount";
    sortOrder: "asc" | "desc";
};

interface FinanceState {
    transactions: Transaction[];
    summary: FinanceSummary;
    monthlyData: MonthlyData[];
    categoryBreakdown: CategoryBreakdown[];
    filters: Filters;
    isLoading: boolean;
    setTransactions: (transactions: Transaction[]) => void;
    setSummary: (summary: FinanceSummary) => void;
    setMonthlyData: (data: MonthlyData[]) => void;
    setCategoryBreakdown: (data: CategoryBreakdown[]) => void;
    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    setFilters: (filters: Partial<Filters>) => void;
    setLoading: (loading: boolean) => void;
    hydrateFromStorage: () => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
    transactions: mockTransactions,
    summary: mockSummary,
    monthlyData: mockMonthlyData,
    categoryBreakdown: mockCategoryBreakdown,
    isLoading: false,
    filters: {
        search: "",
        category: "all",
        type: "all",
        sortBy: "date",
        sortOrder: "desc",
    },
    setTransactions: (transactions) => set({ transactions }),
    setSummary: (summary) => set({ summary }),
    setMonthlyData: (monthlyData) => set({ monthlyData }),
    setCategoryBreakdown: (categoryBreakdown) => set({ categoryBreakdown }),
    addTransaction: (transaction) => {
        set((state) => {
            const updated = [transaction, ...state.transactions];
            localStorage.setItem("finance_transactions", JSON.stringify(updated.filter(t => !mockTransactions.find(m => m.id === t.id))));
            return { transactions: updated };
        });
    },
    updateTransaction: (transaction) => {
        set((state) => {
            const updated = state.transactions.map((t) => (t.id === transaction.id ? transaction : t));
            localStorage.setItem("finance_transactions", JSON.stringify(updated.filter(t => !mockTransactions.find(m => m.id === t.id))));
            return { transactions: updated };
        });
    },
    deleteTransaction: (id) => {
        set((state) => {
            const updated = state.transactions.filter((t) => t.id !== id);
            localStorage.setItem("finance_transactions", JSON.stringify(updated.filter(t => !mockTransactions.find(m => m.id === t.id))));
            return { transactions: updated };
        });
    },
    setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    setLoading: (isLoading) => set({ isLoading }),
    hydrateFromStorage: () => {
        if (typeof window === "undefined") return;
        try {
            const stored = localStorage.getItem("finance_transactions");
            if (stored) {
                const parsed = JSON.parse(stored) as Transaction[];
                set((state) => ({
                    transactions: [
                        ...parsed,
                        ...state.transactions.filter(
                            (t) => !parsed.find((p) => p.id === t.id)
                        ),
                    ],
                }));
            }
        } catch {
            // localStorage corrupted
        }
    },
}));