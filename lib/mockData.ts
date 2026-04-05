import { Transaction } from "@/store/useFinanceStore";

export interface FinanceSummary {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    changeFromLastMonth: number;
}

export interface MonthlyData {
    month: string;
    income: number;
    expenses: number;
    balance: number;
}

export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
}

export const mockTransactions: Transaction[] = [
    { id: "1", date: "2026-03-31", description: "Monthly Salary", category: "Salary", amount: 5000, type: "income" },
    { id: "2", date: "2026-03-30", description: "Whole Foods Market", category: "Food", amount: 145.20, type: "expense" },
    { id: "3", date: "2026-03-29", description: "Apple Subscription", category: "Entertainment", amount: 14.99, type: "expense" },
    { id: "4", date: "2026-03-28", description: "Gas Station", category: "Transport", amount: 55.00, type: "expense" },
    { id: "5", date: "2026-03-27", description: "Freelance UI Design", category: "Salary", amount: 1200, type: "income" },
    { id: "6", date: "2026-03-26", description: "Starbucks Coffee", category: "Food", amount: 6.50, type: "expense" },
    { id: "7", date: "2026-03-25", description: "Rent Payment", category: "Housing", amount: 1500, type: "expense" },
    { id: "8", date: "2026-03-24", description: "Amazon - Electronics", category: "Shopping", amount: 299.99, type: "expense" },
    { id: "9", date: "2026-03-23", description: "Electric Bill", category: "Utilities", amount: 112.40, type: "expense" },
    { id: "10", date: "2026-03-22", description: "Uber Ride", category: "Transport", amount: 24.50, type: "expense" },
    { id: "11", date: "2026-03-21", description: "Dividend Payout", category: "Salary", amount: 150.75, type: "income" },
    { id: "12", date: "2026-03-20", description: "Steam Games", category: "Entertainment", amount: 59.99, type: "expense" },
    { id: "13", date: "2026-03-19", description: "Gym Membership", category: "Entertainment", amount: 45.00, type: "expense" },
    { id: "14", date: "2026-03-18", description: "Local Bistro Dinner", category: "Food", amount: 88.00, type: "expense" },
    { id: "15", date: "2026-03-17", description: "Internet Service", category: "Utilities", amount: 79.99, type: "expense" },
    { id: "16", date: "2026-03-16", description: "H&M Clothing", category: "Shopping", amount: 124.00, type: "expense" },
    { id: "17", date: "2026-03-15", description: "Stock Sale", category: "Salary", amount: 2400, type: "income" },
    { id: "18", date: "2026-03-14", description: "Water Bill", category: "Utilities", amount: 42.10, type: "expense" },
    { id: "19", date: "2026-03-13", description: "Cinemark Theater", category: "Entertainment", amount: 32.50, type: "expense" },
    { id: "20", date: "2026-03-12", description: "Trader Joe's", category: "Food", amount: 92.30, type: "expense" },
    { id: "21", date: "2026-03-11", description: "Car Insurance", category: "Transport", amount: 180.00, type: "expense" },
    { id: "22", date: "2026-03-10", description: "Bonus Commission", category: "Salary", amount: 800, type: "income" },
    { id: "23", date: "2026-03-09", description: "Spotify", category: "Entertainment", amount: 10.99, type: "expense" },
    { id: "24", date: "2026-03-08", description: "Pharmacy", category: "Shopping", amount: 22.40, type: "expense" },
    { id: "25", date: "2026-03-07", description: "Subway Pass", category: "Transport", amount: 90.00, type: "expense" },
    { id: "26", date: "2026-03-06", description: "Pizza Night", category: "Food", amount: 34.00, type: "expense" },
    { id: "27", date: "2026-03-05", description: "Phone Bill", category: "Utilities", amount: 65.00, type: "expense" },
    { id: "28", date: "2026-03-04", description: "Consulting Fee", category: "Salary", amount: 500, type: "income" },
    { id: "29", date: "2026-03-03", description: "Apple Store - Airpods", category: "Shopping", amount: 199.00, type: "expense" },
    { id: "30", date: "2026-03-02", description: "Parking Fee", category: "Transport", amount: 15.00, type: "expense" },
    { id: "31", date: "2026-02-28", description: "Old Salary", category: "Salary", amount: 5000, type: "income" },
    { id: "32", date: "2026-02-25", description: "Old Rent", category: "Housing", amount: 1500, type: "expense" },
    { id: "33", date: "2026-02-20", description: "Nike Shoes", category: "Shopping", amount: 110.00, type: "expense" },
    { id: "34", date: "2026-02-15", description: "Side Gig - Writing", category: "Salary", amount: 300, type: "income" },
    { id: "35", date: "2026-02-10", description: "Home Depot", category: "Housing", amount: 245.00, type: "expense" },
    { id: "36", date: "2026-02-05", description: "Adobe Creative Cloud", category: "Entertainment", amount: 52.99, type: "expense" },
    { id: "37", date: "2026-02-03", description: "Uber Eats", category: "Food", amount: 45.60, type: "expense" },
    { id: "38", date: "2026-01-25", description: "New Year Bonus", category: "Salary", amount: 1000, type: "income" },
    { id: "39", date: "2026-01-20", description: "Vet Visit", category: "Shopping", amount: 150.00, type: "expense" },
    { id: "40", date: "2026-01-15", description: "Furniture - IKEA", category: "Housing", amount: 480.00, type: "expense" },
];

export const mockSummary: FinanceSummary = {
    totalBalance: 24850.45,
    totalIncome: 10050.75,
    totalExpenses: 4215.30,
    changeFromLastMonth: 8.4,
};

export const mockMonthlyData: MonthlyData[] = [
    { month: "Oct 2025", income: 4500, expenses: 3200, balance: 18500 },
    { month: "Nov 2025", income: 4800, expenses: 3100, balance: 20200 },
    { month: "Dec 2025", income: 5200, expenses: 4500, balance: 20900 },
    { month: "Jan 2026", income: 6000, expenses: 3400, balance: 23500 },
    { month: "Feb 2026", income: 5300, expenses: 3950, balance: 24850 },
    { month: "Mar 2026", income: 10050, expenses: 4215, balance: 30685 },
];

export const mockCategoryBreakdown: CategoryBreakdown[] = [
    { category: "Housing", amount: 1500, percentage: 35.6 },
    { category: "Food", amount: 512.6, percentage: 12.2 },
    { category: "Transport", amount: 419.5, percentage: 9.9 },
    { category: "Shopping", amount: 769.39, percentage: 18.2 },
    { category: "Utilities", amount: 299.89, percentage: 7.1 },
    { category: "Entertainment", amount: 213.92, percentage: 5.1 },
    { category: "Others", amount: 500, percentage: 11.9 },
];

// FIXED: Missing Interfaces in mockData.ts