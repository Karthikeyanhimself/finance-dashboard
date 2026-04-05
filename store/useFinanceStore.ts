import { create } from "zustand";
import {
    Transaction,
    mockTransactions,
    mockSummary,
    mockMonthlyData,
    mockCategoryBreakdown
} from "@/lib/mockData";

export interface Filters {
    search: string;
    category: string;
    type: "all" | "income" | "expense";
    sortBy: "date" | "amount";
    sortOrder: "asc" | "desc";
}

interface FinanceState {
    transactions: Transaction[];
    isLoading: boolean;
    filters: Filters;
    summary: typeof mockSummary | null;
    monthlyData: typeof mockMonthlyData | null;
    categoryBreakdown: typeof mockCategoryBreakdown | null;

    setTransactions: (transactions: Transaction[]) => void;
    addTransaction: (transaction: Transaction) => void;
    editTransaction: (id: string, updatedTxn: Partial<Transaction>) => void;
    setLoading: (isLoading: boolean) => void;
    setFilters: (filters: Partial<Filters>) => void;
    resetFilters: () => void;
    setSummary: (summary: typeof mockSummary) => void;
    setMonthlyData: (data: typeof mockMonthlyData) => void;
    setCategoryBreakdown: (data: typeof mockCategoryBreakdown) => void;
}

const defaultFilters: Filters = {
    search: "",
    category: "all",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
};

const getPersistedTransactions = (): Transaction[] => {
    if (typeof window === "undefined") return [];
    try {
        const saved = localStorage.getItem("user_transactions");
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Failed to parse transactions from local storage", error);
        return [];
    }
};

export const useFinanceStore = create<FinanceState>()((set) => ({
    transactions: [...getPersistedTransactions(), ...mockTransactions],
    isLoading: false,
    filters: defaultFilters,
    summary: null,
    monthlyData: null,
    categoryBreakdown: null,

    setTransactions: (transactions) => set({ transactions }),

    addTransaction: (transaction) => set((state) => {
        const updatedTransactions = [transaction, ...state.transactions];
        if (typeof window !== "undefined") {
            const existingPersisted = getPersistedTransactions();
            const newPersisted = [transaction, ...existingPersisted];
            localStorage.setItem("user_transactions", JSON.stringify(newPersisted));
        }
        return { transactions: updatedTransactions };
    }),

    editTransaction: (id, updatedTxn) => set((state) => {
        const updatedTransactions = state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTxn } : t
        );

        if (typeof window !== "undefined") {
            const existingPersisted = getPersistedTransactions();
            // If the edited transaction exists in localStorage, update it there too
            if (existingPersisted.some((t) => t.id === id)) {
                const newPersisted = existingPersisted.map((t) =>
                    t.id === id ? { ...t, ...updatedTxn } : t
                );
                localStorage.setItem("user_transactions", JSON.stringify(newPersisted));
            }
        }
        return { transactions: updatedTransactions };
    }),

    setLoading: (isLoading) => set({ isLoading }),
    setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    resetFilters: () => set({ filters: defaultFilters }),
    setSummary: (summary) => set({ summary }),
    setMonthlyData: (monthlyData) => set({ monthlyData }),
    setCategoryBreakdown: (categoryBreakdown) => set({ categoryBreakdown }),
}));